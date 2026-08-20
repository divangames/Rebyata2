////////////////////////////////////////////////////////
//
// Конфигурация Vite: React, локальный сервер и базовый путь GitHub Pages.
//
////////////////////////////////////////////////////////

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/** Базовый путь сайта: корень или подпапка GitHub Pages */
function resolveBase(): string {
  const fromEnv = process.env.VITE_BASE?.trim();
  if (!fromEnv) {
    return "/";
  }

  return fromEnv.endsWith("/") ? fromEnv : `${fromEnv}/`;
}

export default defineConfig({
  base: resolveBase(),
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
});
