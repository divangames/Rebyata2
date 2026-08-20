////////////////////////////////////////////////////////
//
// Конфигурация Vite: React и локальный сервер.
//
////////////////////////////////////////////////////////

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
});
