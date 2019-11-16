export interface UserResponse {
  id: number;
  name?: string;
  username?: string;
  role?: string;
  email: string;
  emailVerified?: boolean;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}
