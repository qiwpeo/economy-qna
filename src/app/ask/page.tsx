"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AskPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), question: question.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "오류가 발생했습니다.");
        return;
      }

      router.push("/questions");
    } catch {
      setError("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-in safe-bottom">
      {/* Top bar */}
      <div className="top-bar">
        <Link href="/questions" className="icon-btn" style={{ textDecoration: "none", color: "var(--ink)" }}>
          <svg viewBox="0 0 20 20" width={18} height={18} fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 4L6 10l6 6" />
          </svg>
        </Link>
        <span className="label">New Question</span>
        <div style={{ width: 34 }} />
      </div>

      <div style={{ padding: "10px 20px 6px" }}>
        <h1 className="serif-title" style={{ fontSize: 26, lineHeight: 1.25 }}>
          질문하기
        </h1>
      </div>

      <form onSubmit={handleSubmit} style={{ padding: "20px 20px" }}>
        <div style={{ marginBottom: 20 }}>
          <label className="label" style={{ display: "block", marginBottom: 8 }}>
            이름
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={50}
            className="form-input"
            placeholder="이름을 입력하세요"
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label className="label" style={{ display: "block", marginBottom: 8 }}>
            질문
          </label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
            maxLength={2000}
            rows={6}
            className="form-textarea"
            placeholder="궁금한 점을 자유롭게 적어주세요"
          />
        </div>

        {error && (
          <div style={{
            color: "var(--accent)", fontSize: 13, marginBottom: 16,
            padding: "10px 14px", background: "rgba(184,83,58,0.06)",
            borderRadius: "var(--radius)",
          }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn accent"
          style={{ width: "100%", opacity: loading ? 0.5 : 1 }}
        >
          {loading ? "제출 중..." : "질문 보내기"}
        </button>
      </form>
    </div>
  );
}
