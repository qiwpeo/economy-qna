import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, getPosts } from "@/lib/content";

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const paragraphs = post.content
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="page-in safe-bottom">
      {/* Top bar */}
      <div className="top-bar">
        <Link href="/" className="icon-btn" style={{ textDecoration: "none", color: "var(--ink)" }}>
          <svg viewBox="0 0 20 20" width={18} height={18} fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 4L6 10l6 6" />
          </svg>
        </Link>
        <span className="label">My Column</span>
        <div style={{ width: 34 }} />
      </div>

      {/* Header */}
      <div style={{ padding: "12px 24px 8px" }}>
        <div className="num label" style={{ color: "var(--accent)", letterSpacing: "0.18em" }}>
          {post.date}
        </div>
        <h1 className="serif-title" style={{ fontSize: 26, lineHeight: 1.3, margin: "8px 0 6px" }}>
          {post.title}
        </h1>
      </div>

      <hr className="hr" style={{ margin: "10px 24px" }} />

      {/* Body */}
      <div style={{
        padding: "12px 24px 8px",
        fontSize: 15,
        lineHeight: 1.85,
        color: "var(--ink)",
      }}>
        <div className="dropcap">
          {paragraphs.map((p, i) => (
            <p key={i} style={{ margin: "0 0 14px" }}>{p}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
