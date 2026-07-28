"use client";

import { Trash2 } from "lucide-react";
import { deleteReviewAction } from "./actions";

export function DeleteReviewButton({ id, name }: { id: number; name: string }) {
  return (
    <form
      action={deleteReviewAction}
      onSubmit={(e) => {
        if (!confirm(`Delete the review from "${name}"? This cannot be undone.`)) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        aria-label="Delete"
        className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-ink-2 transition-colors hover:border-red-500/50 hover:text-red-400"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </form>
  );
}
