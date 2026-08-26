import Link from "next/link";
import { FoxMark } from "@/components/fox-mark";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-black/10 bg-background dark:border-white/10">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold tracking-tight"
        >
          <FoxMark className="h-6 w-auto" />
          OinariTech
        </Link>
        <nav className="flex gap-6 text-sm">
          <Link href="/products" className="hover:underline">
            プロダクト
          </Link>
          <Link href="/#contact" className="hover:underline">
            お問い合わせ
          </Link>
        </nav>
      </div>
    </header>
  );
}
