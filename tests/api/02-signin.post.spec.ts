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
  test('should sign in and return accessToken', async ({ request }) => {
    const authApi = new AuthApi(request);

    const response = await authApi.signInRaw(credentials);
    expect(response.ok()).toBeTruthy();

    const login = await authApi.signIn(credentials);

    expect(login.accessToken).toBeTruthy();
    expect(login.id).toBeDefined();
    expect(login.email).toBe(credentials.email);
  });

  test('should reject invalid password', async ({ request }) => {
    const authApi = new AuthApi(request);

    const response = await authApi.signInRaw({
      ...credentials,
      password: 'invalid_password',
    });

    expect(response.status()).toBeGreaterThanOrEqual(400);
  });
});
