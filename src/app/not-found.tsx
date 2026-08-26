import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />

      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-6 py-24 text-center">
          <p className="text-sm font-medium tracking-widest text-[#ea7832]">
            404
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight">
            ページが見つかりません
          </h1>
          <p className="mt-4 text-black/70 dark:text-white/70">
            お探しのページは、移動または削除された可能性があります。
          </p>

          <p className="mt-10">
            <Link href="/" className="text-sm font-medium hover:underline">
              トップページへ戻る
            </Link>
          </p>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
