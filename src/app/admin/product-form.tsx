"use client";

import { useActionState, useState } from "react";
import { updateProductAction } from "@/app/admin/actions";
import type { Product } from "@/lib/products";

const IDLE_BUTTON =
  "rounded-md border border-black/20 bg-white px-4 py-2 text-sm font-medium text-black hover:bg-black/5 disabled:opacity-50";
const DIRTY_BUTTON =
  "rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/80 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-white/80";

export function ProductForm({ product }: { product: Product }) {
  const [state, formAction, pending] = useActionState(updateProductAction, null);
  const [dirty, setDirty] = useState(false);

  // A successful save means the form now matches what's stored, so the
  // button goes back to its idle (white) state. Reset during render (rather
  // than in an effect) when `state` changes -- the React-recommended way to
  // adjust state in response to a value changing.
  const [handledState, setHandledState] = useState(state);
  if (state !== handledState) {
    setHandledState(state);
    if (state) {
      setDirty(false);
    }
  }

  return (
    <form
      action={formAction}
      onChange={() => setDirty(true)}
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

      <div className="mt-4 flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className={dirty ? DIRTY_BUTTON : IDLE_BUTTON}
        >
          {pending ? "保存中…" : "保存"}
        </button>
        {!dirty && !pending && state && (
          <span className="text-sm text-black/50 dark:text-white/50">
            保存しました
          </span>
        )}
      </div>
    </form>
  );
}
