import Link from "next/link";
import { getQuestions } from "@/lib/content";

export default function QuestionsPage() {
  const questions = getQuestions();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">질문/답변</h1>
        <Link
          href="/ask"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          질문하기
        </Link>
      </div>
      {questions.length === 0 ? (
        <p className="text-gray-500">아직 질문이 없습니다.</p>
      ) : (
        <ul className="space-y-3">
          {questions.map((q) => (
            <li key={q.id} className="border rounded p-4">
              <Link href={`/questions/${q.id}`} className="block group">
                <div className="flex justify-between items-start gap-2">
                  <h2 className="font-medium group-hover:underline flex-1">
                    {q.question}
                  </h2>
                  <span
                    className={`text-xs px-2 py-1 rounded shrink-0 ${
                      q.answered
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {q.answered ? "답변완료" : "대기중"}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {q.name} &middot; {q.date}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
