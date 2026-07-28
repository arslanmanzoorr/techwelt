"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { isAuthed } from "@/lib/auth";
import { createReview, updateReview, deleteReview, type ReviewInput } from "@/lib/db";

function parseReview(formData: FormData): ReviewInput {
  const image = String(formData.get("image") ?? "").trim();
  return {
    name: String(formData.get("name") ?? "").trim(),
    position: String(formData.get("position") ?? "").trim(),
    company: String(formData.get("company") ?? "").trim(),
    image: image || null,
    quote: String(formData.get("quote") ?? "").trim(),
    published: formData.get("published") === "on",
  };
}

export async function saveReviewAction(formData: FormData) {
  if (!(await isAuthed())) redirect("/admin/login");
  const input = parseReview(formData);
  if (!input.name || !input.quote) redirect("/admin/reviews/editor?error=1");

  const idRaw = formData.get("id");
  if (idRaw) {
    await updateReview(Number(idRaw), input);
  } else {
    await createReview(input);
  }
  revalidatePath("/", "layout");
  redirect("/admin/reviews");
}

export async function deleteReviewAction(formData: FormData) {
  if (!(await isAuthed())) redirect("/admin/login");
  const id = Number(formData.get("id"));
  if (id) {
    await deleteReview(id);
    revalidatePath("/", "layout");
  }
  redirect("/admin/reviews");
}
