import { test, expect } from '@playwright/test';
import { AuthApi } from '../../src/api/authApi';
import { UserProfileApi } from '../../src/api/userProfileApi';
import { ProfilePage } from '../../src/pages/profilePage';

/**
 * TASK 4 — гібрид API + UI
 * Див. README → Завдання 4.
 *
 * API ходить на BASE_URL (8080). UI — на UI_BASE_URL (localhost).
 * Для request у цьому проєкті baseURL = UI; абсолютний API URL:
 *   `${process.env.BASE_URL ?? 'http://localhost:8080'}/api/...`
 * або окремий APIRequestContext.
 */

const credentials = {
  email: process.env.USER_EMAIL ?? 'user@example.com',
  password: process.env.USER_PASSWORD ?? 'default_password',
};

test.describe('API + UI: update phone and verify in browser', () => {
  test.skip('should show API-updated phone on the profile page', async ({ request, page }) => {
    const authApi = new AuthApi(request);
    const userProfileApi = new UserProfileApi(request);
    const profilePage = new ProfilePage(page);

    // TODO: логін через API
    // TODO: змінити телефон через PUT
    // TODO: покласти accessToken і id у localStorage (addInitScript)
    // TODO: відкрити профіль, зчитати телефон, порівняти з API
    // TODO: відновити телефон

    expect(authApi).toBeDefined();
    expect(userProfileApi).toBeDefined();
    expect(profilePage).toBeDefined();
    expect(credentials.email).toBeTruthy();
  });
});
