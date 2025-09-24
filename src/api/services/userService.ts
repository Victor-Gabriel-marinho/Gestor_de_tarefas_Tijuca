import api from "../api";
import type { Return_Auth } from "../types/AuthUser";
import type { Role } from "../types/Role";
import type { CreateUserDTO, user_for_invite } from "../types/User";

export const UserService = {
  async CreateUser(user: CreateUserDTO): Promise<Return_Auth> {
    const { data } = await api.post<Return_Auth>("/user", user);

    return data;
  },
  async get_userRole(token: string, id_team: string): Promise<Role> {
    const { data } = await api.get<Role>(`/user/get_role/${id_team}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data
  },

  async search_user(token: string, idteam: string) : Promise<user_for_invite[]>{
    const { data } = await api.get<user_for_invite[]>(`/user/search/${idteam}`, {
      headers: {
        Authorization: `Brearer ${token}`,
      }
    })
    return data
  }
};
