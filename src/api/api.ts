import axios from "axios";
import { useAuthStore } from "../store/Auth";

const api = axios.create({
<<<<<<< HEAD
/*   baseURL: `http://192.168.0.159:3000`
 */  baseURL: `http://127.0.0.1:3000`
=======
    baseURL: `http://localhost:3000`
>>>>>>> c4a8a21 (01)
})


api.interceptors.response.use((response) => response, (error)=> {
    if (error.response?.status === 401) {
        const {clearToken} = useAuthStore.getState()
        clearToken()
        window.location.href = "/cadastro"
    }
    return Promise.reject(error)
} )

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});



export default api