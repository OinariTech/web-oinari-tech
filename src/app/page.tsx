const services = [
  {
    title: "ソフトウェア開発",
    description:
      "Web / モバイルアプリケーションの設計・開発・運用を一気通貫でご支援します。",
  },
  {
    title: "クラウドインフラ構築",
    description:
      "Google Cloud を中心に、スケーラブルで運用しやすいインフラを構築します。",
  },
  {
    title: "技術コンサルティング",
    description:
      "技術選定やアーキテクチャ設計など、開発プロジェクトの立ち上げをサポートします。",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b border-black/10 dark:border-white/10">
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
        <section className="mx-auto max-w-5xl px-6 py-24 text-center sm:py-32">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            OinariTech
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-black/70 dark:text-white/70">
            テクノロジーで、ビジネスの成長を加速する。
          </p>
        </section>

        <section id="services" className="mx-auto max-w-5xl px-6 pb-24">
          <h2 className="text-2xl font-semibold tracking-tight">事業内容</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="rounded-lg border border-black/10 p-6 dark:border-white/10"
              >
                <h3 className="font-semibold">{service.title}</h3>
                <p className="mt-2 text-sm text-black/70 dark:text-white/70">
                  {service.description}
                </p>
              </div>
            ))}
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
        </section>
      </main>

      <footer className="border-t border-black/10 px-6 py-8 text-center text-sm text-black/50 dark:border-white/10 dark:text-white/50">
        © {new Date().getFullYear()} OinariTech
      </footer>
    </div>
  );
}
