import { neon } from "@neondatabase/serverless";

export interface NewsPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  cover_image: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export type NewsInput = {
  title: string;
  excerpt: string;
  body: string;
  coverImage: string | null;
  published: boolean;
};

const url = process.env.DATABASE_URL;

/** Whether a database is configured. Pages degrade gracefully when false. */
export const dbConfigured = Boolean(url);

const sql = url ? neon(url) : null;

let ensured = false;
async function ensureTable() {
  if (!sql || ensured) return;
  await sql`
    CREATE TABLE IF NOT EXISTS news_posts (
      id SERIAL PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      excerpt TEXT NOT NULL DEFAULT '',
      body TEXT NOT NULL DEFAULT '',
      cover_image TEXT,
      published BOOLEAN NOT NULL DEFAULT false,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  ensured = true;
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "post";
}

export async function listPublished(limit?: number): Promise<NewsPost[]> {
  if (!sql) return [];
  await ensureTable();
  const rows = limit
    ? await sql`SELECT * FROM news_posts WHERE published = true ORDER BY created_at DESC LIMIT ${limit}`
    : await sql`SELECT * FROM news_posts WHERE published = true ORDER BY created_at DESC`;
  return rows as NewsPost[];
}

export async function listAll(): Promise<NewsPost[]> {
  if (!sql) return [];
  await ensureTable();
  const rows = await sql`SELECT * FROM news_posts ORDER BY created_at DESC`;
  return rows as NewsPost[];
}

export async function getBySlug(slug: string): Promise<NewsPost | null> {
  if (!sql) return null;
  await ensureTable();
  const rows = await sql`SELECT * FROM news_posts WHERE slug = ${slug} LIMIT 1`;
  return (rows[0] as NewsPost) ?? null;
}

export async function getById(id: number): Promise<NewsPost | null> {
  if (!sql) return null;
  await ensureTable();
  const rows = await sql`SELECT * FROM news_posts WHERE id = ${id} LIMIT 1`;
  return (rows[0] as NewsPost) ?? null;
}

async function uniqueSlug(base: string, excludeId?: number): Promise<string> {
  if (!sql) return base;
  let slug = base;
  let n = 1;
  for (;;) {
    const rows = excludeId
      ? await sql`SELECT id FROM news_posts WHERE slug = ${slug} AND id <> ${excludeId} LIMIT 1`
      : await sql`SELECT id FROM news_posts WHERE slug = ${slug} LIMIT 1`;
    if (rows.length === 0) return slug;
    slug = `${base}-${n++}`;
  }
}

export async function createPost(input: NewsInput): Promise<NewsPost> {
  if (!sql) throw new Error("Database not configured");
  await ensureTable();
  const slug = await uniqueSlug(slugify(input.title));
  const rows = await sql`
    INSERT INTO news_posts (slug, title, excerpt, body, cover_image, published)
    VALUES (${slug}, ${input.title}, ${input.excerpt}, ${input.body}, ${input.coverImage}, ${input.published})
    RETURNING *
  `;
  return rows[0] as NewsPost;
}

export async function updatePost(id: number, input: NewsInput): Promise<NewsPost> {
  if (!sql) throw new Error("Database not configured");
  await ensureTable();
  const slug = await uniqueSlug(slugify(input.title), id);
  const rows = await sql`
    UPDATE news_posts
    SET slug = ${slug}, title = ${input.title}, excerpt = ${input.excerpt},
        body = ${input.body}, cover_image = ${input.coverImage},
        published = ${input.published}, updated_at = now()
    WHERE id = ${id}
    RETURNING *
  `;
  return rows[0] as NewsPost;
}

export async function deletePost(id: number): Promise<void> {
  if (!sql) throw new Error("Database not configured");
  await ensureTable();
  await sql`DELETE FROM news_posts WHERE id = ${id}`;
}

/* ── Contact submissions ─────────────────────────────────────────────────── */

export interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
  country: string;
  locale: string;
  created_at: string;
}

export type ContactInput = {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
  country: string;
  locale: string;
};

let contactEnsured = false;
async function ensureContactTable() {
  if (!sql || contactEnsured) return;
  await sql`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      company TEXT NOT NULL DEFAULT '',
      phone TEXT NOT NULL DEFAULT '',
      message TEXT NOT NULL DEFAULT '',
      country TEXT NOT NULL DEFAULT '',
      locale TEXT NOT NULL DEFAULT '',
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  contactEnsured = true;
}

export async function createSubmission(input: ContactInput): Promise<void> {
  if (!sql) return; // degrade gracefully when no DB
  await ensureContactTable();
  await sql`
    INSERT INTO contact_submissions (name, email, company, phone, message, country, locale)
    VALUES (${input.name}, ${input.email}, ${input.company}, ${input.phone}, ${input.message}, ${input.country}, ${input.locale})
  `;
}

export async function listSubmissions(): Promise<ContactSubmission[]> {
  if (!sql) return [];
  await ensureContactTable();
  const rows = await sql`SELECT * FROM contact_submissions ORDER BY created_at DESC`;
  return rows as ContactSubmission[];
}
