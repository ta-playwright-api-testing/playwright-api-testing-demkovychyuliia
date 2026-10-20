# ДЗ: API Testing (Playwright + TypeScript)

Скелет для практики **APIRequestContext**, CRUD і гібриду API + UI на додатку **«Навчай українською»** (Teach UA).

Замініть `test.skip` і `TODO` на робочий код. Готових розв’язків у репозиторії немає.

## Що тестуємо

| Що | URL |
|---|---|
| UI | http://localhost/ |
| API / Swagger | http://localhost:8080/swagger-ui/index.html |
| OpenAPI | http://localhost:8080/v3/api-docs |

У Swagger сервер `localhost` може бути з префіксом `/dev`. Живі виклики йдуть **без** `/dev`: `http://localhost:8080/api/cities`. Якщо Try it out дає 404 — приберіть `/dev`.

Авторизація в Swagger: **Authorize** → Bearer JWT.

## Підготовка

```bash
npm install
npx playwright install chromium
cp .env.example .env
```

У `.env` вкажіть навчальний акаунт (`USER_EMAIL`, `USER_PASSWORD`). Пароль у git не комітити.

```bash
npm test           # усі проєкти (skip-тести не падають)
npm run test:api   # лише API
npm run test:api-ui
npm run report     # HTML-звіт після прогону
```

## Лінтер і форматування

```bash
npm run lint          # ESLint
npm run lint:fix      # ESLint з автофіксом
npm run format        # Prettier --write
npm run format:check  # перевірка форматування
npm run check         # format:check + lint
```

`npm run check` має проходити перед здачею.

`baseURL` для API: `http://localhost:8080` (див. `playwright.config.ts`).  
Для гібридного тесту UI: `http://localhost`.

## Структура

```
src/
  types/api.ts          # типи зі Swagger (можна уточнювати)
  api/                  # хелпери — реалізуйте методи
    citiesApi.ts
    authApi.ts
    userProfileApi.ts
  pages/
    profilePage.ts      # мінімальний POM для завдання 4
tests/
  api/                  # завдання 1–3 (без браузера)
  api-ui/               # завдання 4 (API + UI)
```

## Загальні правила

1. Немає `waitForTimeout` / `sleep`.
2. Запити не хардкодити в кожному тесті — використовуйте хелпери в `src/api/`.
3. Секрети лише в `.env`. У репозиторій — `.env.example` без паролів.
4. Не використовуйте `page.route` / `fulfill` — це наступна тема.
5. **Не викликайте** `DELETE /api/city/{id}` і `DELETE /api/user/{id}`.
6. Перед здачею: `npm run check` (Prettier + ESLint).

---

## Завдання 1. GET без браузера

Файл: `tests/api/01-cities.get.spec.ts`  
Хелпер: `src/api/citiesApi.ts`

`GET /api/cities`

- статус `200`
- заголовок `content-type` містить `application/json`
- тіло — масив з **5** міст
- у елемента є `id`, `name`, `latitude`, `longitude`
- є місто `Київ` з `id: 1`

Додатково: `GET /api/city/1` → `name === 'Київ'`.

Тип уже є в `src/types/api.ts` (`City`).

---

## Завдання 2. POST — логін

Файл: `tests/api/02-signin.post.spec.ts`  
Хелпер: `src/api/authApi.ts`

`POST /api/signin` з тілом `{ email, password }` (`UserLogin`).

Успіх (`SuccessLogin`):

- статус зазвичай `200` (перевірте фактичний)
- є `accessToken`, `id`, `email`
- email/пароль з `process.env`, пароль з default як у лекції:  
  `process.env.USER_PASSWORD ?? 'default_password'`

Негатив: той самий email + невірний пароль → статус **≥ 400**. Не хардкодьте `401`, якщо API віддає `400`.

---

## Завдання 3. PUT — профіль

Файл: `tests/api/03-profile.put.spec.ts`  
Хелпер: `src/api/userProfileApi.ts`

У `beforeEach`: логін → зберегти `accessToken` і `userId`.

1. `GET /api/user/{id}` з заголовком `Authorization: Bearer <token>`
2. `PUT /api/user/{id}` — змінити **лише телефон**. Решту полів візьміть з GET.  
   У Swagger для `UserUpdateProfile` обов’язкові **`email`, `phone`, `roleName`**. PUT лише з телефоном не пройде.
3. Хелпер `updateUserProfile()` повертає `newPhoneNumber`.
4. Повторний GET — `phone` збігається з цим значенням.
5. **Відновіть** попередній телефон (`finally` / після асертів) — акаунт спільний.

Номер робіть унікальним, наприклад `+38067` + 7 цифр з `Date.now()`.

---

## Завдання 4. Гібрид API + UI

Файл: `tests/api-ui/04-profile.hybrid.spec.ts`  
POM: `src/pages/profilePage.ts`

1. Змінити телефон **через API**.
2. Передати сесію в браузер: у `localStorage` покласти `accessToken` і `id` (`page.addInitScript`) **до** навігації.
3. Відкрити профіль (`/user/{id}/page` — якщо шлях інший, знайдіть у UI й напишіть у здачі).
4. Зчитати телефон з UI і порівняти з API.
5. Відновити телефон.

У проєкті `api-ui` `baseURL` вказує на UI (`http://localhost`). Для API використовуйте абсолютний URL `http://localhost:8080` або окремий `APIRequestContext`.

Cookies / storage детальніше будуть у наступній темі; тут достатньо `localStorage`.

---

## Формат здачі

1. Зняти `test.skip`, усі обов’язкові тести зелені.
2. HTML-репорт Playwright (`npm run report`).
3. Коротко в цьому README (або в `REPORT.md`): які шляхи `GET`/`PUT` спрацювали, як передали токен у UI.

**Критерії:** GET без браузера; POST логін з `.env`; PUT + перевірка GET; гібрид API+UI; негативний логін; хелпери; телефон відновлено; секретів немає в git; немає `waitForTimeout`; `npm run check` зелений.

## Корисні ендпоінти зі Swagger

| Метод | Шлях | Навіщо |
|---|---|---|
| GET | `/api/cities` | список міст |
| GET | `/api/city/{id}` | місто за id |
| POST | `/api/signin` | логін |
| GET | `/api/user/{id}` | профіль |
| PUT | `/api/user/{id}` | оновлення профілю |
