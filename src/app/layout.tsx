import type { Metadata, Viewport } from "next";
import TabBar from "@/components/TabBar";
import "./globals.css";

export const metadata: Metadata = {
  title: "경제 Q&A — 사랑방",
  description: "경제에 대한 궁금증을 묻고 답하는 공간",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#F5EFE6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <div style={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
          <main style={{ flex: 1 }}>{children}</main>
          <TabBar />
        </div>
      </body>
    </html>
  );
}
