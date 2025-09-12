import { api } from "../api";
import type { Return_Auth } from "../types/AuthUser";
import type { CreateUserDTO } from "../types/User";

export const UserService = {
  async CreateUser(user: CreateUserDTO): Promise<Return_Auth> {
    const { data } = await api.post<Return_Auth>("/user", user);

    return data;
  },
};
