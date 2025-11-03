import api from "../api";
import type { Create_User_Team, id_team } from "../types/TeamTypes/id_teamDTO";
import type { Team } from "../types/TeamTypes/Team";
import type { user_in_team } from "../types/UserTypes/User";

export const TeamService = {
  //Criar um time
  async Create_Team(Team_Name: string): Promise<Team> {
    const { data } = await api.post<Team>("/time/create", { Name: Team_Name });
    return data;
  },

  // Adiciona um usuário ao seu time
  async Add_user(users: Create_User_Team[]): Promise<{ count: number }> {
    const { data } = await api.post<{ count: number }>("/time/new-user", users);

    return data;
  },

  // Pega todos os times do usuário
  async Get_Teams(): Promise<Team[]> {
    const { data } = await api.get<Team[]>("/time/all-team");
    

    return data;
  },

  // Pega todos os usuários de um time só
  async Get_Users_in_team(id_team: string): Promise<user_in_team[]> {
    const { data } = await api.get<user_in_team[]>(
      `/time/user-team/${id_team}`
    );

    return data;
  },

  // Pega todos os usuários de todos os seus times
  async Get_All_users_in_your_team(): Promise<user_in_team[]> {
    const { data } = await api.get<user_in_team[]>("/time/all-users");

    return data;
  },
 
  async GetTeamById(idTeam:string): Promise<Team> {
    const {data} = await api.get<Team>(`/time/find-team/${idTeam}`);
    return data;
  },

  async Delete_Team(idTeam: string): Promise<void> {
    const { data } = await api.delete<void>(`time/delete-team/${idTeam}`);

    return data;
  },

  // Remove um usuário de um time
  async Remove_User_from_team(
    idTeam: id_team,
    idUser: string
  ): Promise<user_in_team[]> {
    const { data } = await api.delete<user_in_team[]>(
      `/time/delete-user/${idUser}/${idTeam}`
    );

    return data;
  },
};
