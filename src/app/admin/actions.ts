"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminUrl } from "@/lib/admin-path";
import { deleteSessionCookie, verifyAdminSession } from "@/lib/admin-session";
import { updateProduct } from "@/lib/products";

export type UpdateProductState = { savedAt: number } | null;

export async function updateProductAction(
  _prevState: UpdateProductState,
  formData: FormData,
): Promise<UpdateProductState> {
  const session = await verifyAdminSession();
  if (!session) {
    redirect(adminUrl("/login"));
  }

  const id = String(formData.get("id") ?? "");
  if (!id) {
    throw new Error("Missing product id");
  }

  await updateProduct(id, {
    title: String(formData.get("title") ?? ""),
    cardDescription: String(formData.get("cardDescription") ?? ""),
    pageIntro: String(formData.get("pageIntro") ?? ""),
    badge: String(formData.get("badge") ?? ""),
    visible: formData.get("visible") === "on",
  });

  revalidatePath("/admin");
  revalidatePath("/products");
  revalidatePath(`/products/${id}`);

  return { savedAt: Date.now() };
}

export async function logoutAction() {
  await deleteSessionCookie();
  redirect(adminUrl("/login"));
}
