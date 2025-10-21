interface RecipientDTO{
    role: string
    email: string
}

export interface CreateInviteDTO {
    id_team: string;
    recipients: RecipientDTO[]
}   