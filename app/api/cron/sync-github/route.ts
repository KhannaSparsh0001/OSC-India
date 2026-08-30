import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    // 1. Verify Vercel Cron Token (or allow local testing)
    const authHeader = request.headers.get('authorization');
    if (
      process.env.CRON_SECRET &&
      authHeader !== `Bearer ${process.env.CRON_SECRET}`
    ) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = await createAdminClient();

    // 2. Fetch active projects from database
    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select('id, github_repo_url');

    if (projectsError || !projects) {
      throw new Error(`Failed to fetch projects: ${projectsError?.message}`);
    }

    let totalSynced = 0;

    // 3. For each project, fetch recent PRs from GitHub
    for (const project of projects) {
      // Parse owner/repo from URL
      // e.g., https://github.com/OSC-India/platform -> OSC-India/platform
      const urlParts = project.github_repo_url.split('github.com/');
      if (urlParts.length !== 2) continue;
      const repo = urlParts[1]; // "owner/repo"

      // GitHub Search API (find merged PRs in the last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const dateString = sevenDaysAgo.toISOString().split('T')[0];
      
      const query = encodeURIComponent(`repo:${repo} is:pr is:merged merged:>=${dateString}`);
      const headers: Record<string, string> = {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'OSC-India-Cron',
      };
      
      // If a PAT is available, use it to increase rate limit
      if (process.env.GITHUB_PAT) {
        headers['Authorization'] = `token ${process.env.GITHUB_PAT}`;
      }

      const res = await fetch(`https://api.github.com/search/issues?q=${query}`, { headers });
      
      if (!res.ok) {
        console.error(`GitHub API error for ${repo}:`, await res.text());
        continue;
      }

      const data = await res.json();
      const items = data.items || [];

      // 4. Process each merged PR
      for (const pr of items) {
        // Skip if author is missing
        if (!pr.user || !pr.user.id) continue;
        const githubUserIdStr = pr.user.id.toString();

        // Check if author exists in our database via the `accounts` table
        const { data: accountData } = await supabase
          .from('accounts')
          .select('userId')
          .eq('provider', 'github')
          .eq('providerAccountId', githubUserIdStr)
          .single();

        if (accountData?.userId) {
          // Calculate points (e.g., 10 points per PR for MVP)
          const pointsAwarded = 10;

          // Upsert into contributions table using the unique github_url
          const { error: upsertError } = await supabase
            .from('contributions')
            .upsert({
              user_id: accountData.userId,
              project_id: project.id,
              type: 'pr',
              github_url: pr.html_url,
              status: 'merged',
              points_awarded: pointsAwarded,
              contributed_at: pr.closed_at || pr.created_at,
            }, { onConflict: 'github_url' });

          if (upsertError) {
            console.error(`Failed to upsert contribution ${pr.html_url}:`, upsertError);
          } else {
            totalSynced++;
          }
        }
      }
    }

    return NextResponse.json({ success: true, message: `Sync complete. Synced ${totalSynced} new contributions.` });

  } catch (err: any) {
    console.error('Cron job error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
