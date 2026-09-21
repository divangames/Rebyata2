<img width="765" height="76" alt="logo-horizon" src="https://github.com/user-attachments/assets/673f2b7d-0d51-417a-ac0f-9316ff0cfccb" />

# Свои ребята

PWA-посадочник химчистки, реставрации и ремонта «Свои ребята». Сверстан mobile-first: шесть экранов лендинга, нижняя навигация, оценка по фото и заявка на курьера. На телефоне при первом визите в браузере показывается инструкция «на рабочий стол» — отдельно для iPhone и Android, чтобы получать пуши о статусе заказа и персональные скидки. На экранах от 1024px — отдельная десктопная композиция: широкая сетка секций, шапка с якорями и кнопкой «Узнать стоимость».

## Структура

- `src/app` — оболочка PWA и переключение вкладок
- `src/components` — блоки экранов, шапка, док, шторки оценки и курьера, общее окно благодарности, установка PWA; «Примеры работ» — ряды со свайпом и модалка сравнения
- `src/config` — тексты строго по макетам
- `src/assets/HERO` — главное фото первого экрана
- `src/assets/work` — пары «до / после» для примеров работ (`*_1` / `*_01` — после, `*_2` / `*_02` — до)
- `src/assets/icons` — знак MAX для подвала
- `src/assets/favicon` — исходники значков (ico, svg, png 16/32, apple-touch, android-chrome)
- `src/hooks` — reduced motion, мощность устройства и подсказка установки PWA
- `src/styles` — токены брендбука
- `public/images` — логотипы
- `public/` — фавиконки и манифест (копия из `src/assets/favicon`)
- `public/fonts` — лицензионные Intro и Druk Wide Bold
- `api/` — PHP-прокси заявок в Telegram (`lead.php`, секреты в `config.php`)

## Заявки в Telegram

Формы «Узнать стоимость», «Вызвать курьера» и заявка по услуге отправляют текст (и фото при оценке) в группу через бота.

1. На PHP-хостинге должна лежать папка `api/` (её копирует `prepare:deploy`).
2. Скопируйте `api/config.example.php` → `api/config.php` и укажите `bot_token` и `chat_id`.
3. Бот должен быть добавлен в группу заявок и иметь право писать сообщения.
4. На GitHub Pages PHP не выполняется — заявки работают только на PHP-хостинге с залитной `api/`.

Локальная проверка API: `php -S 127.0.0.1:8080 -t .` из корня проекта, затем POST на `http://127.0.0.1:8080/api/lead.php`.

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

Подойдёт любой статический хостинг (Apache, Nginx, Cloudflare Pages, Netlify, GitHub Pages). Для приёма заявок в Telegram нужен PHP (см. раздел выше).

Онлайн-версия на GitHub Pages: [divangames.github.io/Rebyata2](https://divangames.github.io/Rebyata2/). Сборка публикуется автоматически при пуше в `main`.

## Шрифты

- **Intro** — основной текст и кнопки: `public/fonts/Intro-Regular.ttf` и `Intro-Bold.ttf`.
- **Druk Wide Bold** — заголовки и цены: `public/fonts/DrukWide-Bold.otf`. Если в файле нет кириллицы, для русского текста остаётся запасной **Unbounded**.
- **Caveat Bold** — рукописные акценты (слоган в hero), пакет `@fontsource/caveat`.

## Технологии

React 19, TypeScript, Vite, CSS без UI-китов. Service worker — `public/sw.js`. Заявки — PHP + Telegram Bot API.
