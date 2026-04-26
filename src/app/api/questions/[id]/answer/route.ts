import { NextRequest, NextResponse } from "next/server";
import { fetchQuestionFileFromGitHub, updateFileOnGitHub } from "@/lib/github";
import matter from "gray-matter";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { answer } = await req.json();

    if (!answer || typeof answer !== "string") {
      return NextResponse.json(
        { error: "답변을 입력해주세요." },
        { status: 400 }
      );
    }

    const raw = await fetchQuestionFileFromGitHub(id);
    if (!raw) {
      return NextResponse.json(
        { error: "질문을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    const { data } = matter(raw);

    const newContent = `---
name: "${(data.name ?? "").replace(/"/g, '\\"')}"
question: "${(data.question ?? "").replace(/"/g, '\\"').replace(/\n/g, " ")}"
date: "${data.date ?? ""}"
answered: true
---

## 질문

${data.question}

## 답변

${answer.trim()}
`;

    await updateFileOnGitHub({
      path: `content/questions/${id}.md`,
      content: newContent,
      message: `답변: ${data.question?.slice(0, 30) ?? id}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("답변 저장 실패:", error);
    return NextResponse.json(
      { error: "답변 저장에 실패했습니다." },
      { status: 500 }
    );
  }
}
