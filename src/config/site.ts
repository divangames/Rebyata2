////////////////////////////////////////////////////////
//
// URL API заявок и базовые настройки сайта.
//
////////////////////////////////////////////////////////

import { publicUrl } from "../helpers/publicUrl";

/** Эндпоинт PHP-прокси в Telegram (нужен PHP-хостинг; на GitHub Pages PHP нет). */
export const site = {
  leadApiUrl: publicUrl("api/lead.php"),
} as const;
