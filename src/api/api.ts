import axios from "axios";
import { useAuthStore } from "../store/Auth";

const local= "localhost:3000"
/* const server = "192.168.0.159:3000" */
const api = axios.create({
    baseURL: `http://${local}`
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