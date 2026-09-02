import { createClient } from "@/lib/supabase/server";
import LeaderboardUI from "./LeaderboardUI";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function LeaderboardPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const q = searchParams?.q as string || "";
  
  const supabase = await createClient();

  let query = supabase
    .from("leaderboard_stats")
    .select(`
      total_points,
      rank,
      users!inner (
        name,
        email,
        image
      ),
      profiles (
        full_name,
        avatar_url
      )
    `)
    .order("total_points", { ascending: false });

  if (q) {
    query = query.ilike("users.name", `%${q}%`);
  }

  const { data: stats } = await query.limit(100);

  // Format data for the UI
  const users = stats?.map((stat: any, index: number) => {
    const fullName = stat.profiles?.[0]?.full_name || stat.users?.name || "Unknown User";
    const email = stat.users?.email || "";
    const username = email ? `@${email.split('@')[0]}` : "@user";
    const avatar = stat.profiles?.[0]?.avatar_url || stat.users?.image || "";
    
    // Calculate rank if it's missing in DB
    const rank = stat.rank || index + 1;
    
    return {
      rank,
      name: fullName,
      username,
      points: stat.total_points || 0,
      prs: Math.floor((stat.total_points || 0) / 10), // Mock PR count based on points
      isFirst: rank === 1,
      avatar,
    };
  }) || [];

  return <LeaderboardUI users={users} />;
}
