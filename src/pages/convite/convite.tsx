import { useState, useEffect} from "react";
import { AiOutlineTeam } from "react-icons/ai";
import { inviteService } from "../../api/services/inviteService";
import type { ReturnaceptDTO } from "../../api/types/inviteTypes/ReturnaceptDTO";
import { useParams, useNavigate } from "react-router-dom";
import { decodeJWT } from "../../utils/decodeJWT";
import { Loading_anim } from "../../components/commons/loading";
import { TeamService } from "../../api/services/teamService";
import type { Team } from "../../api/types/TeamTypes/Team";
import { UseinviteStore, useAuthStore } from "../../store/Auth";

function InviteTime() {
  const [teamData, setTeamData] = useState<Team | null>(null);
  const [time, setTime] = useState<ReturnaceptDTO | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  //const info = token ? decodeJWT(token) : null;
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)


  const setToken = UseinviteStore((state) => state.setToken)  
  const Inviteurl = window.location.pathname
  const clearToken = UseinviteStore((state) => state.clearToken)

  const login_ROUTE = '/Entrar'
  let info = null; 

  // checa se o usuário não está logado 
 
  if (!token) {
      // Se não houver token, define o erro e não faz mais nada.
      setError("Token de convite não fornecido na URL, você voltara para a página inicial do Workpoint");
      
  } else {
      // Tenta decodificar o token
      try {
          const decodeInfo = decodeJWT(token);

          if (!decodeInfo || !decodeInfo.teamid) {
              // Decodificou, mas o conteúdo é inválido
              setError("Token decodificado não contém ID de time válido, você voltara para a página inicial do Workpoint");
              

          } else {
              // Decodificou e o conteúdo é válido, armazena em 'info'
              info = decodeInfo;
          }
      } catch (e) {
          // Captura erros de decodificação (ex: JWT inválido ou expirado)
          console.error("Erro na decodificação/validação do token:", e);
          setError("Token de convite inválido ou expirado, você voltara para a página inicial do Workpoint");
         

      }
  }

  useEffect( () => {
    const fetch = async () => {
      try {
       setLoading(true)
      if (!info?.teamid || error) return
       const response = await TeamService.GetTeamById(info.teamid)
       setTeamData(response)

     } catch(err) {
       console.error(err);
        setError("Erro ao procurar o time");

     } finally {
        setLoading(false)
     }
    }
   if (info?.teamid && !error) {
        fetch();
    }
  }, [info?.teamid, error])

  // 🔹 Aceitar convite
  const aceitouConvite = async () => {

      if (!isAuthenticated()) {
        if (token) {
            setToken(Inviteurl)
         
        }
        setError("Você precisa está logado para aceitar este convite")
        navigate(login_ROUTE)
        return
      }


      if (!token || !info?.teamid || !teamData) return;

      setLoading(true);
      setError(null)
      try {
        const response = await inviteService.Aceptinvite(token);
        console.log(response);
       clearToken()
        navigate(`/times/${info?.teamid}`);

      } catch (err) {
        console.error(err);
        setError("Convite não encontrado ou já foi aceito/expirado, você voltara para a página inicial do Workpoint");
        setTimeout(() => navigate('/Entrar/'), 3000)
      } finally {
        setLoading(false);
    };
  
    };  

  return (
    <div className="h-screen w-screen bg-[#251F1F] flex items-center justify-center fixed inset-0">
     {} {loading && <Loading_anim />}
      
        {!loading && error && (
             <div className="bg-[#1F2937] text-center h-20 p-1 rounded-[5px]">
               <p className="text-white">
                  Falha no convite
               </p>
               <p className="text-red-500">{error}</p>
             </div>
        )}

        {!loading && !error && !teamData && (
          <p className="text-red-500 h-20 p-1">
                Aguardando dados do time ou token invalido
             </p>
        )}

        {!loading && !error && teamData &&  (
      <div className="bg-[#1F2937] w-96 h-52 text-center p-1 rounded-[5px] max-w-[90vh] shadow-2xl shadow-black/50">
        <h2 className="text-3xl text-white font-semibold">Convite</h2>
        <AiOutlineTeam color="white" className="w-100 h-20" />
        <p className="text-white p-1 truncate">
          Você foi chamado para {teamData.Name}
        </p>
        <button
          onClick={aceitouConvite}
          className="bg-green-500 text-white rounded-[5px] p-1 hover:bg-green-300 m-1"
        >
          Aceitar convite
        </button>
      </div>
    )}
    </div>
  );
}
export default InviteTime