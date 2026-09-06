import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "管理者ログイン",
  robots: { index: false, follow: false },
};

const ERROR_MESSAGES: Record<string, string> = {
  invalid_state: "ログインの有効期限が切れました。もう一度お試しください。",
  auth_failed: "Googleでの認証に失敗しました。もう一度お試しください。",
  unauthorized: "このGoogleアカウントには管理者権限がありません。",
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const errorMessage = error ? ERROR_MESSAGES[error] : undefined;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <h1 className="text-2xl font-bold tracking-tight">管理者ログイン</h1>

      {errorMessage && (
        <p className="mt-4 rounded-md bg-red-500/10 px-4 py-2 text-sm text-red-600 dark:text-red-400">
          {errorMessage}
        </p>
      )}

      <a
        href="/api/auth/google"
        className="mt-8 rounded-md bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80"
      >
        Googleでログイン
      </a>
    </div>
  );
}
