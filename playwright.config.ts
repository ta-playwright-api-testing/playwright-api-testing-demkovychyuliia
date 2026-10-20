import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const apiBaseURL = process.env.BASE_URL ?? 'http://localhost:8080';
const uiBaseURL = process.env.UI_BASE_URL ?? 'http://localhost';

export default defineConfig({
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    extraHTTPHeaders: {
      Accept: 'application/json',
    },
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'api',
      testDir: './tests/api',
      use: {
        baseURL: apiBaseURL,
      },
    },
    {
      name: 'api-ui',
      testDir: './tests/api-ui',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: uiBaseURL,
      },
    },
  ],
});
