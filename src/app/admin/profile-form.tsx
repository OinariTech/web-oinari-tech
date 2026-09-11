"use client";

import { updateProfileAction } from "@/app/admin/actions";
import { FavoriteBar } from "@/app/admin/favorite-bar";
import {
  FIELD_CLASS,
  LABEL_CLASS,
  SaveButton,
  useFormValues,
  useSaveForm,
} from "@/app/admin/save-form";
import type { Favorites } from "@/lib/favorites";
import type { Profile } from "@/lib/profile";

const HINT_CLASS = "mt-1 block text-xs font-normal text-black/50 dark:text-white/50";

export function ProfileForm({
  profile,
  favorites,
}: {
  profile: Profile;
  favorites: Favorites;
}) {
  const { formAction, pending, dirty, saved, markDirty } =
    useSaveForm(updateProfileAction);
  const { values, formKey, loadFavorite } = useFormValues(profile);

  return (
    <form
      key={formKey}
      action={formAction}
      onChange={markDirty}
      className="rounded-lg border border-black/10 p-6 dark:border-white/10"
    >
      <label className="block text-sm font-medium">
        紹介文(ページ冒頭)
        <span className={HINT_CLASS}>
          空行で段落が分かれます。[表示文字](https://…) でリンクになります。
        </span>
        <textarea
          name="intro"
          defaultValue={values.intro}
          rows={4}
          className={FIELD_CLASS}
        />
      </label>

      <h4 className="mt-6 text-sm font-semibold">基本情報</h4>

      <label className={LABEL_CLASS}>
        屋号
        <input
          type="text"
          name="businessName"
          defaultValue={values.businessName}
          className={FIELD_CLASS}
        />
      </label>

      <label className={LABEL_CLASS}>
        活動内容
        <input
          type="text"
          name="activity"
          defaultValue={values.activity}
          className={FIELD_CLASS}
        />
      </label>

      <label className={LABEL_CLASS}>
        拠点
        <input
          type="text"
          name="location"
          defaultValue={values.location}
          className={FIELD_CLASS}
        />
      </label>

      <label className={LABEL_CLASS}>
        連絡先メールアドレス
        <span className={HINT_CLASS}>
          基本情報とお問い合わせの両方に反映されます。
        </span>
        <input
          type="email"
          name="contactEmail"
          defaultValue={values.contactEmail}
          className={FIELD_CLASS}
        />
      </label>

      <label className={LABEL_CLASS}>
        開発スタイル
        <span className={HINT_CLASS}>
          空行で段落が分かれます。[表示文字](https://…) でリンクになります。
        </span>
        <textarea
          name="devStyle"
          defaultValue={values.devStyle}
          rows={8}
          className={FIELD_CLASS}
        />
      </label>

      <label className={LABEL_CLASS}>
        技術構成
        <span className={HINT_CLASS}>
          1行に1項目、「ラベル: 内容」の形式。行の追加・削除・並べ替えがそのまま反映されます。
        </span>
        <textarea
          name="techStack"
          defaultValue={values.techStack}
          rows={6}
          className={FIELD_CLASS}
        />
      </label>

      <label className={LABEL_CLASS}>
        技術構成の補足
        <textarea
          name="techStackNote"
          defaultValue={values.techStackNote}
          rows={2}
          className={FIELD_CLASS}
        />
      </label>

      <label className={LABEL_CLASS}>
        お問い合わせ文
        <textarea
          name="contactText"
          defaultValue={values.contactText}
          rows={2}
          className={FIELD_CLASS}
        />
      </label>

      <FavoriteBar
        scope="profile"
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
