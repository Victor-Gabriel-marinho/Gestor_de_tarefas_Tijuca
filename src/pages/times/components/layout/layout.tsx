import Side_bar from "./side_Bar";
import { Outlet } from "react-router-dom";
import { useFont } from "../../../font";

function Layout() {

  useFont(" 'Poppins', 'SansSerif' ");
    
  return(

    <div className="w-screen h-screen flex flex-col">
      <nav className="w-full h-10 sm:h-17 bg-[#524D50]"></nav>
      <div className="flex-1 flex flex-row">

        <Side_bar />

        <main className="flex flex-1">
          <Outlet />
        </main>

      </div>
    </div>
  );
}


export default Layout;