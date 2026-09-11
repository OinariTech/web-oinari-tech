"use client";

import { saveFavoriteAction } from "@/app/admin/actions";
import type { FavoriteData, Favorites } from "@/lib/favorites";

/**
 * Three favorite slots for the form this sits inside. "保存" posts the form's
 * current values to saveFavoriteAction via the button's formAction, so it
 * captures what's typed in without publishing it. "呼び出し" only fills the
 * form back in -- publishing still needs the form's own save button.
 */
export function FavoriteBar({
  scope,
  favorites,
  onLoad,
}: {
  scope: string;
  favorites: Favorites;
  onLoad: (data: FavoriteData) => void;
}) {
  return (
    <div className="mt-6 rounded-md border border-dashed border-black/15 p-4 dark:border-white/15">
      <p className="text-xs font-medium text-black/60 dark:text-white/60">
        お気に入り(最大3件)
      </p>
      <p className="mt-1 text-xs text-black/50 dark:text-white/50">
        「保存」は今フォームに入っている内容を控えるだけ、「呼び出し」はフォームに戻すだけです。公開するには最後に下の「保存」を押してください。
      </p>

      <div className="mt-3 space-y-2">
        {favorites.map((favorite, index) => (
          <div key={index} className="flex flex-wrap items-center gap-2">
            <span className="w-4 text-xs text-black/50 dark:text-white/50">
              {index + 1}
            </span>
            <input
              type="text"
              name={`slotLabel${index}`}
              defaultValue={favorite?.label ?? ""}
              placeholder="名前(任意)"
              className="min-w-0 flex-1 rounded-md border border-black/15 bg-transparent px-2 py-1 text-sm dark:border-white/15"
            />
            <span className="text-xs whitespace-nowrap text-black/40 dark:text-white/40">
              {favorite ? "保存済み" : "空き"}
            </span>
            {/* The slot travels as a bound argument, not a name/value pair:
                React overwrites the `name` of a formAction button with its
                own action id. */}
            <button
              type="submit"
              formAction={saveFavoriteAction.bind(null, scope, index)}
              className="rounded-md border border-black/20 px-3 py-1 text-xs font-medium hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
            >
              保存
            </button>
            <button
              type="button"
              disabled={!favorite}
              onClick={() => favorite && onLoad(favorite.data)}
              className="rounded-md border border-black/20 px-3 py-1 text-xs font-medium hover:bg-black/5 disabled:opacity-40 disabled:hover:bg-transparent dark:border-white/20 dark:hover:bg-white/10"
            >
              呼び出し
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
