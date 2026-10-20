import { test, expect } from '@playwright/test';
import { CitiesApi } from '../../src/api/citiesApi';

/**
 * TASK 1 — GET /api/cities
 * Див. README → Завдання 1.
 *
 * Зніміть test.skip, коли хелпер і асерти готові.
 */

test.describe('GET /api/cities', () => {
  test.skip('should return a list of cities with expected schema', async ({ request }) => {
    const citiesApi = new CitiesApi(request);

    // TODO: викликати getAll / getAllRaw
    // TODO: статус 200, content-type json, масив з 5 міст
    // TODO: поля id, name, latitude, longitude
    // TODO: є Київ з id = 1

    expect(citiesApi).toBeDefined();
  });

  test.skip('should return a city by id', async ({ request }) => {
    const citiesApi = new CitiesApi(request);

    // TODO: GET /api/city/1 → name === 'Київ'

    expect(citiesApi).toBeDefined();
  });
});
