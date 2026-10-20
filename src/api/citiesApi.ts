import { type APIRequestContext, type APIResponse } from '@playwright/test';
import { type City } from '../types/api';

export class CitiesApi {
  constructor(private readonly request: APIRequestContext) {
    void this.request;
  }

  /** GET /api/cities — повернути масив міст. */
  async getAll(): Promise<City[]> {
    throw new Error('TODO: implement CitiesApi.getAll');
  }

  /** GET /api/city/{id} — одне місто. */
  async getById(_id: number): Promise<City> {
    throw new Error('TODO: implement CitiesApi.getById');
  }

  /** Сирий response, якщо потрібен статус / headers. */
  async getAllRaw(): Promise<APIResponse> {
    throw new Error('TODO: implement CitiesApi.getAllRaw');
  }
}
