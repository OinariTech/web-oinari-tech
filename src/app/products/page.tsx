import type { Metadata } from "next";
import Link from "next/link";
import { PuzzlioMark } from "@/components/puzzlio-mark";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "プロダクト",
  description: "OinariTech が個人開発しているソフトウェア・アプリケーション一覧。",
};

export default function ProductsPage() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />

      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-6 py-16">
          <h1 className="text-3xl font-bold tracking-tight">プロダクト</h1>
          <p className="mt-4 text-black/70 dark:text-white/70">
            現在、個人開発でソフトウェア・アプリケーションを制作しています。
            リリースした製品はこちらに順次掲載していく予定です。
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <Link
              href="/products/puzzlio"
              className="group rounded-lg border border-black/10 p-6 transition-colors hover:border-black/20 dark:border-white/10 dark:hover:border-white/20"
            >
              <PuzzlioMark className="h-10 w-10" />
              <h2 className="mt-4 text-lg font-semibold group-hover:underline">
                Puzzlio
              </h2>
              <p className="mt-1 text-sm text-black/70 dark:text-white/70">
                定番のパズルゲームを1つにまとめた、Android / iOS
                向けのパズルゲームアプリ。
              </p>
              <span className="mt-4 inline-block rounded-full border border-black/15 px-3 py-1 text-xs text-black/60 dark:border-white/15 dark:text-white/60">
                クローズドテスト募集中
              </span>
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
