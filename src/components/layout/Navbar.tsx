import React from "react";
import { HiMenu } from "react-icons/hi";
import Logo from "../Logo";

const Navbar = () => {
  return (
    <nav className="w-full fixed">
      <div className="w-full p-2 bg-background-2 border-gray-1 border-b-[1px] flex items-center ">
        <div className="p-1 border mr-4 rounded-md border-gray-1 hover:bg-background-focused cursor-pointer">
          <HiMenu className="text-grayed-out text-2xl " />
        </div>

        <Logo size={40} />
      </div>
    </nav>
  );
};

export default Navbar;
