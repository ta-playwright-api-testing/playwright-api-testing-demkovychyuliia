import { test, expect } from '@playwright/test';
import { AuthApi } from '../../src/api/authApi';

/**
 * TASK 2 — POST /api/signin
 * Див. README → Завдання 2.
 *
 * Email / пароль тільки з process.env (див. playwright.config.ts + .env).
 */

const credentials = {
  email: process.env.USER_EMAIL ?? 'user@example.com',
  password: process.env.USER_PASSWORD ?? 'default_password',
};

test.describe('POST /api/signin', () => {
  test.skip('should sign in and return accessToken', async ({ request }) => {
    const authApi = new AuthApi(request);

    // TODO: signIn(credentials)
    // TODO: статус успіху, є accessToken, id, email

    expect(authApi).toBeDefined();
    expect(credentials.email).toBeTruthy();
  });

  test.skip('should reject invalid password', async ({ request }) => {
    const authApi = new AuthApi(request);

    // TODO: signInRaw з невірним паролем
    // TODO: статус >= 400 (не хардкодьте 401, якщо API віддає 400)

    expect(authApi).toBeDefined();
  });
});
