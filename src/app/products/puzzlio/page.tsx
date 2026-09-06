import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PuzzlioMark } from "@/components/puzzlio-mark";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getProduct } from "@/lib/products";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Puzzlio",
  description:
    "OinariTech が開発しているパズルゲームアプリ「Puzzlio」の紹介ページ。",
};

const GAMES = [
  {
    name: "2048",
    description: "タイルをスライドして数字を合成しよう",
    color: "#DC9A34",
  },
  {
    name: "スライドパズル",
    description: "15個のピースを並べ替えて絵を完成させよう",
    color: "#3E7CA6",
  },
  {
    name: "数独",
    description: "9x9の盤面を数字で埋めるロジックパズル",
    color: "#5F9A52",
  },
  {
    name: "陣取りパズル",
    description: "色エリアに1本ずつ、隣接しないように旗を配置しよう",
    color: "#E85A41",
  },
];

export default async function PuzzlioProductPage() {
  const product = await getProduct("puzzlio");
  if (!product || !product.visible) {
    notFound();
  }

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />

      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-6 py-16">
          <div className="flex items-center gap-4">
            <PuzzlioMark className="h-14 w-14" />
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {product.title}
              </h1>
              <p className="mt-1 text-sm text-black/60 dark:text-white/60">
                Android / iOS 向けパズルゲームアプリ
              </p>
            </div>
          </div>

          <p className="mt-8 text-black/70 dark:text-white/70">
            {product.pageIntro}
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {GAMES.map((game) => (
              <div
                key={game.name}
                className="rounded-lg border border-black/10 p-4 dark:border-white/10"
              >
                <div className="flex items-center gap-2">
                  <span
                    aria-hidden
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: game.color }}
                  />
                  <h2 className="font-semibold">{game.name}</h2>
                </div>
                <p className="mt-1 text-sm text-black/70 dark:text-white/70">
                  {game.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-lg border border-black/10 p-6 dark:border-white/10">
            <h2 className="font-semibold">クローズドテスト募集中</h2>
            <p className="mt-2 text-sm text-black/70 dark:text-white/70">
              Google Play
              正式リリースに先立ち、クローズドテストにご協力いただける方を募集しています。
            </p>
            <p className="mt-4">
              <Link
                href="/closed-test/puzzlio"
                className="text-sm font-medium hover:underline"
              >
                募集ページを見る →
              </Link>
            </p>
          </div>

          <p className="mt-8 text-xs text-black/50 dark:text-white/50">
            <Link href="/privacy/puzzlio" className="hover:underline">
              Puzzlio プライバシーポリシー
            </Link>
          </p>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
