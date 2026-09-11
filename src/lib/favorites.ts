import "server-only";
import { getFirestore } from "@/lib/firestore";

export const SLOT_COUNT = 3;

export type FavoriteData = Record<string, string | boolean>;

export type FavoriteSlot = {
  label: string;
  data: FavoriteData;
};

/** Always SLOT_COUNT long; `null` is an empty slot. */
export type Favorites = (FavoriteSlot | null)[];

/** Which form the favorites belong to: the profile, or one product. */
export type FavoriteScope = { kind: "profile" } | { kind: "product"; id: string };

const COLLECTION = "favorites";

// Only these fields are captured, per scope -- the form also posts control
// fields (slot, labels, Next's action ids) that must never be stored or
// replayed back into the form.
const PROFILE_FIELDS = [
  "intro",
  "businessName",
  "activity",
  "location",
  "contactEmail",
  "devStyle",
  "techStack",
  "techStackNote",
  "contactText",
] as const;

const PRODUCT_FIELDS = ["title", "badge", "cardDescription", "pageIntro"] as const;
const PRODUCT_CHECKBOXES = ["visible"] as const;

export function parseScope(raw: string): FavoriteScope | null {
  if (raw === "profile") return { kind: "profile" };
  const match = raw.match(/^product:([A-Za-z0-9_-]+)$/);
  return match ? { kind: "product", id: match[1] } : null;
}

export function serializeScope(scope: FavoriteScope) {
  return scope.kind === "profile" ? "profile" : `product:${scope.id}`;
}

function docId(scope: FavoriteScope) {
  return scope.kind === "profile" ? "profile" : `product__${scope.id}`;
}

/** Picks just this scope's content fields out of a submitted form. */
export function pickFavoriteData(
  scope: FavoriteScope,
  formData: FormData,
): FavoriteData {
  const data: FavoriteData = {};

  const textFields =
    scope.kind === "profile" ? PROFILE_FIELDS : PRODUCT_FIELDS;
  for (const name of textFields) {
    data[name] = String(formData.get(name) ?? "");
  }

  if (scope.kind === "product") {
    for (const name of PRODUCT_CHECKBOXES) {
      data[name] = formData.get(name) === "on";
    }
  }

  return data;
}

export async function getFavorites(scope: FavoriteScope): Promise<Favorites> {
  const empty: Favorites = Array.from({ length: SLOT_COUNT }, () => null);

  try {
    const doc = await getFirestore().collection(COLLECTION).doc(docId(scope)).get();
    const slots = (doc.data()?.slots ?? {}) as Record<string, FavoriteSlot>;
    return empty.map((_, index) => slots[String(index)] ?? null);
  } catch (error) {
    console.error("Failed to load favorites from Firestore", error);
    return empty;
  }
}

export async function saveFavorite(
  scope: FavoriteScope,
  slot: number,
  favorite: FavoriteSlot,
) {
  if (!Number.isInteger(slot) || slot < 0 || slot >= SLOT_COUNT) {
    throw new Error(`Invalid favorite slot: ${slot}`);
  }

  await getFirestore()
    .collection(COLLECTION)
    .doc(docId(scope))
    .set({ slots: { [String(slot)]: favorite } }, { merge: true });
}
