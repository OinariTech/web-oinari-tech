"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminUrl } from "@/lib/admin-path";
import { deleteSessionCookie, verifyAdminSession } from "@/lib/admin-session";
import {
  parseScope,
  pickFavoriteData,
  saveFavorite,
  SLOT_COUNT,
} from "@/lib/favorites";
import { updateProduct } from "@/lib/products";
import { updateProfile } from "@/lib/profile";

export type SaveState = { savedAt: number } | null;

export async function updateProductAction(
  _prevState: SaveState,
  formData: FormData,
): Promise<SaveState> {
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

export async function updateProfileAction(
  _prevState: SaveState,
  formData: FormData,
): Promise<SaveState> {
  const session = await verifyAdminSession();
  if (!session) {
    redirect(adminUrl("/login"));
  }

  const field = (name: string) => String(formData.get(name) ?? "").trim();

  await updateProfile({
    intro: field("intro"),
    businessName: field("businessName"),
    activity: field("activity"),
    location: field("location"),
    contactEmail: field("contactEmail"),
    devStyle: field("devStyle"),
    techStack: field("techStack"),
    techStackNote: field("techStackNote"),
    contactText: field("contactText"),
  });

  revalidatePath("/admin");
  revalidatePath("/about");

  return { savedAt: Date.now() };
}

/**
 * Stores the form's current values in one favorite slot. Invoked from a
 * button's formAction inside the form, so it receives whatever is typed in
 * right now -- saving a favorite never publishes anything.
 */
export async function saveFavoriteAction(
  scopeRaw: string,
  slot: number,
  formData: FormData,
) {
  const session = await verifyAdminSession();
  if (!session) {
    redirect(adminUrl("/login"));
  }

  const scope = parseScope(scopeRaw);
  if (!scope) {
    throw new Error("Invalid favorite scope");
  }

  if (!Number.isInteger(slot) || slot < 0 || slot >= SLOT_COUNT) {
    throw new Error(`Invalid favorite slot: ${slot}`);
  }

  await saveFavorite(scope, slot, {
    label: String(formData.get(`slotLabel${slot}`) ?? "").trim(),
    data: pickFavoriteData(scope, formData),
  });

  revalidatePath("/admin");
}

export async function logoutAction() {
  await deleteSessionCookie();
  redirect(adminUrl("/login"));
}
