import type { Metadata } from "next";
import Link from "next/link";
import type { ComponentType } from "react";
import { PuzzlioMark } from "@/components/puzzlio-mark";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getVisibleProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "プロダクト",
  description: "OinariTech が個人開発しているソフトウェア・アプリケーション一覧。",
};

const PRODUCT_MARKS: Record<string, ComponentType<{ className?: string }>> = {
  puzzlio: PuzzlioMark,
};

export default async function ProductsPage() {
  const products = await getVisibleProducts();

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

          {products.length > 0 ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {products.map((product) => {
                const Mark = PRODUCT_MARKS[product.id];
                return (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    className="group rounded-lg border border-black/10 p-6 transition-colors hover:border-black/20 dark:border-white/10 dark:hover:border-white/20"
                  >
                    {Mark && <Mark className="h-10 w-10" />}
                    <h2 className="mt-4 text-lg font-semibold group-hover:underline">
                      {product.title}
                    </h2>
                    <p className="mt-1 text-sm text-black/70 dark:text-white/70">
                      {product.cardDescription}
                    </p>
                    {product.badge && (
                      <span className="mt-4 inline-block rounded-full border border-black/15 px-3 py-1 text-xs text-black/60 dark:border-white/15 dark:text-white/60">
                        {product.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="mt-10 rounded-lg border border-dashed border-black/20 p-8 text-center dark:border-white/20">
              <p className="text-sm text-black/50 dark:text-white/50">
                準備中です。もうしばらくお待ちください。
              </p>
            </div>
          )}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
