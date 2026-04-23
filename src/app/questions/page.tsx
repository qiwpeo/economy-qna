import Link from "next/link";
import { getQuestions } from "@/lib/content";

export default function QuestionsPage() {
  const questions = getQuestions();

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
        <div className="label" style={{ marginBottom: 4 }}>Q&A</div>
        <h1 className="serif-title" style={{ fontSize: 26, lineHeight: 1.25 }}>
          질문과 답변
        </h1>
      </div>

      <hr className="hr" />

      {questions.length === 0 ? (
        <div style={{ padding: "40px 20px", textAlign: "center", color: "var(--mute)" }}>
          아직 질문이 없습니다.
        </div>
      ) : (
        questions.map((q, i) => (
          <div key={q.id}>
            <Link
              href={`/questions/${q.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="q-item">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span
                    className="label"
                    style={{
                      color: q.answered ? "var(--accent)" : "var(--mute)",
                      letterSpacing: "0.12em",
                    }}
                  >
                    {q.answered ? "답변완료" : "대기중"}
                  </span>
                  <span className="num" style={{ fontSize: 11, color: "var(--mute)" }}>
                    {q.date}
                  </span>
                </div>
                <div className="q-title">{q.question}</div>
                <div className="q-meta">
                  <span className="avatar" style={{ width: 18, height: 18, fontSize: 9 }}>
                    {q.name[0]}
                  </span>
                  <span>{q.name}</span>
                </div>
              </div>
            </Link>
            {i < questions.length - 1 && <hr className="hr" />}
          </div>
        ))
      )}
    </div>
  );
}
