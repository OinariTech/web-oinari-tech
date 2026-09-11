"use client";

import { updateProductAction } from "@/app/admin/actions";
import { FavoriteBar } from "@/app/admin/favorite-bar";
import {
  FIELD_CLASS,
  LABEL_CLASS,
  SaveButton,
  useFormValues,
  useSaveForm,
} from "@/app/admin/save-form";
import type { Favorites } from "@/lib/favorites";
import type { Product } from "@/lib/products";

export function ProductForm({
  product,
  favorites,
}: {
  product: Product;
  favorites: Favorites;
}) {
  const { formAction, pending, dirty, saved, markDirty } =
    useSaveForm(updateProductAction);
  const { values, formKey, loadFavorite } = useFormValues(product);

  return (
    <form
      key={formKey}
      action={formAction}
      onChange={markDirty}
      className="rounded-lg border border-black/10 p-6 dark:border-white/10"
    >
      <input type="hidden" name="id" value={product.id} />

      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{product.id}</h3>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="visible"
            defaultChecked={values.visible}
          />
          サイトに表示する
        </label>
      </div>

      <label className={LABEL_CLASS}>
        タイトル
        <input
          type="text"
          name="title"
          defaultValue={values.title}
          className={FIELD_CLASS}
        />
      </label>

      <label className={LABEL_CLASS}>
        バッジ文言
        <input
          type="text"
          name="badge"
          defaultValue={values.badge}
          className={FIELD_CLASS}
        />
      </label>

      <label className={LABEL_CLASS}>
        カード説明文(/products一覧)
        <textarea
          name="cardDescription"
          defaultValue={values.cardDescription}
          rows={2}
          className={FIELD_CLASS}
        />
      </label>

      <label className={LABEL_CLASS}>
        紹介文(プロダクトページ冒頭)
        <textarea
          name="pageIntro"
          defaultValue={values.pageIntro}
          rows={4}
          className={FIELD_CLASS}
        />
      </label>

      <FavoriteBar
        scope={`product:${product.id}`}
        favorites={favorites}
        onLoad={(data) => {
          loadFavorite(data);
          markDirty();
        }}
      />

      <SaveButton dirty={dirty} pending={pending} saved={saved} />
    </form>
  );
}
