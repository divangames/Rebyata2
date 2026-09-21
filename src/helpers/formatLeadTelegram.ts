////////////////////////////////////////////////////////
//
// HTML-текст заявки для Telegram (parse_mode HTML).
// Caption к фото ограничен 1024 символами.
//
////////////////////////////////////////////////////////

import type { LeadPayload } from "../types/lead";

/** Экранирует пользовательский ввод для HTML. */
function escapeHtml(value: string): string {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

/** Человекочитаемый заголовок и эмодзи типа заявки. */
function kindMeta(kind: LeadPayload["kind"]): { emoji: string; title: string } {
  switch (kind) {
    case "evaluate":
      return { emoji: "📸", title: "Оценка по фото" };
    case "courier":
      return { emoji: "🚗", title: "Вызов курьера" };
    case "request":
      return { emoji: "🧼", title: "Заявка на чистку" };
    default: {
      const neverKind: never = kind;
      return neverKind;
    }
  }
}

/** Собирает HTML-сообщение / caption для api/lead.php. */
export function formatLeadTelegram(payload: LeadPayload): string {
  const { emoji, title } = kindMeta(payload.kind);
  const rows = [
    "✅ <b>НОВАЯ ЗАЯВКА</b>",
    "✨ Свои ребята",
    "",
    `${emoji} <b>Тип:</b> ${title}`,
  ];

  if (payload.kind === "request" && payload.serviceTitle?.trim()) {
    rows.push(`🛠 <b>Услуга:</b> ${escapeHtml(payload.serviceTitle.trim())}`);
  }

  rows.push(`📞 <b>Телефон:</b> ${escapeHtml(payload.phone.trim())}`);

  if (payload.kind === "evaluate") {
    const count = payload.photos?.length ?? 0;
    rows.push(`🖼 <b>Фото:</b> ${count}`);
  }

  return rows.join("\n");
}
