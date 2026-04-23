import Link from "next/link";
import { notFound } from "next/navigation";
import { getQuestion, getQuestions } from "@/lib/content";

export function generateStaticParams() {
  return getQuestions().map((q) => ({ id: q.id }));
}

export default async function QuestionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const q = getQuestion(id);
  if (!q) notFound();

  const sections = q.content.split("## 답변");
  const answerPart = sections[1]?.trim();

  return (
    <div className="page-in safe-bottom">
      {/* Top bar */}
      <div className="top-bar">
        <Link href="/questions" className="icon-btn" style={{ textDecoration: "none", color: "var(--ink)" }}>
          <svg viewBox="0 0 20 20" width={18} height={18} fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 4L6 10l6 6" />
          </svg>
        </Link>
        <span className="label">{q.answered ? "답변완료" : "대기중"}</span>
        <div style={{ width: 34 }} />
      </div>

      <div style={{ padding: "12px 20px 20px" }}>
        <h1 className="serif-title" style={{ fontSize: 22, lineHeight: 1.35, margin: "6px 0 14px" }}>
          {q.question}
        </h1>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <span className="avatar" style={{ width: 26, height: 26, fontSize: 13 }}>
            {q.name[0]}
          </span>
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
            <span style={{ fontSize: 13, color: "var(--ink)" }}>{q.name}</span>
            <span className="num" style={{ fontSize: 11, color: "var(--mute)" }}>
              {q.date}
            </span>
          </div>
        </div>
      </div>

      {/* Answer section */}
      <div style={{
        padding: "8px 20px 4px",
        background: "var(--bg-elev)",
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
      }}>
        <span className="label">답변</span>
      </div>

      {answerPart ? (
        <div className="answer best">
          <div className="best-ribbon">
            <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--accent)" }} />
            Answer
          </div>
          <div className="ans-body" style={{ whiteSpace: "pre-wrap" }}>
            {answerPart}
          </div>
        </div>
      ) : (
        <div className="answer">
          <div style={{ color: "var(--mute)", fontSize: 13.5, textAlign: "center", padding: "20px 0" }}>
            아직 답변이 등록되지 않았습니다.
          </div>
        </div>
      )}
    </div>
  );
}
