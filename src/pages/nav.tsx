import { MdPeople } from "react-icons/md";

function Nav() {
  return (
    <nav className="bg-[#524D50] w-screen h-10 ">
      <div className="flex justify-end mr-2 h-50">
        <MdPeople className="h-10" size={24} color="White"/>
      </div>
    </nav>
  );
}

export default Nav;