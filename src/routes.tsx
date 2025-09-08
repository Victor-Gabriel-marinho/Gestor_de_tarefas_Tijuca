import {BrowserRouter, Routes, Route} from "react-router-dom"
import Cadastro from "./pages/cadastro/cadastro"
import Login from "./pages/login/entrar";
import Quadros from "./pages/quadros/quadros";
import Times from "./pages/times/times";
import Layout from "./pages/times/components/layout/layout";
import People from "./pages/times/People";

function RoutesApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/cadastro" element={<Cadastro/>}/>
                <Route path="/" element={<Layout/>}> 
                    <Route index element={<People/>} />
                    <Route path="/times/:id" element={<Times/>}/>
                </Route>       
                <Route path="/entrar" element={<Login/>}/>
                <Route path="/quadros" element={<Quadros/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;