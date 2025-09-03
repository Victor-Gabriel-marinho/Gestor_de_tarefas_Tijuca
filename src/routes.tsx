import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cadastro from "./pages/cadastro/cadastro";
import Login from "./pages/login/entrar";
import Quadros from "./pages/quadros/quadros";
import Times from "./pages/times/times";
<<<<<<< HEAD
import Lista from "./pages/lista-tarefas/lista";
import Layout from "./pages/times/components/layout/layout";
import People from "./pages/times/People";
import { PrivateRoute } from "./components/PrivateRoute";
import { BlockRouter } from "./components/BlockRoute";
=======
import Quadros from "./pages/quadros/quadros";

>>>>>>> d592cd4 (tela de criação de quadros)

function RoutesApp() {
    return (
        <BrowserRouter>
            <Routes>
<<<<<<< HEAD
                <Route element={<BlockRouter />}>
                    <Route path="/cadastro" element={<Cadastro />} />
                    <Route path="/entrar" element={<Login />} />
                </Route>

                <Route element={<PrivateRoute />}>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<People />} />
                        <Route path="/times/:id" element={<Times />} />
                    </Route>
                        <Route path="/lista" element={<Lista />} />
                        <Route path="/quadros" element={<Quadros />} />
                </Route>
=======
                <Route path="/cadastro" element={<Cadastro/>}/>
                <Route path="/" element={<Times/>}/>
                <Route path="/entrar" element={<Login/>}/>
                 <Route path="/quadros" element={<Quadros/>}/>
>>>>>>> d592cd4 (tela de criação de quadros)
            </Routes>
        </BrowserRouter>
    );

}

export default RoutesApp;
