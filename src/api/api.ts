import axios from "axios";
import { useAuthStore } from "../store/Auth";

const api = axios.create({
    baseURL: "http://127.0.0.1:3000"
})

api.interceptors.response.use((response) => response, (error)=> {
    if (error.response?.status === 401) {
        console.log(useAuthStore.getState());
        const {clearToken} = useAuthStore.getState()
        clearToken()
        window.location.href = "/cadastro"
    }
    return Promise.reject(error)
} )

export default api