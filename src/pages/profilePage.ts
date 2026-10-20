import { type Page } from '@playwright/test';

/**
 * Мінімальний POM для гібридного тесту (завдання 4).
 * Уточніть локатори на реальній сторінці профілю.
 */
export class ProfilePage {
  constructor(private readonly page: Page) {
    void this.page;
  }

  async open(_userId: number): Promise<void> {
    throw new Error('TODO: open profile, e.g. /user/{id}/page');
  }

  async getPhoneValue(): Promise<string> {
    throw new Error('TODO: read phone from UI');
  }
}
