"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AnswerForm({ questionId }: { questionId: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!searchParams.has("admin")) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/questions/${questionId}/answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answer: answer.trim() }),
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
    <form onSubmit={handleSubmit} style={{ padding: "4px 0 0" }}>
      <div style={{ marginBottom: 14 }}>
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

      <button
        type="submit"
        disabled={loading}
        className="btn accent"
        style={{ width: "100%", opacity: loading ? 0.5 : 1 }}
      >
        {loading ? "저장 중..." : "답변 등록"}
      </button>
    </form>
  );
}
