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
