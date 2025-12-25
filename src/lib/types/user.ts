import type { Role } from "../auth/auth";

export interface UserData {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}
