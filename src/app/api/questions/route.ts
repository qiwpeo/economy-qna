import { NextRequest, NextResponse } from "next/server";
import { commitFileToGitHub } from "@/lib/github";

export async function POST(req: NextRequest) {
  try {
    const { name, question } = await req.json();

    if (!name || !question) {
      return NextResponse.json(
        { error: "이름과 질문을 모두 입력해주세요." },
        { status: 400 }
      );
    }

    if (typeof name !== "string" || typeof question !== "string") {
      return NextResponse.json(
        { error: "잘못된 입력입니다." },
        { status: 400 }
      );
    }

    if (name.length > 50 || question.length > 2000) {
      return NextResponse.json(
        { error: "이름은 50자, 질문은 2000자 이내로 작성해주세요." },
        { status: 400 }
      );
    }

    const now = new Date();
    const timestamp = now.toISOString().replace(/[:.]/g, "-");
    const dateStr = now.toISOString().split("T")[0];
    const filename = `${timestamp}.md`;

    const fileContent = `---
name: "${name.replace(/"/g, '\\"')}"
question: "${question.replace(/"/g, '\\"').replace(/\n/g, " ")}"
date: "${dateStr}"
answered: false
---

## 질문

${question}

## 답변

`;

    await commitFileToGitHub({
      path: `content/questions/${filename}`,
      content: fileContent,
      message: `새 질문: ${name}님의 질문`,
    });

    return NextResponse.json({ success: true, id: timestamp });
  } catch (error) {
    console.error("질문 저장 실패:", error);
    return NextResponse.json(
      { error: "질문 저장에 실패했습니다. 잠시 후 다시 시도해주세요." },
      { status: 500 }
    );
  }
}
