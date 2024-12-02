import React from "react";
import { HiMenu } from "react-icons/hi";
import Logo from "../Logo";
import Link from "next/link";
import UserDropDown from "../App/UserDropDown";
import { useUserContext } from "@/context/UserContext";
import { RxCross2 } from "react-icons/rx";
import classNames from "classnames";

const Navbar = () => {
  const { user } = useUserContext();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  return (
    <nav
      style={{
        zIndex: 100,
      }}
      className="fixed w-screen"
    >
      <div
        style={{
          zIndex: 100,
        }}
        className={classNames(
          "absolute top-0 left-0  sm:max-w-56   w-full bg-background-2 duration-200 h-[100dvh]  border-r-gray-1 sm:border-r-[1px] flex flex-col justify-between",
          {
            "translate-x-0": isSidebarOpen,
            "translate-x-[-100%]": !isSidebarOpen,
          }
        )}
      >
        <div className="p-2">
          <div
            className="p-1 w-fit border mr-4 rounded-md border-gray-1 hover:bg-background-focused cursor-pointer"
            onClick={() => {
              setIsSidebarOpen(false);
            }}
          >
            <RxCross2 className="text-grayed-out text-2xl " />
          </div>
        </div>
      </div>
      <div
        style={{
          zIndex: 1000,
        }}
        className="w-full p-2  bg-background-2 border-gray-1 border-b-[1px] flex items-center justify-between"
      >
        <div className="flex items-center">
          <div
            onClick={() => {
              setIsSidebarOpen(true);
            }}
            className="p-1 border mr-4 rounded-md border-gray-1 hover:bg-background-focused cursor-pointer"
          >
            <HiMenu className="text-grayed-out text-2xl " />
          </div>

          <Link href={"/discover"}>
            <Logo size={40} />
          </Link>
        </div>

        <div>
          {user ? (
            <UserDropDown user={user} />
          ) : (
            <Link href={"/auth/login"}>
              <div className="bg-primary my-button ">Login</div>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
