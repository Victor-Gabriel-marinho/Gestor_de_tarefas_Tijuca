import {BrowserRouter, Routes, Route} from "react-router-dom"
import Cadastro from "./pages/cadastro/cadastro"
import Login from "./pages/login/entrar";

function RoutesApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Cadastro/>}/>
                <Route path="/entrar" element={<Login/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;