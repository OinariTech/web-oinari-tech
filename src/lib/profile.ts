import "server-only";
import { getFirestore } from "@/lib/firestore";

export type Profile = {
  intro: string;
  businessName: string;
  activity: string;
  location: string;
  contactEmail: string;
  devStyle: string;
  techStack: string;
  techStackNote: string;
  contactText: string;
};

const COLLECTION = "site";
const DOC_ID = "profile";

// Content as originally shipped in code, used whenever Firestore is
// unreachable or the document doesn't exist yet -- the public site must
// never break because of it. `intro` and `devStyle` are blank-line separated
// paragraphs; `techStack` is one "label: value" per line.
export const DEFAULT_PROFILE: Profile = {
  intro:
    "OinariTech は、個人でソフトウェア・アプリケーションを開発している屋号です。日々の中で「こうなっていたら便利なのに」と感じたことを形にすることを大切にしながら、小さく作って動かし、使いながら育てていくスタイルで制作しています。",
  businessName: "OinariTech",
  activity: "個人でのソフトウェア・アプリケーション開発",
  location: "日本",
  contactEmail: "oinaritech@gmail.com",
  devStyle: [
    "企画から設計・実装、リリース後の運用まで、すべて個人で行っています。規模が小さいぶん意思決定が速く、思いついたことをすぐ試せることを強みだと考えています。",
    "開発には Anthropic の [Claude Code](https://claude.com/claude-code) を活用しています。設計の検討やコードレビュー、CI/CD の構築といった工程を AI と協働して進めることで、個人開発でありながら継続的なリリースと品質の維持を両立させています。このサイト自体も、Claude Code と共に開発・運用しています。",
  ].join("\n\n"),
  techStack: [
    "フロントエンド: Next.js (App Router) / React / TypeScript",
    "スタイリング: Tailwind CSS",
    "インフラ: Google Cloud Run / Docker / Artifact Registry",
    "CI / CD: GitHub Actions",
    "アクセス解析: Google Analytics (GA4)",
  ].join("\n"),
  techStackNote:
    "main ブランチへの反映をトリガーに、GitHub Actions でビルドとデプロイを自動実行しています。",
  contactText:
    "お仕事のご相談、プロダクトについてのご質問などお気軽にご連絡ください。",
};

export async function getProfile(): Promise<Profile> {
  try {
    const doc = await getFirestore().collection(COLLECTION).doc(DOC_ID).get();
    return { ...DEFAULT_PROFILE, ...(doc.data() as Partial<Profile>) };
  } catch (error) {
    console.error("Failed to load profile from Firestore, using defaults", error);
    return DEFAULT_PROFILE;
  }
}

export async function updateProfile(data: Profile) {
  await getFirestore().collection(COLLECTION).doc(DOC_ID).set(data, {
    merge: true,
  });
}

/** Splits "label: value" lines into rows; lines without a separator are skipped. */
export function parseTechStack(techStack: string) {
  return techStack
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const match = line.match(/^(.*?)\s*[:：]\s*(.*)$/);
      return match ? { label: match[1], value: match[2] } : null;
    })
    .filter((row): row is { label: string; value: string } => row !== null);
}
