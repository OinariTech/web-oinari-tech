import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "プロフィール",
  description: "OinariTech の運営者情報。",
};

export default function AboutPage() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />

      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-6 py-16">
          <h1 className="text-3xl font-bold tracking-tight">プロフィール</h1>
          <div className="mt-8 rounded-lg border border-black/10 p-8 dark:border-white/10">
            <dl className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-[8rem_1fr]">
              <dt className="text-black/50 dark:text-white/50">屋号</dt>
              <dd>OinariTech</dd>
              <dt className="text-black/50 dark:text-white/50">活動内容</dt>
              <dd>個人でのソフトウェア・アプリケーション開発</dd>
              <dt className="text-black/50 dark:text-white/50">連絡先</dt>
              <dd>
                <a
                  href="mailto:oinaritech@gmail.com"
                  className="hover:underline"
                >
                  oinaritech@gmail.com
                </a>
              </dd>
            </dl>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
