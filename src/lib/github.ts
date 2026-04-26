const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;
const GITHUB_REPO = process.env.GITHUB_REPO!; // "owner/repo"

interface CommitFileParams {
  path: string;
  content: string;
  message: string;
}

export async function commitFileToGitHub({
  path,
  content,
  message,
}: CommitFileParams) {
  const [owner, repo] = GITHUB_REPO.split("/");
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      "Content-Type": "application/json",
      Accept: "application/vnd.github+json",
    },
    body: JSON.stringify({
      message,
      content: Buffer.from(content).toString("base64"),
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GitHub API error (${res.status}): ${body}`);
  }

  return res.json();
}

interface GitHubFile {
  name: string;
  download_url: string;
}

export async function fetchQuestionsFromGitHub(): Promise<
  Array<{ filename: string; content: string }>
> {
  const [owner, repo] = GITHUB_REPO.split("/");
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/content/questions`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
    },
    cache: "no-store",
  });

  if (!res.ok) return [];

  const files: GitHubFile[] = await res.json();
  const mdFiles = files.filter((f) => f.name.endsWith(".md"));

  const results = await Promise.all(
    mdFiles.map(async (f) => {
      const raw = await fetch(f.download_url, { cache: "no-store" });
      return { filename: f.name, content: await raw.text() };
    })
  );

  return results;
}

export async function fetchQuestionFileFromGitHub(
  id: string
): Promise<string | null> {
  const [owner, repo] = GITHUB_REPO.split("/");
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/content/questions/${id}.md`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
    },
    cache: "no-store",
  });

  if (!res.ok) return null;

  const data = await res.json();
  return Buffer.from(data.content, "base64").toString("utf-8");
}

export async function updateFileOnGitHub({
  path,
  content,
  message,
}: CommitFileParams) {
  const [owner, repo] = GITHUB_REPO.split("/");
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

  // Get current file SHA (required for updates)
  const current = await fetch(url, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
    },
  });

  if (!current.ok) {
    throw new Error(`File not found: ${path}`);
  }

  const { sha } = await current.json();

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      "Content-Type": "application/json",
      Accept: "application/vnd.github+json",
    },
    body: JSON.stringify({
      message,
      content: Buffer.from(content).toString("base64"),
      sha,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GitHub API error (${res.status}): ${body}`);
  }

  return res.json();
}
