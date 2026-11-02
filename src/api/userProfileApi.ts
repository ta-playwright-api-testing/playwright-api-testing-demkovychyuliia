import { type APIRequestContext } from '@playwright/test';
import { type UserResponse, type UserUpdateProfile } from '../types/api';

export class UserProfileApi {
  constructor(private readonly request: APIRequestContext) {}

  /** GET /api/user/{id} з Authorization: Bearer <token>. */
  async getById(accessToken: string, userId: number): Promise<UserResponse> {
    const response = await this.request.get(`/api/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.json() as Promise<UserResponse>;
  }

  /** PUT /api/user/{id}; Swagger required fields: email, phone, roleName; returns phone. */
  async updateUserProfile(
    accessToken: string,
    userId: number,
    profile: UserUpdateProfile,
  ): Promise<string> {
    const response = await this.request.put(`/api/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: profile,
    });

    if (!response.ok()) {
      const errorBody = await response.text();

      throw new Error(`Failed to update user profile: HTTP ${response.status()}. ${errorBody}`);
    }

    return profile.phone;
  }
}
