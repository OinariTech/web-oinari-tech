import Link from "next/link";
import { FoxMark } from "@/components/fox-mark";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    description: SITE_DESCRIPTION,
    email: "oinaritech@gmail.com",
  };

  return (
    <div className="flex flex-1 flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <SiteHeader />

      <main className="flex-1">
        <section className="relative overflow-hidden px-6 py-24 text-center sm:py-32">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(55%_65%_at_50%_0%,rgba(234,120,50,0.26),transparent)] dark:bg-[radial-gradient(55%_65%_at_50%_0%,rgba(234,120,50,0.20),transparent)]"
          />
          <div className="mx-auto max-w-5xl">
            <div className="flex items-center justify-center gap-3 sm:gap-4">
              <FoxMark className="h-14 w-auto drop-shadow-[0_6px_16px_rgba(80,30,20,0.18)] sm:h-20" />
              <h1 className="bg-linear-to-br from-[#8f2a1c] to-[#C8412F] bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-7xl dark:from-[#F0603F] dark:to-[#EFC062]">
                OinariTech
              </h1>
            </div>
            <p className="mx-auto mt-6 max-w-2xl text-lg tracking-wide text-black/60 dark:text-white/60">
              コンコンと、
              <span className="font-medium text-[#ea7832]">閃く</span>。
            </p>
          </div>
        </section>

        <section id="services" className="mx-auto max-w-5xl px-6 pb-24">
          <h2 className="text-2xl font-semibold tracking-tight">
            プロダクト
          </h2>
          <div className="mt-8 rounded-lg border border-black/10 p-8 dark:border-white/10">
            <h3 className="font-semibold">個人開発のソフトウェア</h3>
            <p className="mt-2 text-sm text-black/70 dark:text-white/70">
              個人でソフトウェア・アプリケーションを開発しています。
              リリースした製品は順次こちらに掲載していきます。
            </p>
            <p className="mt-4">
              <Link
                href="/products"
                className="text-sm font-medium hover:underline"
              >
                プロダクト一覧を見る →
              </Link>
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 pb-24">
          <h2 className="text-2xl font-semibold tracking-tight">
            プロフィール
          </h2>
          <div className="mt-8 rounded-lg border border-black/10 p-8 dark:border-white/10">
            <p className="text-sm text-black/70 dark:text-white/70">
              OinariTech の運営者情報はこちらでご確認いただけます。
            </p>
            <p className="mt-4">
              <Link
                href="/about"
                className="text-sm font-medium hover:underline"
              >
                プロフィールを見る →
              </Link>
            </p>
          </div>
        </section>

        <section
          id="contact"
          className="mx-auto max-w-5xl px-6 pb-24 text-center"
        >
          <h2 className="text-2xl font-semibold tracking-tight">
            お問い合わせ
          </h2>
          <p className="mt-4 text-black/70 dark:text-white/70">
            お仕事のご相談はお気軽にご連絡ください。
          </p>
          <p className="mt-4">
            <a
              href="mailto:oinaritech@gmail.com"
              className="font-medium hover:underline"
            >
              oinaritech@gmail.com
            </a>
          </p>
          <p className="mt-6 text-xs text-black/50 dark:text-white/50">
            お問い合わせいただいた内容の取り扱いについては
            <Link href="/privacy" className="hover:underline">
              プライバシーポリシー
            </Link>
            をご覧ください。
          </p>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
