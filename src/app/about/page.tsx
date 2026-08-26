import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "プロフィール",
  description:
    "OinariTech の運営者情報と、個人開発における開発スタイル・技術構成について。",
};

const TECH_STACK = [
  {
    label: "フロントエンド",
    value: "Next.js (App Router) / React / TypeScript",
  },
  { label: "スタイリング", value: "Tailwind CSS" },
  { label: "インフラ", value: "Google Cloud Run / Docker / Artifact Registry" },
  { label: "CI / CD", value: "GitHub Actions" },
  { label: "アクセス解析", value: "Google Analytics (GA4)" },
];

export default function AboutPage() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />

      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-6 py-16">
          <h1 className="text-3xl font-bold tracking-tight">プロフィール</h1>

          <p className="mt-6 text-black/70 dark:text-white/70">
            OinariTech は、個人でソフトウェア・アプリケーションを開発している屋号です。
            日々の中で「こうなっていたら便利なのに」と感じたことを形にすることを大切にしながら、
            小さく作って動かし、使いながら育てていくスタイルで制作しています。
          </p>

          <div className="mt-12 space-y-12">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">基本情報</h2>
              <div className="mt-4 rounded-lg border border-black/10 p-8 dark:border-white/10">
                <dl className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-[8rem_1fr]">
                  <dt className="text-black/50 dark:text-white/50">屋号</dt>
                  <dd>OinariTech</dd>
                  <dt className="text-black/50 dark:text-white/50">活動内容</dt>
                  <dd>個人でのソフトウェア・アプリケーション開発</dd>
                  <dt className="text-black/50 dark:text-white/50">拠点</dt>
                  <dd>日本</dd>
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
            </div>

            <div>
              <h2 className="text-xl font-semibold tracking-tight">
                開発スタイル
              </h2>
              <div className="mt-4 space-y-4 text-sm text-black/70 dark:text-white/70">
                <p>
                  企画から設計・実装、リリース後の運用まで、すべて個人で行っています。
                  規模が小さいぶん意思決定が速く、思いついたことをすぐ試せることを強みだと考えています。
                </p>
                <p>
                  開発には Anthropic の{" "}
                  <a
                    href="https://claude.com/claude-code"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-black hover:underline dark:text-white"
                  >
                    Claude Code
                  </a>{" "}
                  を活用しています。設計の検討やコードレビュー、CI/CD
                  の構築といった工程を AI と協働して進めることで、
                  個人開発でありながら継続的なリリースと品質の維持を両立させています。
                  このサイト自体も、Claude Code と共に開発・運用しています。
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold tracking-tight">
                このサイトの技術構成
              </h2>
              <div className="mt-4 rounded-lg border border-black/10 p-8 dark:border-white/10">
                <dl className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-[8rem_1fr]">
                  {TECH_STACK.map((item) => (
                    <div key={item.label} className="contents">
                      <dt className="text-black/50 dark:text-white/50">
                        {item.label}
                      </dt>
                      <dd>{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <p className="mt-4 text-sm text-black/50 dark:text-white/50">
                main ブランチへの反映をトリガーに、GitHub Actions
                でビルドとデプロイを自動実行しています。
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold tracking-tight">
                お問い合わせ
              </h2>
              <p className="mt-4 text-sm text-black/70 dark:text-white/70">
                お仕事のご相談、プロダクトについてのご質問などお気軽にご連絡ください。
              </p>
              <p className="mt-4">
                <a
                  href="mailto:oinaritech@gmail.com"
                  className="text-sm font-medium hover:underline"
                >
                  oinaritech@gmail.com
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
