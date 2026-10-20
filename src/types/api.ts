/** Типи з OpenAPI Teach UA (`/v3/api-docs`). За потреби уточніть по Swagger. */

export type City = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
};

export type UserLogin = {
  email: string;
  password: string;
};

export type SuccessLogin = {
  id: number;
  email: string;
  roleName: string;
  accessToken: string;
  refreshToken: string;
};

export type UserResponse = {
  id: number;
  firstName: string;
  lastName: string;
  phone: string | null;
  email: string;
  roleName: string;
  urlLogo?: string | null;
  status?: string;
};

export type UserUpdateProfile = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  roleName: string;
  urlLogo?: string | null;
  status?: string;
};
