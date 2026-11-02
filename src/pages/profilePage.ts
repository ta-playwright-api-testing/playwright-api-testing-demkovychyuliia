import { type Page, expect } from '@playwright/test';

export class ProfilePage {
  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    // Відкриваємо меню користувача.
    await this.page.getByRole('img', { name: 'user' }).click();

    // Знаходимо посилання на особистий кабінет.
    const accountLink = this.page.getByRole('link', {
      name: 'Особистий кабінет',
      exact: true,
    });

    await expect(accountLink).toBeVisible();

    // Переходимо до особистого кабінету.
    await accountLink.click();

    // Перевіряємо адресу профілю.
    await expect(this.page).toHaveURL(/\/user\/\d+\/page/);

    // Перевіряємо заголовок сторінки.
    await expect(
      this.page.locator('.content-title').getByText('Мій профіль', {
        exact: true,
      }),
    ).toBeVisible();
  }

  async getPhoneValue(): Promise<string> {
    // Знаходимо номер телефону.
    const phoneValue = this.page.locator('.user-phone-data');

    await expect(phoneValue).toBeVisible();

    return (await phoneValue.textContent())?.trim() ?? '';
  }
}
