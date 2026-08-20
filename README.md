# Свои ребята

PWA-посадочник химчистки, реставрации и ремонта «Свои ребята». Сверстан mobile-first по макетам: шесть экранов лендинга, нижняя навигация и оценка по фото.

## Структура

- `src/app` — оболочка PWA и переключение вкладок
- `src/components` — блоки экранов, шапка, док, шторка оценки; в «Примерах работ» сравнение кадров в модалке; в подвале — рукописный акцент, стрелка и мессенджеры
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

Откроется локальный сервер Vite (порт 5173).

## Сборка

`build.bat` или `npm run build`. Результат — папка `dist`.

Предпросмотр продакшен-сборки: `preview.bat`.

## Деплой

Любой статический хостинг (Nginx, Cloudflare Pages, Netlify, GitHub Pages). Загрузите содержимое `dist`. Для PWA нужен HTTPS.

## Шрифты

- **Intro** — основной текст и кнопки. Лицензионные `Intro-Regular.woff2` и `Intro-Bold.woff2` кладутся в `public/fonts`. Пока файлов нет, подключён **Onest**.
- **Druk Wide Bold** — заголовки и цены. Это коммерческий шрифт Commercial Type, на Google Fonts его нет. Положите `DrukWide-Bold.woff2` в `public/fonts`. Пока файла нет, для кириллицы подключён **Unbounded** (Google Fonts).
- **Caveat Bold** — рукописные акценты (слоган в hero).

## Технологии

React 19, TypeScript, Vite, vite-plugin-pwa, CSS без UI-китов.
