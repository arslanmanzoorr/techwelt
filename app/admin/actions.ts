"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ADMIN_COOKIE, checkPassword, isAuthed, sessionToken } from "@/lib/auth";
import { createPost, deletePost, updatePost, type NewsInput } from "@/lib/db";

export async function loginAction(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (!checkPassword(password)) {
    redirect("/admin/login?error=1");
  }
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, sessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  redirect("/admin");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
  redirect("/admin/login");
}

function parsePost(formData: FormData): NewsInput {
  const coverImage = String(formData.get("coverImage") ?? "").trim();
  return {
    title: String(formData.get("title") ?? "").trim(),
    excerpt: String(formData.get("excerpt") ?? "").trim(),
    body: String(formData.get("body") ?? "").trim(),
    coverImage: coverImage || null,
    published: formData.get("published") === "on",
  };
}

export async function savePostAction(formData: FormData) {
  if (!(await isAuthed())) redirect("/admin/login");
  const input = parsePost(formData);
  if (!input.title) redirect("/admin/editor?error=title");

  const idRaw = formData.get("id");
  if (idRaw) {
    await updatePost(Number(idRaw), input);
  } else {
    await createPost(input);
  }
  revalidatePath("/news");
  revalidatePath("/", "layout");
  redirect("/admin");
}

export async function deletePostAction(formData: FormData) {
  if (!(await isAuthed())) redirect("/admin/login");
  const id = Number(formData.get("id"));
  if (id) {
    await deletePost(id);
    revalidatePath("/news");
    revalidatePath("/", "layout");
  }
  redirect("/admin");
}
