import type { Auth } from "../AuthTypes/Auth";
import type { User_out_team } from "../UserTypes/User";

export interface Return_Auth {
  user: User_out_team;
  token: Auth;
}
