import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="sticky top-0 z-10 border-b border-black/10 bg-background dark:border-white/10">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <span className="text-lg font-semibold tracking-tight">
            OinariTech
          </span>
          <nav className="flex gap-6 text-sm">
            <a href="#services" className="hover:underline">
              事業内容
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
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(50%_40%_at_50%_0%,rgba(234,120,50,0.14),transparent)] dark:bg-[radial-gradient(50%_40%_at_50%_0%,rgba(234,120,50,0.10),transparent)]"
          />
          <div className="mx-auto max-w-5xl">
            <Image
              src="/brand/fox-mark.png"
              alt="OinariTech"
              width={72}
              height={72}
              priority
              className="mx-auto rounded-2xl shadow-[0_8px_30px_rgba(31,58,90,0.15)]"
            />
            <h1 className="mt-8 bg-linear-to-br from-[#1f3a5a] to-[#4d7fae] bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-7xl dark:from-white dark:to-white/60">
              OinariTech
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg tracking-wide text-black/60 dark:text-white/60">
              コンコンと、
              <span className="font-medium text-[#ea7832]">閃く</span>。
            </p>
          </div>
        </section>

        <section id="services" className="mx-auto max-w-5xl px-6 pb-24">
          <h2 className="text-2xl font-semibold tracking-tight">事業内容</h2>
          <div className="mt-8 rounded-lg border border-black/10 p-8 dark:border-white/10">
            <h3 className="font-semibold">自社ソフトウェア開発</h3>
            <p className="mt-2 text-sm text-black/70 dark:text-white/70">
              自社サービスとしてのソフトウェア・アプリケーションを開発しています。
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
