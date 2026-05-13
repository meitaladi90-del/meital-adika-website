import { NextResponse } from "next/server";

const GITHUB_TOKEN = process.env.GITHUB_PAT ?? "";
const REPO = "meitaladi90-del/meital-adika-website";
const FILE_PATH = "public/workshops.json";

export async function GET() {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) return NextResponse.json([]);
    const data = await res.json();
    const content = Buffer.from(data.content, "base64").toString("utf8");
    const workshops = JSON.parse(content);
    const active = workshops.filter(
      (w: { isCancelled: boolean; spotsLeft: number }) =>
        !w.isCancelled && w.spotsLeft > 0
    );
    return NextResponse.json(active);
  } catch {
    return NextResponse.json([]);
  }
}
