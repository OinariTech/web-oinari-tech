import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

function FoxMark({ className }: { className: string }) {
  // eslint-disable-next-line @next/next/no-img-element -- vector mark; next/image optimization adds no value for SVG
  return <img src="/brand/fox-mark.svg" alt="" className={className} />;
}

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
      <header className="sticky top-0 z-10 border-b border-black/10 bg-background dark:border-white/10">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <span className="flex items-center gap-2 text-lg font-semibold tracking-tight">
            <FoxMark className="h-6 w-auto" />
            OinariTech
          </span>
          <nav className="flex gap-6 text-sm">
            <a href="#services" className="hover:underline">
              つくっているもの
            </a>
            <a href="#contact" className="hover:underline">
              お問い合わせ
            </a>
          </nav>
        </div>
      </header>

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
            つくっているもの
          </h2>
          <div className="mt-8 rounded-lg border border-black/10 p-8 dark:border-white/10">
            <h3 className="font-semibold">個人開発のソフトウェア</h3>
            <p className="mt-2 text-sm text-black/70 dark:text-white/70">
              個人でソフトウェア・アプリケーションを開発しています。
              リリースした製品は順次こちらに掲載していきます。
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
        </section>
      </main>

      <footer className="border-t border-black/10 px-6 py-8 text-center text-sm text-black/50 dark:border-white/10 dark:text-white/50">
        © {new Date().getFullYear()} OinariTech
      </footer>
    </div>
  );
}
