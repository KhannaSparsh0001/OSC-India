import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import LeaderboardUI from "./LeaderboardUI";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function LeaderboardPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    if (userError) {
      console.warn("Leaderboard auth verification notice:", userError.message);
    }
    redirect("/sign-in?next=/leaderboard");
  }

  const resolvedSearchParams = props?.searchParams ? await props.searchParams : {};
  const q = typeof resolvedSearchParams?.q === "string" ? resolvedSearchParams.q.trim() : "";
  const pageParam = typeof resolvedSearchParams?.page === "string" ? parseInt(resolvedSearchParams.page, 10) : 1;
  const page = isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;
  const PAGE_SIZE = 50;
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const admin = createAdminClient();

  // 1. Fetch paginated slice from public.profiles with exact count (blazing fast indexed SQL query)
  let paginatedContributors: Array<{
    id: string;
    rank: number;
    name: string;
    username: string;
    points: number;
    prs: number;
    projects: number;
    avatar: string;
    country: string;
    isFirst: boolean;
  }> = [];
  let totalCount = 0;

  try {
    let query = admin
      .from("profiles")
      .select("*, users(name, email, image)", { count: "exact" })
      .neq("role", "admin")
      .order("score", { ascending: false })
      .order("merged_prs", { ascending: false })
      .order("projects_count", { ascending: false })
      .range(from, to);

    if (q) {
      query = query.or(`full_name.ilike.%${q}%,github.ilike.%${q}%`);
    }

    const { data: dbRows, count, error } = await query;
    totalCount = count || 0;

    if (!error && dbRows && dbRows.length > 0) {
      paginatedContributors = dbRows.map((p: Record<string, unknown>, idx: number) => {
        const u = (p.users as Record<string, string | null>) || {};
        const email = (u.email || (p.email as string) || "").toLowerCase().trim();
        const github = ((p.github as string) || "").replace(/^@+/, "").trim();

        return {
          id: String(p.user_id || p.id),
          rank: from + idx + 1,
          name: (p.full_name as string) || u.name || "Contributor",
          username: github ? `@${github}` : email ? `@${email.split("@")[0]}` : "@contributor",
          points: Number(p.score ?? 0),
          prs: Number(p.merged_prs ?? 0),
          projects: Number(p.projects_count ?? 0),
          avatar: (p.avatar_url as string) || u.image || "",
          country: (p.country as string) || "IN",
          isFirst: from + idx === 0,
        };
      });
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Database fetch error";
    console.warn("Leaderboard profiles fetch notice:", msg);
  }

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  let profilePayload = null;

  if (user) {
    let currentProfile = null;
    const { data: profileByUserId } = await admin
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();
    currentProfile = profileByUserId;

    // Fallback to id (PK) — trigger sets id but not user_id
    if (!currentProfile) {
      const { data: profileById } = await admin
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();
      currentProfile = profileById;
    }

    profilePayload = {
      id: user.id,
      name: currentProfile?.full_name || user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split("@")[0] || "Contributor",
      email: user.email,
      avatar: currentProfile?.avatar_url || user.user_metadata?.avatar_url || user.user_metadata?.picture || null,
      role: currentProfile?.role || user.user_metadata?.role || "contributor",
      isAdmin: Boolean(currentProfile?.is_admin || user.user_metadata?.is_admin),
      github: currentProfile?.github || user.user_metadata?.github || user.user_metadata?.user_name || null,
    };
  }

  return (
    <LeaderboardUI
      initialUsers={paginatedContributors}
      initialProfile={profilePayload}
      initialSearch={q}
      currentPage={page}
      totalPages={totalPages}
      totalCount={totalCount}
    />
  );
}
