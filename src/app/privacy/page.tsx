import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: "OinariTech のプライバシーポリシー。",
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />

      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-6 py-16">
          <h1 className="text-3xl font-bold tracking-tight">
            プライバシーポリシー
          </h1>

          <div className="mt-8 space-y-8 text-sm text-black/70 dark:text-white/70">
            <p>
              OinariTech（以下「当方」といいます）は、本ウェブサイト（以下「本サイト」といいます）における個人情報の取り扱いについて、以下のとおりプライバシーポリシーを定めます。
            </p>

            <div>
              <h2 className="text-base font-semibold text-black dark:text-white">
                取得する情報
              </h2>
              <p className="mt-2">
                本サイトの「お問い合わせ」からご連絡いただいた場合、メールでのやり取りに伴い、メールアドレスその他お送りいただいた内容を取得します。
              </p>
              <p className="mt-2">
                また、本サイトはアクセス解析のために Google
                Analytics（Google LLC 提供）を利用しています。Google
                Analytics は Cookie
                を使用してアクセス状況（閲覧ページ、滞在時間、利用端末など）を収集しますが、これらの情報から個人を特定することはありません。収集された情報は
                Google
                のプライバシーポリシーに基づき管理されます。詳細および測定の無効化（オプトアウト）については、以下をご参照ください。
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
                <br />
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Google アナリティクス オプトアウト アドオン
                </a>
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-black dark:text-white">
                利用目的
              </h2>
              <p className="mt-2">
                取得した情報は、お問い合わせへの回答その他必要な連絡、および本サイトの利用状況の把握・改善のためにのみ利用し、目的の範囲を超えて利用することはありません。
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-black dark:text-white">
                第三者への提供
              </h2>
              <p className="mt-2">
                法令に基づく場合を除き、ご本人の同意なく取得した情報を第三者に提供することはありません。なお、Google
                Analytics
                により収集される情報の取り扱いについては、Google
                のプライバシーポリシーが適用されます。
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
                本ポリシーの内容は、事前の通知なく変更することがあります。変更後のポリシーは、本サイトに掲載した時点から効力を生じるものとします。
              </p>
            </div>

            <p className="text-black/50 dark:text-white/50">
              制定日: 2026年8月26日
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
