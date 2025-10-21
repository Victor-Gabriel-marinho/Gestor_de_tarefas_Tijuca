import * as jwt_decode from "jwt-decode"

export type JwtpayloadCustom = {
    teamid?:string;
    sub?: string;
    Name?: string;
}

export function decodeJWT(token?: string | null ): JwtpayloadCustom | null {
    if (!token) return null;

    try{ 
        return jwt_decode.jwtDecode<JwtpayloadCustom>(token)
    }   
    catch (err){
        console.error("token inválido", err);
        return null
    }
}
