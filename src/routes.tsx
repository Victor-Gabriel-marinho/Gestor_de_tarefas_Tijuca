import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cadastro from "./pages/cadastro/cadastro";
import Login from "./pages/login/entrar";
import Quadros from "./pages/quadros/quadros";
import Times from "./pages/times/times";
import Lista from "./pages/lista-tarefas/lista";
import Layout from "./pages/times/components/layout/layout";
import People from "./pages/times/People";
import { PrivateRoute } from "./components/auth/PrivateRoute";
import { BlockRouter } from "./components/auth/BlockRoute";
import Convite from "./pages/convite/convite";

function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/invite/accept/:token" element={<Convite />} />
        <Route element={<BlockRouter />}>
          <Route path="/entrar" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Layout />}>
            <Route path="/membros" element={<People />} />
            <Route path="/times/:id" element={<Times />} />
          </Route>
          <Route path="/lista/:id" element={<Lista />} />
          <Route index element={<Quadros />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default RoutesApp;
