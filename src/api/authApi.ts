import { type APIRequestContext, type APIResponse } from '@playwright/test';
import { type SuccessLogin, type UserLogin } from '../types/api';

export class AuthApi {
  constructor(private readonly request: APIRequestContext) {
    void this.request;
  }

  /** POST /api/signin — успішний логін, повернути SuccessLogin. */
  async signIn(_credentials: UserLogin): Promise<SuccessLogin> {
    throw new Error('TODO: implement AuthApi.signIn');
  }

  /** POST /api/signin — сирий response (для негативних кейсів). */
  async signInRaw(_credentials: UserLogin): Promise<APIResponse> {
    throw new Error('TODO: implement AuthApi.signInRaw');
  }
}
