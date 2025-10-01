
export interface User_out_team{
  id: string;
  Name: string;
  Email: string;
  Password: string;
}

export interface user_in_team {
  id: string;
  Name: string;
  Email: string;
  Password: string;
  Role: string;
}

export interface user_for_invite {
  id: string;
  Email: string;
  Name: string;
}

export type CreateUserDTO = Omit<User_out_team, "id">;
