import type { Metadata } from "next";
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

          <div className="mt-8 rounded-lg border border-dashed border-black/20 p-8 text-center dark:border-white/20">
            <p className="text-sm text-black/50 dark:text-white/50">
              準備中です。もうしばらくお待ちください。
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
