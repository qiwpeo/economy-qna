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
    <article>
      <div className="mb-4">
        <span
          className={`text-xs px-2 py-1 rounded ${
            q.answered
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {q.answered ? "답변완료" : "대기중"}
        </span>
      </div>
      <h1 className="text-xl font-bold mb-2">{q.question}</h1>
      <p className="text-sm text-gray-500 mb-6">
        {q.name} &middot; {q.date}
      </p>

      {answerPart ? (
        <div className="bg-gray-50 rounded p-4">
          <h2 className="font-semibold mb-2">답변</h2>
          <div className="whitespace-pre-wrap">{answerPart}</div>
        </div>
      ) : (
        <p className="text-gray-500">아직 답변이 등록되지 않았습니다.</p>
      )}
    </article>
  );
}
