import { test, expect } from '@playwright/test';
import { CitiesApi } from '../../src/api/citiesApi';

/**
 * TASK 1 — GET /api/cities
 * Див. README → Завдання 1.
 */

test.describe('GET /api/cities', () => {
  test('should return a list of cities with expected schema', async ({ request }) => {
    const citiesApi = new CitiesApi(request);

    const response = await citiesApi.getAllRaw();
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');

    const cities = await citiesApi.getAll();

    expect(Array.isArray(cities)).toBe(true);
    expect(cities).toHaveLength(5);

    for (const city of cities) {
      expect(city).toHaveProperty('id');
      expect(city).toHaveProperty('name');
      expect(city).toHaveProperty('latitude');
      expect(city).toHaveProperty('longitude');
    }

    expect(cities).toContainEqual(
      expect.objectContaining({
        id: 1,
        name: 'Київ',
      }),
    );
  });

  test('should return a city by id', async ({ request }) => {
    const citiesApi = new CitiesApi(request);

    const city = await citiesApi.getById(1);

    expect(city.name).toBe('Київ');
  });
});
