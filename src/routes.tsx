import {BrowserRouter, Routes, Route} from "react-router-dom"
import Cadastro from "./pages/cadastro/cadastro"
import Login from "./pages/login/entrar";
import Quadros from "./pages/quadros/quadros";

function RoutesApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Cadastro/>}/>
                <Route path="/entrar" element={<Login/>}/>
                 <Route path="/quadros" element={<Quadros/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;