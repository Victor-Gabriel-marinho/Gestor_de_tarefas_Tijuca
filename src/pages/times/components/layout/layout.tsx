import Side_bar from "./side_Bar";
import { Outlet } from "react-router-dom";
import Nav from "../../../../components/nav";
import { useFont } from "../../../../components/font";

function Layout() {
  useFont(" 'Poppins', 'SansSerif' ");


  return (
    <div className="w-screen h-screen flex flex-col ">
      <Nav />
      <div className="flex-1 flex flex-col-reverse sm:flex-row">
        <Side_bar />
        <main className="flex flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
