import { NextRequest, NextResponse } from "next/server";

const GITHUB_TOKEN = process.env.GITHUB_PAT ?? "";
const REPO = "meitaladi90-del/meital-adika-website";
const FILE_PATH = "public/workshops.json";
const GH_URL = `https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`;

interface Workshop {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
  maxSpots: number;
  spotsLeft: number;
  isCancelled: boolean;
}

async function readFromGitHub(): Promise<{ workshops: Workshop[]; sha: string }> {
  const res = await fetch(GH_URL, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
    },
    cache: "no-store",
  });
  if (!res.ok) return { workshops: [], sha: "" };
  const data = await res.json();
  const content = Buffer.from(data.content, "base64").toString("utf8");
  return { workshops: JSON.parse(content), sha: data.sha };
}

async function writeToGitHub(
  workshops: Workshop[],
  sha: string,
  message: string
): Promise<boolean> {
  const content = Buffer.from(JSON.stringify(workshops, null, 2) + "\n").toString("base64");
  const res = await fetch(GH_URL, {
    method: "PUT",
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      "Content-Type": "application/json",
      Accept: "application/vnd.github.v3+json",
    },
    body: JSON.stringify({ message, content, sha }),
  });
  return res.ok;
}

export async function GET() {
  const { workshops } = await readFromGitHub();
  return NextResponse.json(workshops);
}

export async function POST(req: NextRequest) {
  const { workshop } = await req.json();
  const { workshops, sha } = await readFromGitHub();
  const id = Date.now().toString();
  const updated = [...workshops, { ...workshop, id, isCancelled: false }];
  const ok = await writeToGitHub(updated, sha, "feat: add open workshop");
  if (!ok) return NextResponse.json({ error: "שגיאה בשמירה" }, { status: 500 });
  return NextResponse.json({ id });
}

export async function PATCH(req: NextRequest) {
  const { id, changes } = await req.json();
  const { workshops, sha } = await readFromGitHub();
  const updated = workshops.map((w) => (w.id === id ? { ...w, ...changes } : w));
  const ok = await writeToGitHub(updated, sha, "chore: update workshop");
  if (!ok) return NextResponse.json({ error: "שגיאה בשמירה" }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const { workshops, sha } = await readFromGitHub();
  const updated = workshops.filter((w) => w.id !== id);
  const ok = await writeToGitHub(updated, sha, "chore: remove workshop");
  if (!ok) return NextResponse.json({ error: "שגיאה בשמירה" }, { status: 500 });
  return NextResponse.json({ ok: true });
}
