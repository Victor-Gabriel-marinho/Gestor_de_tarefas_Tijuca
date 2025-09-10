export interface Auth {
  Token: string;
  ExpiresIn: number;
}

export interface CreatAuthDTO {
  Email: string;
  Password: string;
}
