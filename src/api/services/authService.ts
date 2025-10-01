import api from "../api";
import type { Auth, CreatAuthDTO } from "../types/AuthTypes/Auth";

export const AuthService = {
  async SingIn(dados: CreatAuthDTO): Promise<Auth> {
    const { data } = await api.post<Auth>("/auth/login", dados);

    return data;
  },
};
