import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json({ error: "Username is required" }, { status: 400 });
  }

  try {
    const cleanUsername = username.replace(/^@/, "").trim();
    const res = await fetch(`https://github.com/users/${cleanUsername}/contributions`, {
      headers: {
        "User-Agent": "OSC-India-Dashboard",
      },
      next: { revalidate: 3600 }, // Cache for 1 hour on server
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Failed to fetch contributions from GitHub (status ${res.status})` },
        { status: res.status }
      );
    }

    const html = await res.text();

    // Parse contribution data from the HTML
    // GitHub's contribution calendar uses <td> with data-date and data-level,
    // and <tool-tip> elements with the contribution count text.
    const countMap = new Map<string, number>();
    const regex = /data-date="([^"]+)"[^>]*id="([^"]+)"[\s\S]*?<tool-tip[^>]*for="\2"[^>]*>([^<]*)<\/tool-tip>/g;

    let match;
    while ((match = regex.exec(html)) !== null) {
      const date = match[1];
      const text = match[3];

      let count = 0;
      if (text && !text.toLowerCase().includes("no contributions")) {
        const matchCount = text.match(/^(\d+)/);
        if (matchCount) {
          count = parseInt(matchCount[1], 10);
        }
      }

      // Include zero-count days so the frontend can distinguish
      // "no contributions" from "no data"
      countMap.set(date, count);
    }

    const contributions = Array.from(countMap.entries()).map(([date, count]) => ({
      date,
      count,
    }));

    return NextResponse.json({
      success: true,
      contributions,
      fetchedAt: new Date().toISOString(),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to fetch contribution graph";
    console.warn("GitHub activity API error:", err);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
