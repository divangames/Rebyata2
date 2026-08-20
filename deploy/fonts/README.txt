Положите сюда лицензионные файлы:

- DrukWide-Bold.woff2 — заголовки и цены
- Intro-Regular.woff2 — текст
- Intro-Bold.woff2 — кнопки и акценты

Затем в `src/styles/tokens.css` добавьте в `@font-face` строку
`url("/fonts/ИМЯ.woff2") format("woff2")` перед `local(...)`.

Druk Wide Bold нет на Google Fonts (это шрифт Commercial Type).

Пока файлов нет:
- заголовки и цены — Unbounded;
- текст — Onest;
- рукописный — Caveat Bold.
