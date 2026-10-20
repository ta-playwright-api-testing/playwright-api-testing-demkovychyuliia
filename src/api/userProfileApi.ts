import { type APIRequestContext } from '@playwright/test';
import { type UserResponse, type UserUpdateProfile } from '../types/api';

export class UserProfileApi {
  constructor(private readonly request: APIRequestContext) {
    void this.request;
  }

  /** GET /api/user/{id} з Authorization: Bearer <token>. */
  async getById(_accessToken: string, _userId: number): Promise<UserResponse> {
    throw new Error('TODO: implement UserProfileApi.getById');
  }

  /**
   * PUT /api/user/{id}
   * У Swagger обов'язкові поля: email, phone, roleName.
   * Повертає новий номер телефону (як updateUserProfile() з лекції).
   */
  async updateUserProfile(
    _accessToken: string,
    _userId: number,
    _profile: UserUpdateProfile,
  ): Promise<string> {
    throw new Error('TODO: implement UserProfileApi.updateUserProfile');
  }
}
