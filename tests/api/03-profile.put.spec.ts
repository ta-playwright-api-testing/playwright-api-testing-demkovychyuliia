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
    // TODO: loginViaApi / authApi.signIn → accessToken, userId
    accessToken = '';
    userId = 0;
    void authApi;
    void credentials;
  });

  test.skip('should update phone via PUT and verify via GET', async ({ request }) => {
    const userProfileApi = new UserProfileApi(request);

    // TODO: GET профіль
    // TODO: PUT з тими самими email, firstName, lastName, roleName і новим phone
    // TODO: updateUserProfile() повертає newPhoneNumber
    // TODO: повторний GET — phone збігається
    // TODO: restore original phone (finally)

    expect(userProfileApi).toBeDefined();
    expect(accessToken).toBeDefined();
    expect(userId).toBeDefined();
  });
});
