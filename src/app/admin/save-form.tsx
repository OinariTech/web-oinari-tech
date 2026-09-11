"use client";

import { useActionState, useState } from "react";
import type { SaveState } from "@/app/admin/actions";

const IDLE_BUTTON =
  "rounded-md border border-black/20 bg-white px-4 py-2 text-sm font-medium text-black hover:bg-black/5 disabled:opacity-50";
const DIRTY_BUTTON =
  "rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/80 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-white/80";

export const FIELD_CLASS =
  "mt-1 block w-full rounded-md border border-black/15 bg-transparent px-3 py-2 text-sm dark:border-white/15";
export const LABEL_CLASS = "mt-4 block text-sm font-medium";

type SaveAction = (
  prevState: SaveState,
  formData: FormData,
) => Promise<SaveState>;

/**
 * Tracks whether the form has unsaved edits so the save button can show it,
 * and clears that back to "saved" once the action returns.
 */
export function useSaveForm(action: SaveAction) {
  const [state, formAction, pending] = useActionState(action, null);
  const [dirty, setDirty] = useState(false);

  // Reset during render (rather than in an effect) when `state` changes --
  // the React-recommended way to adjust state in response to a value change.
  const [handledState, setHandledState] = useState(state);
  if (state !== handledState) {
    setHandledState(state);
    if (state) {
      setDirty(false);
    }
  }

  return {
    formAction,
    pending,
    dirty,
    saved: Boolean(state),
    markDirty: () => setDirty(true),
  };
}

export function SaveButton({
  dirty,
  pending,
  saved,
}: {
  dirty: boolean;
  pending: boolean;
  saved: boolean;
}) {
  return (
    <div className="mt-4 flex items-center gap-3">
      <button
        type="submit"
        disabled={pending}
        className={dirty ? DIRTY_BUTTON : IDLE_BUTTON}
      >
        {pending ? "保存中…" : "保存"}
      </button>
      {!dirty && !pending && saved && (
        <span className="text-sm text-black/50 dark:text-white/50">
          保存しました
        </span>
      )}
    </div>
  );
}
