"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { id: "home", label: "칼럼", href: "/" },
  { id: "questions", label: "질문", href: "/questions" },
  { id: "ask", label: "질문하기", href: "/ask" },
];

export default function TabBar() {
  const pathname = usePathname();

  function isActive(tab: (typeof tabs)[number]) {
    if (tab.id === "home") return pathname === "/" || pathname.startsWith("/posts");
    if (tab.id === "questions")
      return pathname === "/questions" || (pathname.startsWith("/questions/") && pathname !== "/questions");
    return pathname === tab.href;
  }

  return (
    <nav className="tabbar">
      {tabs.map((t) => (
        <Link key={t.id} href={t.href} className={`tab ${isActive(t) ? "on" : ""}`}>
          <span>{t.label}</span>
          <span className="tab-dot" />
        </Link>
      ))}
    </nav>
  );
}
