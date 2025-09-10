import { api } from "../api";
import type { CreateUserDTO, User } from "../types/User";

export const UserService = {
  async CreateUser(user: CreateUserDTO): Promise<User> {
    const { data } = await api.post<User>("/user", user);

    return data;
  },
};
