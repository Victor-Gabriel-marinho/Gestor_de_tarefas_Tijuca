import type { Role } from "./Role";

export interface User {
  id: string;
  Name: string;
  Email: string;
  Password: string;
  Role?: Role;
}

export type CreateUserDTO = Omit<User, "id" | "role">;
