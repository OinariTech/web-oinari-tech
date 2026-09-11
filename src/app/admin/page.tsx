import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { logoutAction } from "@/app/admin/actions";
import { ProductForm } from "@/app/admin/product-form";
import { ProfileForm } from "@/app/admin/profile-form";
import { adminUrl } from "@/lib/admin-path";
import { verifyAdminSession } from "@/lib/admin-session";
import { getAllProductsForAdmin } from "@/lib/products";
import { getProfile } from "@/lib/profile";

export const metadata: Metadata = {
  title: "管理者ページ",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const session = await verifyAdminSession();
  if (!session) {
    redirect(adminUrl("/login"));
  }

  const [products, profile] = await Promise.all([
    getAllProductsForAdmin(),
    getProfile(),
  ]);

  return (
    <div className="px-6 py-16">
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
          <ProductForm key={product.id} product={product} />
        ))}
      </div>

      <h2 className="mt-12 text-lg font-semibold">プロフィール</h2>
      <div className="mt-4">
        <ProfileForm profile={profile} />
      </div>
    </div>
  );
}
