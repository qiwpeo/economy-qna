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

  return (
    <article>
      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-6">{post.date}</p>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: simpleMarkdown(post.content) }}
      />
    </article>
  );
}

function simpleMarkdown(md: string): string {
  return md
    .split("\n\n")
    .map((block) => {
      block = block.trim();
      if (block.startsWith("## ")) return `<h2>${block.slice(3)}</h2>`;
      if (block.startsWith("### ")) return `<h3>${block.slice(4)}</h3>`;
      if (block.startsWith("- ")) {
        const items = block
          .split("\n")
          .map((l) => `<li>${l.replace(/^- /, "")}</li>`)
          .join("");
        return `<ul>${items}</ul>`;
      }
      return `<p>${block.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")}</p>`;
    })
    .join("\n");
}
