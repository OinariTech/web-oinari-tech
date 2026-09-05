import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Puzzlio クローズドテスト参加者募集",
  description:
    "OinariTech が開発中のパズルゲームアプリ「Puzzlio」の、Google Play クローズドテスト参加者を募集しています。",
};

export default function PuzzlioClosedTestPage() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />

      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-6 py-16">
          <h1 className="text-3xl font-bold tracking-tight">
            Puzzlio クローズドテスト参加者募集
          </h1>

          <p className="mt-6 text-black/70 dark:text-white/70">
            OinariTech が開発しているパズルゲームアプリ「Puzzlio」の Google
            Play
            正式リリースに先立ち、クローズドテストにご協力いただける方を募集しています。
          </p>

          <div className="mt-10 space-y-8 text-sm text-black/70 dark:text-white/70">
            <div>
              <h2 className="text-base font-semibold text-black dark:text-white">
                Puzzlio について
              </h2>
              <p className="mt-2">
                定番のパズルゲームを1つにまとめた、Android / iOS
                向けのパズルゲームアプリです。「2048」「スライドパズル（15パズル）」「数独（ナンプレ）」「陣取りパズル」の4種類を収録しています。
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-black dark:text-white">
                クローズドテストとは
              </h2>
              <p className="mt-2">
                Google Play
                が提供する、正式公開前のアプリを限定されたテスターにのみ配信できる仕組みです。実際にアプリを操作していただき、不具合や使い勝手についてのご意見をリリース前の改善に役立てます。
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-black dark:text-white">
                参加方法
              </h2>
              <p className="mt-2">
                参加者募集フォームを準備中です。公開までしばらくお待ちください。
              </p>
              <div className="mt-4 rounded-lg border border-dashed border-black/20 p-8 text-center dark:border-white/20">
                <p className="text-sm text-black/50 dark:text-white/50">
                  募集フォームは準備中です。もうしばらくお待ちください。
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-base font-semibold text-black dark:text-white">
                参加にあたって
              </h2>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>Android 端末と Google アカウントをご用意ください。</li>
                <li>
                  募集フォームからお申し込みいただいた方に、テスト参加用のリンクをご案内します。
                </li>
                <li>
                  実際にアプリをインストールしてお試しいただき、可能な範囲でフィードバックにご協力ください。
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-base font-semibold text-black dark:text-white">
                お問い合わせ
              </h2>
              <p className="mt-2">
                本件に関するお問い合わせは、
                <a
                  href="mailto:oinaritech@gmail.com"
                  className="hover:underline"
                >
                  oinaritech@gmail.com
                </a>
                までご連絡ください。
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
