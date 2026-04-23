import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, getPosts } from "@/lib/content";

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

function renderBlock(block: string, index: number) {
  // Heading
  if (block.startsWith("## ")) {
    return (
      <h2 key={index} style={{
        fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em",
        margin: "28px 0 12px", lineHeight: 1.4,
      }}>
        {block.slice(3)}
      </h2>
    );
  }

  // Image
  const imgMatch = block.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
  if (imgMatch) {
    return (
      <div key={index} style={{
        margin: "20px -8px", padding: "16px 0",
        borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)",
        overflow: "auto",
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imgMatch[2]}
          alt={imgMatch[1]}
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>
    );
  }

  // List
  if (block.startsWith("- ")) {
    const items = block.split("\n").filter((l) => l.startsWith("- "));
    return (
      <ul key={index} style={{ margin: "8px 0 14px", paddingLeft: 20 }}>
        {items.map((item, j) => (
          <li key={j} style={{ margin: "6px 0", lineHeight: 1.7 }}
            dangerouslySetInnerHTML={{ __html: inlineFormat(item.slice(2)) }}
          />
        ))}
      </ul>
    );
  }

  // Paragraph
  return (
    <p key={index} style={{ margin: "0 0 14px" }}
      dangerouslySetInnerHTML={{ __html: inlineFormat(block) }}
    />
  );
}

function inlineFormat(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const blocks = post.content
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="page-in safe-bottom">
      <div className="top-bar">
        <Link href="/" className="icon-btn" style={{ textDecoration: "none", color: "var(--ink)" }}>
          <svg viewBox="0 0 20 20" width={18} height={18} fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 4L6 10l6 6" />
          </svg>
        </Link>
        <span className="label">My Column</span>
        <div style={{ width: 34 }} />
      </div>

      <div style={{ padding: "12px 24px 8px" }}>
        <div className="num label" style={{ color: "var(--accent)", letterSpacing: "0.18em" }}>
          {post.date}
        </div>
        <h1 className="serif-title" style={{ fontSize: 26, lineHeight: 1.3, margin: "8px 0 6px" }}>
          {post.title}
        </h1>
      </div>

      <hr className="hr" style={{ margin: "10px 24px" }} />

      <div style={{
        padding: "12px 24px 8px",
        fontSize: 15,
        lineHeight: 1.85,
        color: "var(--ink)",
      }}>
        <div className="dropcap">
          {blocks.map((block, i) => renderBlock(block, i))}
        </div>
      </div>
    </div>
  );
}
