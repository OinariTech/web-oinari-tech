import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Puzzlio プライバシーポリシー",
  description: "OinariTech が提供するアプリ「Puzzlio」のプライバシーポリシー。",
};

export default function PuzzlioPrivacyPage() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />

      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-6 py-16">
          <h1 className="text-3xl font-bold tracking-tight">
            Puzzlio プライバシーポリシー
          </h1>

          <div className="mt-8 space-y-8 text-sm text-black/70 dark:text-white/70">
            <p>
              OinariTech（以下「当方」といいます）は、当方が提供するアプリケーション「Puzzlio」（以下「本アプリ」といいます、Android
              /
              iOS向け、パッケージ名:
              com.oinaritech.puzzlio)における利用者情報の取り扱いについて、以下のとおりプライバシーポリシーを定めます。
            </p>

            <div>
              <h2 className="text-base font-semibold text-black dark:text-white">
                取得する情報
              </h2>
              <p className="mt-2">
                本アプリは、氏名・メールアドレス等の個人を識別できる情報を取得しません。アカウント登録やログインの機能もありません。
              </p>
              <p className="mt-2">
                本アプリに収録された各パズルゲームのベストスコア・ベストタイムは、端末内のローカルストレージにのみ保存され、当方や第三者のサーバーに送信されることはありません。アプリを削除すると、これらの記録も端末から失われます。
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-black dark:text-white">
                通信について
              </h2>
              <p className="mt-2">
                本アプリは、画面表示に使用するフォントを
                Google Fonts（Google
                LLC提供）から取得するために、実行時にネットワーク通信を行うことがあります。この通信に伴い、Googleのサーバーへ端末のIPアドレス等が送信される場合があります。取り扱いの詳細は、以下のGoogleのプライバシーポリシーをご参照ください。
              </p>
              <p className="mt-2">
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Google プライバシーポリシー
                </a>
              </p>
              <p className="mt-2">
                本アプリには、広告表示SDK、第三者によるアクセス解析・トラッキングSDK、アプリ内課金機能は組み込まれていません。
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-black dark:text-white">
                第三者への提供
              </h2>
              <p className="mt-2">
                法令に基づく場合を除き、取得した情報を第三者に提供することはありません。
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-black dark:text-white">
                お問い合わせ
              </h2>
              <p className="mt-2">
                本ポリシーに関するお問い合わせは、
                <a
                  href="mailto:oinaritech@gmail.com"
                  className="hover:underline"
                >
                  oinaritech@gmail.com
                </a>
                までご連絡ください。
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-black dark:text-white">
                改定
              </h2>
              <p className="mt-2">
                本ポリシーの内容は、事前の通知なく変更することがあります。変更後のポリシーは、本ページに掲載した時点から効力を生じるものとします。
              </p>
            </div>

            <p className="text-black/50 dark:text-white/50">
              制定日: 2026年9月3日
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
