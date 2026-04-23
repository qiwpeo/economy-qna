import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "경제 Q&A",
  description: "경제에 대한 궁금증을 묻고 답하는 공간",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="border-b">
          <nav className="max-w-2xl mx-auto px-4 py-4 flex gap-6 items-center">
            <Link href="/" className="font-bold text-lg">
              경제 Q&A
            </Link>
            <Link href="/questions" className="hover:underline">
              질문/답변
            </Link>
            <Link href="/ask" className="hover:underline">
              질문하기
            </Link>
          </nav>
        </header>
        <main className="max-w-2xl mx-auto px-4 py-8 flex-1 w-full">
          {children}
        </main>
        <footer className="border-t text-center py-4 text-sm text-gray-500">
          경제 Q&A
        </footer>
      </body>
    </html>
  );
}
