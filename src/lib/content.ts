import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

export interface Post {
  slug: string;
  title: string;
  date: string;
  summary: string;
  content: string;
}

export interface Question {
  id: string;
  name: string;
  question: string;
  date: string;
  answered: boolean;
  content: string;
}

function readMdFiles(dir: string) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((filename) => {
      const filePath = path.join(dir, filename);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);
      return { filename, data, content };
    });
}

export function getPosts(): Post[] {
  return readMdFiles(path.join(CONTENT_DIR, "posts"))
    .map(({ filename, data, content }) => ({
      slug: filename.replace(/\.md$/, ""),
      title: data.title ?? "",
      date: data.date ?? "",
      summary: data.summary ?? "",
      content,
    }))
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPost(slug: string): Post | null {
  const filePath = path.join(CONTENT_DIR, "posts", `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? "",
    date: data.date ?? "",
    summary: data.summary ?? "",
    content,
  };
}

export function getQuestions(): Question[] {
  return readMdFiles(path.join(CONTENT_DIR, "questions"))
    .map(({ filename, data, content }) => ({
      id: filename.replace(/\.md$/, ""),
      name: data.name ?? "",
      question: data.question ?? "",
      date: data.date ?? "",
      answered: data.answered ?? false,
      content,
    }))
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getQuestion(id: string): Question | null {
  const filePath = path.join(CONTENT_DIR, "questions", `${id}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    id,
    name: data.name ?? "",
    question: data.question ?? "",
    date: data.date ?? "",
    answered: data.answered ?? false,
    content,
  };
}
