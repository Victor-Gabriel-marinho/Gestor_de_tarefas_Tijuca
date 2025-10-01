export interface Role {
    id: string;
    name:string;
}

export type userRoleName = Omit<Role, "id">;
