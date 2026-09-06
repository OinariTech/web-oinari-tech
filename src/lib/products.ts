import "server-only";
import { getFirestore } from "@/lib/firestore";

export type Product = {
  id: string;
  title: string;
  cardDescription: string;
  pageIntro: string;
  badge: string;
  visible: boolean;
};

const COLLECTION = "products";

// Content as originally shipped in code. Firestore holds edits on top of
// this; if a product's document doesn't exist yet (e.g. Firestore isn't
// provisioned yet, or nobody has edited it from /admin), these are what the
// site shows -- the site must never break because Firestore is unreachable.
const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "puzzlio",
    title: "Puzzlio",
    cardDescription:
      "定番のパズルゲームを1つにまとめた、Android / iOS 向けのパズルゲームアプリ。",
    pageIntro:
      "定番のパズルゲームを1つにまとめて遊べる、パズルゲームアグリゲーターアプリです。以下の4種類を収録しています。各ゲームのベストスコア・ベストタイムは端末内に保存され、いつでも自分の記録に挑戦できます。",
    badge: "クローズドテスト募集中",
    visible: true,
  },
];

function withDefaults(id: string, data: Partial<Product> | undefined) {
  const fallback = DEFAULT_PRODUCTS.find((p) => p.id === id);
  return { ...fallback, ...data, id } as Product;
}

export async function getVisibleProducts(): Promise<Product[]> {
  try {
    const snapshot = await getFirestore().collection(COLLECTION).get();
    const overrides = new Map(
      snapshot.docs.map((doc) => [doc.id, doc.data() as Partial<Product>]),
    );

    return DEFAULT_PRODUCTS.map((product) =>
      withDefaults(product.id, overrides.get(product.id)),
    ).filter((product) => product.visible);
  } catch (error) {
    console.error("Failed to load products from Firestore, using defaults", error);
    return DEFAULT_PRODUCTS.filter((product) => product.visible);
  }
}

export async function getProduct(id: string): Promise<Product | null> {
  const fallback = DEFAULT_PRODUCTS.find((p) => p.id === id);
  if (!fallback) return null;

  try {
    const doc = await getFirestore().collection(COLLECTION).doc(id).get();
    return withDefaults(id, doc.data());
  } catch (error) {
    console.error(`Failed to load product "${id}" from Firestore, using defaults`, error);
    return fallback;
  }
}

/** All products, including hidden ones -- for the admin list. */
export async function getAllProductsForAdmin(): Promise<Product[]> {
  try {
    const snapshot = await getFirestore().collection(COLLECTION).get();
    const overrides = new Map(
      snapshot.docs.map((doc) => [doc.id, doc.data() as Partial<Product>]),
    );
    return DEFAULT_PRODUCTS.map((product) =>
      withDefaults(product.id, overrides.get(product.id)),
    );
  } catch (error) {
    console.error("Failed to load products from Firestore, using defaults", error);
    return DEFAULT_PRODUCTS;
  }
}

export async function updateProduct(
  id: string,
  data: Pick<Product, "title" | "cardDescription" | "pageIntro" | "badge" | "visible">,
) {
  if (!DEFAULT_PRODUCTS.some((p) => p.id === id)) {
    throw new Error(`Unknown product id: ${id}`);
  }
  await getFirestore().collection(COLLECTION).doc(id).set(data, { merge: true });
}
