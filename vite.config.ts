////////////////////////////////////////////////////////
//
// Конфигурация Vite: React, локальный сервер и базовый путь GitHub Pages.
//
////////////////////////////////////////////////////////

import dns from "node:dns";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

////////////////////////////////////////////////////////
//
// VPN часто ломает порядок DNS: localhost уходит на IPv6 или туннель.
//
////////////////////////////////////////////////////////
dns.setDefaultResultOrder("verbatim");

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
    host: "127.0.0.1",
    port: 5173,
    strictPort: true,
    open: "http://127.0.0.1:5173/",
    hmr: {
      host: "127.0.0.1",
      protocol: "ws",
      port: 5173,
    },
  },
  preview: {
    host: "127.0.0.1",
    port: 4173,
    strictPort: true,
    open: "http://127.0.0.1:4173/",
  },
});
