import { test, expect } from '@playwright/test';
import { AuthApi } from '../../src/api/authApi';
import { UserProfileApi } from '../../src/api/userProfileApi';
import { ProfilePage } from '../../src/pages/profilePage';

const credentials = {
  email: process.env.USER_EMAIL ?? 'user@example.com',
  password: process.env.USER_PASSWORD ?? 'default_password',
};

test.describe('API + UI: update phone and verify in browser', () => {
  test('should show API-updated phone on the profile page', async ({ playwright, page }) => {
    const apiRequest = await playwright.request.newContext({
      baseURL: process.env.BASE_URL ?? 'http://localhost:8080',
    });

    const authApi = new AuthApi(apiRequest);
    const userProfileApi = new UserProfileApi(apiRequest);
    const profilePage = new ProfilePage(page);

    try {
      // 1. Авторизація через API.
      const loginResponse = await authApi.signInRaw(credentials);

      expect(loginResponse.ok(), `API login failed: HTTP ${loginResponse.status()}`).toBeTruthy();

      const login = await loginResponse.json();

      const accessToken: string = login.accessToken;
      const userId: number = login.id;

      expect(accessToken).toBeTruthy();
      expect(userId).toBeDefined();

      // 2. Отримуємо початковий профіль через API.
      const originalProfile = await userProfileApi.getById(accessToken, userId);
      const originalPhone = originalProfile.phone ?? '';

      const newPhoneNumber = `+38067${Date.now().toString().slice(-7)}`;

      try {
        // 3. Змінюємо телефон через API.
        await userProfileApi.updateUserProfile(accessToken, userId, {
          email: originalProfile.email,
          firstName: originalProfile.firstName,
          lastName: originalProfile.lastName,
          roleName: originalProfile.roleName,
          phone: newPhoneNumber,
          urlLogo: originalProfile.urlLogo,
          status: originalProfile.status,
        });

        // 4. Перевіряємо збереження телефону через повторний GET.
        const savedProfile = await userProfileApi.getById(accessToken, userId);
        expect(savedProfile.phone).toBe(newPhoneNumber);

        // 5. Передаємо сесію в браузер ДО навігації.
        await page.addInitScript(
          ({ accessToken, refreshToken, id, role }) => {
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('id', String(id));
            localStorage.setItem('role', role);
          },
          {
            accessToken: login.accessToken,
            refreshToken: login.refreshToken,
            id: login.id,
            role: login.roleName,
          },
        );

        // 6. Відкриваємо головну сторінку.
        await page.goto('/');

        // Перевіряємо сесію в localStorage браузера.
        const browserSession = await page.evaluate(() => ({
          accessToken: localStorage.getItem('accessToken'),
          refreshToken: localStorage.getItem('refreshToken'),
          id: localStorage.getItem('id'),
          role: localStorage.getItem('role'),
        }));

        expect(browserSession.accessToken).toBe(accessToken);
        expect(browserSession.refreshToken).toBe(login.refreshToken);
        expect(browserSession.id).toBe(String(userId));
        expect(browserSession.role).toBe(login.roleName);

        // Переходимо до особистого кабінету.
        await profilePage.open();

        await expect(page).toHaveURL(`/user/${userId}/page`);

        // 7. Перевіряємо телефон у UI.
        const uiPhone = await profilePage.getPhoneValue();

        expect(uiPhone.replace(/\D/g, '')).toBe(newPhoneNumber.replace(/\D/g, ''));
      } finally {
        // 8. Відновлюємо початковий телефон.
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
    } finally {
      await apiRequest.dispose();
    }
  });
});
