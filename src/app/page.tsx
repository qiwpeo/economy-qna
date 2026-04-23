import Link from "next/link";
import { getPosts } from "@/lib/content";

export default function HomePage() {
  const posts = getPosts();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">큐레이션</h1>
      {posts.length === 0 ? (
        <p className="text-gray-500">아직 글이 없습니다.</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.slug} className="border-b pb-4">
              <Link href={`/posts/${post.slug}`} className="block group">
                <h2 className="text-lg font-semibold group-hover:underline">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-500 mt-1">{post.date}</p>
                {post.summary && (
                  <p className="text-gray-600 mt-1">{post.summary}</p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
