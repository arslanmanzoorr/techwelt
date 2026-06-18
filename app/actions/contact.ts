"use server";

import { createSubmission, type ContactInput } from "@/lib/db";
import { getActiveCountry } from "@/lib/getEntity";
import { ENTITIES } from "@/lib/entities";

export type ContactState = { ok: boolean; error?: string };

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

/**
 * Handle a contact submission. Fans out to three destinations, each best-effort
 * so one failure never loses the enquiry:
 *   1. Neon database (contact_submissions table)
 *   2. Email via Resend (RESEND_API_KEY + CONTACT_EMAIL_TO/FROM)
 *   3. A webhook (CONTACT_WEBHOOK_URL)
 */
export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const input: ContactInput = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    company: String(formData.get("company") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
    country: "",
    locale: String(formData.get("locale") ?? "").trim(),
  };

  if (!input.name || !input.message || !isEmail(input.email)) {
    return { ok: false, error: "invalid" };
  }

  const country = await getActiveCountry();
  input.country = country;
  const entity = ENTITIES[country];

  // 1) Database
  try {
    await createSubmission(input);
  } catch (e) {
    console.error("contact: DB insert failed", e);
  }

  // 2) Email via Resend
  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL_TO || entity.email;
  const from = process.env.CONTACT_EMAIL_FROM || "Techwelt Website <onboarding@resend.dev>";
  if (resendKey && to) {
    try {
      const rows = [
        ["Name", input.name],
        ["Email", input.email],
        ["Company", input.company || "—"],
        ["Phone", input.phone || "—"],
        ["Office", `${entity.name} (${country})`],
        ["Language", input.locale || "—"],
      ];
      const html = `
        <h2 style="font-family:sans-serif">New enquiry — Techwelt</h2>
        <table style="font-family:sans-serif;border-collapse:collapse">
          ${rows.map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#666">${k}</td><td style="padding:4px 0"><strong>${escapeHtml(v)}</strong></td></tr>`).join("")}
        </table>
        <p style="font-family:sans-serif;white-space:pre-wrap;margin-top:16px">${escapeHtml(input.message)}</p>
      `;
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: input.email,
          subject: `New enquiry from ${input.name} — ${entity.name}`,
          html,
        }),
      });
    } catch (e) {
      console.error("contact: email failed", e);
    }
  }

  // 3) Webhook
  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...input,
          office: entity.name,
          submittedAt: new Date().toISOString(),
        }),
      });
    } catch (e) {
      console.error("contact: webhook failed", e);
    }
  }

  return { ok: true };
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
