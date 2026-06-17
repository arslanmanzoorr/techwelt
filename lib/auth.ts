import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";

export const ADMIN_COOKIE = "tw_admin";

const password = process.env.ADMIN_PASSWORD || "";
const secret = process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || "techwelt-dev-secret";

export const adminConfigured = Boolean(process.env.ADMIN_PASSWORD);

/** Token stored in the cookie — an HMAC so the raw password is never stored. */
export function sessionToken(): string {
  return createHmac("sha256", secret).update(`admin:${password}`).digest("hex");
}

export function checkPassword(input: string): boolean {
  if (!password) return false;
  const a = Buffer.from(input);
  const b = Buffer.from(password);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function isAuthed(): Promise<boolean> {
  if (!adminConfigured) return false;
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;
  if (!token) return false;
  const expected = sessionToken();
  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}
