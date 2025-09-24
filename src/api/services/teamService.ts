import api  from "../api";
import type { Create_User_Team, id_team} from "../types/id_teamDTO";
import type { Team } from "../types/Team";
import type { user_in_team } from "../types/User";


export const TeamService = {
  // Adiciona um usuário ao seu time
  async Add_user(
    users: Create_User_Team[],
    token: string
  ): Promise<{count: number}> {
    const { data } = await api.post<{count: number}>(
      "/time/new-user",users,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  },

  // Pega todos os times do usuário
  async Get_Teams(token: string): Promise<Team[]> {
    const { data } = await api.get<Team[]>("/time/all-team", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  },

  // Pega todos os usuários de um time só
  async Get_Users_in_team(
    id_team: string,
    token: string
  ): Promise<user_in_team[]> {
    const { data } = await api.get<user_in_team[]>(
      `/time/user-team/${id_team}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  },

  // Pega todos os usuários de todos os seus times
  async Get_All_users_in_your_team(token: string): Promise<user_in_team[]> {
    const { data } = await api.get<user_in_team[]>("/time/all-users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  },

  // Remove um usuário de um time
  async Remove_User_from_team(
    idTeam: id_team,
    idUser: string,
    token: string
  ): Promise<user_in_team[]> {
    const { data } = await api.delete<user_in_team[]>(
      `/time/delete-user/${idUser}/${idTeam}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  },
};