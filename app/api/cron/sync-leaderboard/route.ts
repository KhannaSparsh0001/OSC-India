import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(req: Request) {
  // 1. Verify Vercel Cron Secret for Security
  if (
    req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // 2. Initialize Supabase Admin Client
    // We use the Service Role Key here because cron jobs run anonymously on the server
    // and need permission to read all users and insert contributions.
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    // 3. Fetch tracked repositories
    const { data: projects, error: projectsError } = await supabaseAdmin
      .from('projects')
      .select('id, github_repo_url');

    if (projectsError) throw projectsError;
    if (!projects || projects.length === 0) {
      return NextResponse.json({ success: true, message: 'No tracked projects found' });
    }

    // Extract org/repo strings for GitHub Search API (e.g., "facebook/react")
    const repoQueries = projects.map(p => {
      const url = new URL(p.github_repo_url);
      return `repo:${url.pathname.substring(1)}`; // removes leading slash
    }).join(' ');

    // 4. Fetch all linked GitHub usernames from our platform
    const { data: users, error: usersError } = await supabaseAdmin
      .from('profiles')
      .select('user_id, full_name, users!inner(email)'); // assuming email/provider contains hint, but we might need a dedicated github_username field.

    // Note: Since we rely on NextAuth, we ideally fetch the linked github account from next_auth.accounts
    // Let's directly query next_auth.accounts!
    const { data: githubAccounts, error: accountsError } = await supabaseAdmin
      .schema('next_auth')
      .from('accounts')
      .select('userId, providerAccountId')
      .eq('provider', 'github');

    if (accountsError) throw accountsError;
    if (!githubAccounts || githubAccounts.length === 0) {
      return NextResponse.json({ success: true, message: 'No GitHub users found' });
    }

    let totalNewContributions = 0;

    // 5. Query GitHub Search API for each user
    // We query: is:pr is:merged author:{username} repo:{repo1} repo:{repo2}
    for (const account of githubAccounts) {
      const githubUsernameRes = await fetch(`https://api.github.com/user/${account.providerAccountId}`);
      if (!githubUsernameRes.ok) continue;
      const githubUserData = await githubUsernameRes.json();
      const githubUsername = githubUserData.login;

      // Search PRs from the last 7 days to keep the sync window small
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const dateString = sevenDaysAgo.toISOString().split('T')[0];

      const query = `is:pr is:merged author:${githubUsername} ${repoQueries} closed:>${dateString}`;
      
      const searchRes = await fetch(`https://api.github.com/search/issues?q=${encodeURIComponent(query)}`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          // Optional: Add a GitHub PAT to avoid rate limits
          // ...(process.env.GITHUB_TOKEN && { 'Authorization': `token ${process.env.GITHUB_TOKEN}` })
        }
      });

      if (!searchRes.ok) continue;
      const searchData = await searchRes.json();

      // 6. Record New Contributions
      if (searchData.items && searchData.items.length > 0) {
        for (const pr of searchData.items) {
          // Find the corresponding project_id
          const prRepoUrl = pr.repository_url.replace('api.github.com/repos', 'github.com');
          const project = projects.find(p => p.github_repo_url.toLowerCase() === prRepoUrl.toLowerCase());
          
          if (!project) continue;

          // Upsert logic: Avoid duplicating points by using github_url as a unique constraint
          const { error: insertError } = await supabaseAdmin
            .from('contributions')
            .insert({
              user_id: account.userId,
              project_id: project.id,
              type: 'pr',
              github_url: pr.html_url,
              status: 'merged',
              points_awarded: 50, // Arbitrary points system
              contributed_at: pr.closed_at
            });

          // Postgres will error on UNIQUE constraint if PR already exists, we safely ignore it.
          if (!insertError) totalNewContributions++;
        }
      }
    }

    return NextResponse.json({ success: true, newContributions: totalNewContributions });

  } catch (err: any) {
    console.error("Cron Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
