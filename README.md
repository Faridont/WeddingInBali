# Wedding in Bali — свадебное приглашение

Production-ready landing page для свадебного приглашения на Бали с RSVP-формой.

## Запуск

```bash
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

Сборка для продакшена:

```bash
npm run build
npm start
```

## Кастомизация

Все тексты, даты и детали свадьбы — в одном файле:

**[`lib/wedding-config.ts`](lib/wedding-config.ts)**

| Что изменить | Поле |
|--------------|------|
| Имена пары | `brideName`, `groomName` |
| Дата свадьбы | `date`, `dateISO` |
| Локация | `location`, `locationShort` |
| Дедлайн RSVP | `rsvpDeadline` |
| Текст от пары | `intro` |
| Карточки программы | `aboutCards` |
| Тайминг дня | `timeline` |
| Dress code, трансфер | `dressCode`, `transfer` |
| FAQ | `faq` |

## RSVP API

Форма отправляет данные на `POST /api/rsvp`.

- Валидация на клиенте и сервере
- Сохранение в **Google Таблицу** (см. ниже)
- В режиме `development` без env — заявки пишутся в консоль `npm run dev`
- Типы: [`types/rsvp.ts`](types/rsvp.ts)

## Подключение Google Sheets

1. Создайте проект в [Google Cloud Console](https://console.cloud.google.com/)
2. Включите **Google Sheets API**
3. Создайте **Service Account** и скачайте JSON-ключ
4. Создайте Google Таблицу с листом **`RSVP`** (имя листа важно)
5. В первой строке листа добавьте заголовки (см. таблицу ниже)
6. Откройте доступ к таблице для email сервисного аккаунта (**Editor**)
7. Скопируйте `.env.example` → `.env.local` и заполните переменные
8. Перезапустите `npm run dev` и отправьте тестовую форму

Колонки листа `RSVP` (диапазон `A:H`):

| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| timestamp | fullName | phone | relationship | attendance | companions | guestCount | comment |

Переменные окружения (`.env.local` / Vercel):

```env
GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id_from_url
GOOGLE_SERVICE_ACCOUNT_EMAIL=service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

- `GOOGLE_SHEETS_SPREADSHEET_ID` — ID из URL таблицы (`/d/ЭТОТ_ID/edit`)
- `GOOGLE_PRIVATE_KEY` — поле `private_key` из JSON-ключа, в одной строке с `\n`

## Деплой на Vercel

1. Залейте репозиторий на GitHub
2. Импортируйте проект в [Vercel](https://vercel.com)
3. Build command: `next build`
4. Добавьте три переменные Google Sheets в **Settings → Environment Variables**
5. Redeploy и проверьте отправку формы

## Стек

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
