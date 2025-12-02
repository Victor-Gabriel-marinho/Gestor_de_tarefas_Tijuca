import api from "../api";
import type { Return_Auth } from "../types/AuthTypes/AuthUser";
import type { Role } from "../types/UserTypes/Role";
import type { CreateUserDTO, user_for_invite } from "../types/UserTypes/User";

export const UserService = {
  async CreateUser(user: CreateUserDTO): Promise<Return_Auth> {
    const { data } = await api.post<Return_Auth>("/user", user);

    return data;
  },
  async get_userRole(id_team: string): Promise<Role> {
    const { data } = await api.get<Role>(`/user/get_role/${id_team}`);
    return data;
  },

  async search_user(idteam: string): Promise<user_for_invite[]> {
    const { data } = await api.get<user_for_invite[]>(
      `/user/search/${idteam}`
    );
    return data;
  }, 
  async get_users_by_id(ids: string[]): Promise<user_for_invite[] | null> {
    const ids_param = ids.join(',');
    const { data } = await api.get<user_for_invite[] | null>(`/user/get-users-by-id/${ids_param}`);
    return data;
  }
  
};
