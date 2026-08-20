////////////////////////////////////////////////////////
//
// Точка входа: стили, PWA-регистрация, корень React.
//
////////////////////////////////////////////////////////

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Unbounded — широкая кириллица с Google Fonts, пока нет файла Druk Wide Bold.
import "@fontsource/unbounded/700.css";
import { App } from "./app/App";
import "./styles/global.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Не найден корневой элемент");
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    void navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`);
  });
}
