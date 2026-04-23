import Link from "next/link";
import { getPosts } from "@/lib/content";

export default function HomePage() {
  const posts = getPosts();
  const today = new Date();
  const dateStr = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;
  const dayNames = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];

  return (
    <div className="page-in safe-bottom">
      {/* Top bar */}
      <div className="top-bar">
        <div style={{ width: 34 }} />
        <div />
        <div style={{ width: 34 }} />
      </div>

      {/* Title */}
      <div style={{ padding: "10px 20px 6px" }}>
        <div className="label" style={{ marginBottom: 4 }}>
          사랑방 · {dateStr} {dayNames[today.getDay()]}
        </div>
        <h1 className="serif-title" style={{ fontSize: 26, lineHeight: 1.25 }}>
          오늘의 칼럼
        </h1>
      </div>

      {/* Posts */}
      {posts.length === 0 ? (
        <div style={{ padding: "40px 20px", textAlign: "center", color: "var(--mute)" }}>
          아직 칼럼이 없습니다.
        </div>
      ) : (
        <>
          {/* Latest post as card */}
          {posts[0] && (
            <Link href={`/posts/${posts[0].slug}`} style={{ textDecoration: "none", color: "inherit" }}>
              <div className="column-card">
                <div className="kicker">Column · {posts[0].date}</div>
                <h3>{posts[0].title}</h3>
                <p style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}>
                  {posts[0].summary}
                </p>
              </div>
            </Link>
          )}

          <hr className="hr" />

          {/* Older posts */}
          {posts.slice(1).map((post, i) => (
            <div key={post.slug}>
              <Link href={`/posts/${post.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                <div className="q-item">
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span className="tag">Column</span>
                    <span className="num" style={{ fontSize: 11, color: "var(--mute)" }}>
                      {post.date}
                    </span>
                  </div>
                  <div className="q-title">{post.title}</div>
                  {post.summary && <div className="q-preview">{post.summary}</div>}
                </div>
              </Link>
              {i < posts.length - 2 && <hr className="hr" />}
            </div>
          ))}
        </>
      )}
    </div>
  );
}
