import type { Auth } from "./Auth";
import type { User_out_team } from "./User";

export interface Return_Auth {
  user: User_out_team;
  token: Auth;
}
