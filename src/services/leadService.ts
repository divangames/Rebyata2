////////////////////////////////////////////////////////
//
// Отправка заявки (текст + фото) на PHP → Telegram.
//
////////////////////////////////////////////////////////

import { site } from "../config/site";
import { formatLeadTelegram } from "../helpers/formatLeadTelegram";
import type { LeadPayload } from "../types/lead";

/** Отправляет текст и при необходимости фото на api/lead.php. */
export async function submitLead(payload: LeadPayload): Promise<void> {
  const formData = new FormData();
  formData.append("text", formatLeadTelegram(payload));

  if (payload.photos) {
    for (const file of payload.photos) {
      formData.append("photos[]", file, file.name);
    }
  }

  const response = await fetch(site.leadApiUrl, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Lead API error");
  }

  const data = (await response.json()) as { ok?: boolean };
  if (!data.ok) {
    throw new Error("Lead rejected");
  }
}
