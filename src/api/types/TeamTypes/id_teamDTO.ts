export interface id_team {
    id:string
}

export interface User_Team {
    id: string;
    UserId: string;
    TeamId: string;
    Role: string;
}

export type Create_User_Team = Omit<User_Team, "id">