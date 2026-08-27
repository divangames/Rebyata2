# Свои ребята

PWA-посадочник химчистки, реставрации и ремонта «Свои ребята». Сверстан mobile-first: шесть экранов лендинга, нижняя навигация, оценка по фото и заявка на курьера. На экранах от 1024px — отдельная десктопная композиция: широкая сетка секций, шапка с якорями и кнопкой «Узнать стоимость».

## Структура

- `src/app` — оболочка PWA и переключение вкладок
- `src/components` — блоки экранов, шапка, док, шторки оценки и курьера; «Примеры работ» — ряды со свайпом и модалка сравнения
- `src/config` — тексты строго по макетам
- `src/assets/HERO` — главное фото первого экрана
- `src/assets/work` — пары «до / после» для примеров работ (`*_1` / `*_01` — после, `*_2` / `*_02` — до)
- `src/assets/icons` — знак MAX для подвала
- `src/hooks` — reduced motion и оценка мощности устройства
- `src/styles` — токены брендбука
- `public/images` — логотипы
- `public/fonts` — лицензионные Intro и Druk Wide Bold

## Запуск

Windows:

1. `install.bat`
2. `start.bat` или `dev.bat`

Либо:

```bash
npm install
npm run dev
```

Откроется `http://127.0.0.1:5173/` — именно этот адрес, даже если включён VPN. Адрес Network из консоли Vite не открывайте: VPN подставляет IP туннеля, страница падает.

Шрифты подключаются локально (Intro, Druk Wide, Caveat, Unbounded). Google Fonts не используются, чтобы VPN не ломал загрузку.

## Сборка

`build.bat` или `npm run build`. Результат — папка `dist`.

Предпросмотр продакшен-сборки: `preview.bat`.

## Деплой

Windows: двойной щелчок по `deploy.bat` (нужен Node.js в PATH). Либо `npm run build` и `npm run prepare:deploy`.

Скрипт соберёт статическую папку `deploy\` и архив `deploy.zip`. Готовая папка также лежит в репозитории: [deploy](https://github.com/divangames/Rebyata2/tree/main/deploy). Залейте **содержимое** `deploy\` в корень сайта (`public_html`, `www`, `htdocs`). Node.js на хостинге не нужен. Для PWA нужен HTTPS.

Подойдёт любой статический хостинг (Apache, Nginx, Cloudflare Pages, Netlify, GitHub Pages).

Онлайн-версия на GitHub Pages: [divangames.github.io/Rebyata2](https://divangames.github.io/Rebyata2/). Сборка публикуется автоматически при пуше в `main`.

## Шрифты

- **Intro** — основной текст и кнопки: `public/fonts/Intro-Regular.ttf` и `Intro-Bold.ttf`.
- **Druk Wide Bold** — заголовки и цены: `public/fonts/DrukWide-Bold.otf`. Если в файле нет кириллицы, для русского текста остаётся запасной **Unbounded**.
- **Caveat Bold** — рукописные акценты (слоган в hero), пакет `@fontsource/caveat`.

## Технологии

React 19, TypeScript, Vite, CSS без UI-китов. Service worker — `public/sw.js`.
