import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { logoutAction, updateProductAction } from "@/app/admin/actions";
import { verifyAdminSession } from "@/lib/admin-session";
import { getAllProductsForAdmin } from "@/lib/products";

export const metadata: Metadata = {
  title: "管理者ページ",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const session = await verifyAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const products = await getAllProductsForAdmin();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">管理者ページ</h1>
        <form action={logoutAction}>
          <button
            type="submit"
            className="text-sm text-black/60 hover:underline dark:text-white/60"
          >
            ログアウト
          </button>
        </form>
      </div>
      <p className="mt-2 text-sm text-black/60 dark:text-white/60">
        {session.email} でログイン中
      </p>

      <h2 className="mt-10 text-lg font-semibold">プロダクト</h2>
      <div className="mt-4 space-y-6">
        {products.map((product) => (
          <form
            key={product.id}
            action={updateProductAction}
            className="rounded-lg border border-black/10 p-6 dark:border-white/10"
          >
            <input type="hidden" name="id" value={product.id} />

            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{product.id}</h3>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="visible"
                  defaultChecked={product.visible}
                />
                サイトに表示する
              </label>
            </div>

            <label className="mt-4 block text-sm font-medium">
              タイトル
              <input
                type="text"
                name="title"
                defaultValue={product.title}
                className="mt-1 block w-full rounded-md border border-black/15 bg-transparent px-3 py-2 text-sm dark:border-white/15"
              />
            </label>

            <label className="mt-4 block text-sm font-medium">
              バッジ文言
              <input
                type="text"
                name="badge"
                defaultValue={product.badge}
                className="mt-1 block w-full rounded-md border border-black/15 bg-transparent px-3 py-2 text-sm dark:border-white/15"
              />
            </label>

            <label className="mt-4 block text-sm font-medium">
              カード説明文(/products一覧)
              <textarea
                name="cardDescription"
                defaultValue={product.cardDescription}
                rows={2}
                className="mt-1 block w-full rounded-md border border-black/15 bg-transparent px-3 py-2 text-sm dark:border-white/15"
              />
            </label>

            <label className="mt-4 block text-sm font-medium">
              紹介文(プロダクトページ冒頭)
              <textarea
                name="pageIntro"
                defaultValue={product.pageIntro}
                rows={4}
                className="mt-1 block w-full rounded-md border border-black/15 bg-transparent px-3 py-2 text-sm dark:border-white/15"
              />
            </label>

            <button
              type="submit"
              className="mt-4 rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80"
            >
              保存
            </button>
          </form>
        ))}
      </div>
    </div>
  );
}
