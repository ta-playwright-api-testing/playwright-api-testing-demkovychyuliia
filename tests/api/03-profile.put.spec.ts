import { test, expect } from '@playwright/test';
import { AuthApi } from '../../src/api/authApi';
import { UserProfileApi } from '../../src/api/userProfileApi';

/**
 * TASK 3 — PUT /api/user/{id}
 * Див. README → Завдання 3.
 *
 * beforeEach: логін → зберегти accessToken і userId.
 * Після тесту обов'язково відновіть попередній телефон.
 */

const credentials = {
  email: process.env.USER_EMAIL ?? 'user@example.com',
  password: process.env.USER_PASSWORD ?? 'default_password',
};

test.describe('PUT /api/user/{id}', () => {
  let accessToken = '';
  let userId = 0;

  test.beforeEach(async ({ request }) => {
    const authApi = new AuthApi(request);

    const login = await authApi.signIn(credentials);

    accessToken = login.accessToken;
    userId = login.id;
  });

  test('should update phone via PUT and verify via GET', async ({ request }) => {
    const userProfileApi = new UserProfileApi(request);

    // GET — отримуємо поточний профіль користувача.
    const originalProfile = await userProfileApi.getById(accessToken, userId);
    const originalPhone = originalProfile.phone ?? '';

    // Генеруємо новий номер телефону.
    const newPhoneNumber = `+38067${Date.now().toString().slice(-7)}`;

    try {
      // PUT — змінюємо телефон, зберігаючи інші поля профілю.
      const updatedPhone = await userProfileApi.updateUserProfile(accessToken, userId, {
        email: originalProfile.email,
        firstName: originalProfile.firstName,
        lastName: originalProfile.lastName,
        roleName: originalProfile.roleName,
        phone: newPhoneNumber,
        urlLogo: originalProfile.urlLogo,
        status: originalProfile.status,
      });

      // Перевіряємо результат методу.
      expect(updatedPhone).toBe(newPhoneNumber);

      // GET — перевіряємо оновлений профіль.
      const updatedProfile = await userProfileApi.getById(accessToken, userId);

      expect(updatedProfile.phone).toBe(newPhoneNumber);
      expect(updatedProfile.status).toBe(originalProfile.status);
    } finally {
      // PUT — відновлюємо початковий телефон та інші поля профілю.
      await userProfileApi.updateUserProfile(accessToken, userId, {
        email: originalProfile.email,
        firstName: originalProfile.firstName,
        lastName: originalProfile.lastName,
        roleName: originalProfile.roleName,
        phone: originalPhone,
        urlLogo: originalProfile.urlLogo,
        status: originalProfile.status,
      });
    }
  });
});
