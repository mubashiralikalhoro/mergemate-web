import React from "react";
import { HiMenu } from "react-icons/hi";
import Logo from "../Logo";
import Link from "next/link";
import UserDropDown from "../App/UserDropDown";

const Navbar = () => {
  return (
    <nav className="fixed w-screen ">
      <div
        style={{
          zIndex: 1000,
        }}
        className="w-full p-2  bg-background-2 border-gray-1 border-b-[1px] flex items-center justify-between"
      >
        <div className="flex items-center">
          <div className="p-1 border mr-4 rounded-md border-gray-1 hover:bg-background-focused cursor-pointer">
            <HiMenu className="text-grayed-out text-2xl " />
          </div>

          <Link href={"/discover"}>
            <Logo size={40} />
          </Link>
        </div>

        <div>
          <UserDropDown />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
