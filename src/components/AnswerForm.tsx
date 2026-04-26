"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AnswerForm({ questionId }: { questionId: string }) {
  const router = useRouter();
  const [answer, setAnswer] = useState("");
  const [adminKey, setAdminKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="btn"
        style={{
          width: "100%",
          margin: "16px 0",
          fontSize: 13.5,
          color: "var(--mute)",
          background: "var(--bg-elev)",
          border: "1px solid var(--line)",
        }}
      >
        답변 작성하기
      </button>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/questions/${questionId}/answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answer: answer.trim(), adminKey }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "오류가 발생했습니다.");
        return;
      }

      router.refresh();
    } catch {
      setError("네트워크 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ padding: "16px 20px" }}>
      <div style={{ marginBottom: 14 }}>
        <label className="label" style={{ display: "block", marginBottom: 6 }}>
          관리자 키
        </label>
        <input
          type="password"
          value={adminKey}
          onChange={(e) => setAdminKey(e.target.value)}
          required
          className="form-input"
          placeholder="관리자 키를 입력하세요"
        />
      </div>

      <div style={{ marginBottom: 14 }}>
        <label className="label" style={{ display: "block", marginBottom: 6 }}>
          답변
        </label>
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          required
          rows={8}
          className="form-textarea"
          placeholder="답변을 작성하세요"
        />
      </div>

      {error && (
        <div style={{
          color: "var(--accent)", fontSize: 13, marginBottom: 12,
          padding: "10px 14px", background: "rgba(184,83,58,0.06)",
          borderRadius: "var(--radius)",
        }}>
          {error}
        </div>
      )}

      <div style={{ display: "flex", gap: 10 }}>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="btn"
          style={{ flex: 1, background: "var(--bg-elev)", border: "1px solid var(--line)" }}
        >
          취소
        </button>
        <button
          type="submit"
          disabled={loading}
          className="btn accent"
          style={{ flex: 1, opacity: loading ? 0.5 : 1 }}
        >
          {loading ? "저장 중..." : "답변 등록"}
        </button>
      </div>
    </form>
  );
}
