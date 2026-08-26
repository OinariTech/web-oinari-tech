import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-black/10 px-6 py-8 text-center text-sm text-black/50 dark:border-white/10 dark:text-white/50">
      <nav className="mb-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        <Link href="/products" className="hover:underline">
          プロダクト
        </Link>
        <Link href="/about" className="hover:underline">
          プロフィール
        </Link>
        <Link href="/privacy" className="hover:underline">
          プライバシーポリシー
        </Link>
        <Link href="/#contact" className="hover:underline">
          お問い合わせ
        </Link>
      </nav>
      © {new Date().getFullYear()} OinariTech
    </footer>
  );
}
