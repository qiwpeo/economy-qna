# 경제 Q&A

경제에 대한 궁금증을 묻고 답하는 사이트.

## 구조

```
content/
  posts/       ← 큐레이션 글 (마크다운)
  questions/   ← 질문+답변 파일 (마크다운)
src/
  app/         ← Next.js App Router 페이지
  lib/         ← 콘텐츠 읽기, GitHub API
```

## 로컬 개발

```bash
npm install
cp .env.local.example .env.local
# .env.local에 GITHUB_TOKEN, GITHUB_REPO 설정
npm run dev
```

## 환경변수

| 변수 | 설명 |
|------|------|
| `GITHUB_TOKEN` | GitHub Personal Access Token (repo에 쓰기 권한 필요) |
| `GITHUB_REPO` | `owner/repo` 형식 (예: `myname/economy-qna`) |

### GitHub Token 발급 방법

1. GitHub → Settings → Developer settings → Personal access tokens → Fine-grained tokens
2. "Generate new token" 클릭
3. Repository access: 이 repo만 선택
4. Permissions → Repository permissions → Contents: Read and write
5. Generate token → 복사

### Vercel 환경변수 설정

1. Vercel 대시보드 → 프로젝트 → Settings → Environment Variables
2. `GITHUB_TOKEN`과 `GITHUB_REPO` 추가
3. 재배포

## 배포 절차

1. GitHub에 repo 생성 후 push
2. Vercel에서 "Import Project" → 해당 repo 선택
3. 환경변수 설정 (위 참고)
4. Deploy

이후 repo에 push하면 Vercel이 자동 재배포.

## 운영 방법

### 큐레이션 글 작성

`content/posts/` 에 마크다운 파일 추가:

```markdown
---
title: "글 제목"
date: "2026-04-23"
summary: "요약"
---

본문 내용
```

### 질문에 답변하기

1. `content/questions/` 에서 답변할 파일 열기
2. `answered: false` → `answered: true` 로 변경
3. `## 답변` 아래에 답변 내용 작성
4. commit & push → 자동 재배포
