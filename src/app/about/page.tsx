import type { Metadata } from "next";
import { RichText } from "@/components/rich-text";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getProfile, parseTechStack } from "@/lib/profile";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "プロフィール",
  description:
    "OinariTech の運営者情報と、個人開発における開発スタイル・技術構成について。",
};

export default async function AboutPage() {
  const profile = await getProfile();
  const techStack = parseTechStack(profile.techStack);

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />

      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-6 py-16">
          <h1 className="text-3xl font-bold tracking-tight">プロフィール</h1>

          <RichText
            text={profile.intro}
            className="mt-6 space-y-4 text-black/70 dark:text-white/70"
            linkClassName="font-medium text-black hover:underline dark:text-white"
          />

          <div className="mt-12 space-y-12">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">基本情報</h2>
              <div className="mt-4 rounded-lg border border-black/10 p-8 dark:border-white/10">
                <dl className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-[8rem_1fr]">
                  <dt className="text-black/50 dark:text-white/50">屋号</dt>
                  <dd>{profile.businessName}</dd>
                  <dt className="text-black/50 dark:text-white/50">活動内容</dt>
                  <dd>{profile.activity}</dd>
                  <dt className="text-black/50 dark:text-white/50">拠点</dt>
                  <dd>{profile.location}</dd>
                  <dt className="text-black/50 dark:text-white/50">連絡先</dt>
                  <dd>
                    <a
                      href={`mailto:${profile.contactEmail}`}
                      className="hover:underline"
                    >
                      {profile.contactEmail}
                    </a>
                  </dd>
                </dl>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold tracking-tight">
                開発スタイル
              </h2>
              <RichText
                text={profile.devStyle}
                className="mt-4 space-y-4 text-sm text-black/70 dark:text-white/70"
                linkClassName="font-medium text-black hover:underline dark:text-white"
              />
            </div>

            {techStack.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold tracking-tight">
                  このサイトの技術構成
                </h2>
                <div className="mt-4 rounded-lg border border-black/10 p-8 dark:border-white/10">
                  <dl className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-[8rem_1fr]">
                    {techStack.map((item) => (
                      <div key={item.label} className="contents">
                        <dt className="text-black/50 dark:text-white/50">
                          {item.label}
                        </dt>
                        <dd>{item.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                {profile.techStackNote && (
                  <p className="mt-4 text-sm text-black/50 dark:text-white/50">
                    {profile.techStackNote}
                  </p>
                )}
              </div>
            )}

            <div>
              <h2 className="text-xl font-semibold tracking-tight">
                お問い合わせ
              </h2>
              <p className="mt-4 text-sm text-black/70 dark:text-white/70">
                {profile.contactText}
              </p>
              <p className="mt-4">
                <a
                  href={`mailto:${profile.contactEmail}`}
                  className="text-sm font-medium hover:underline"
                >
                  {profile.contactEmail}
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
