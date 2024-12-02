import React from "react";
import { HiMenu } from "react-icons/hi";
import { FaUser, FaBell } from "react-icons/fa";
import { MdLogout, MdNotifications } from "react-icons/md";
import { IoMdRocket } from "react-icons/io";
import Logo from "../Logo";
import Link from "next/link";
import UserDropDown from "../App/UserDropDown";
import { useUserContext } from "@/context/UserContext";
import { RxCross2 } from "react-icons/rx";
import classNames from "classnames";
import { signOut } from "next-auth/react";

const Navbar = () => {
  const { user } = useUserContext(); // Assuming logout is a function in context
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <nav
      style={{
        zIndex: 100,
      }}
      className="fixed w-screen"
    >
      {/* Sidebar for Mobile */}
      <div
        style={{
          zIndex: 100,
        }}
        className={classNames(
          "absolute top-0 left-0 sm:max-w-56 w-full bg-background-2 duration-200 h-[100dvh] border-r-gray-1 sm:border-r-[1px] flex flex-col justify-between",
          {
            "translate-x-0": isSidebarOpen,
            "translate-x-[-100%]": !isSidebarOpen,
          }
        )}
      >
        <div className="p-4">
          <div
            className="p-1 w-fit border mr-4 rounded-md border-gray-1 hover:bg-background-focused cursor-pointer"
            onClick={() => setIsSidebarOpen(false)}
          >
            <RxCross2 className="text-grayed-out text-2xl " />
          </div>
          <nav className="flex flex-col gap-4 mt-10">
            <Link
              onClick={() => {
                setIsSidebarOpen(false);
              }}
              href="/discover"
            >
              <div className="flex items-center gap-2  cursor-pointer hover:text-primary">
                <IoMdRocket className="text-grayed-out" />
                Discover
              </div>
            </Link>
            <Link
              onClick={() => {
                setIsSidebarOpen(false);
              }}
              href="/user/profile"
            >
              <div className="flex items-center gap-2  cursor-pointer hover:text-primary">
                <FaUser className="text-grayed-out" />
                Profile
              </div>
            </Link>
            <Link
              onClick={() => {
                setIsSidebarOpen(false);
              }}
              href="/requests"
            >
              <div className="flex items-center gap-2  cursor-pointer hover:text-primary">
                <FaBell className="text-grayed-out" />
                Requests
              </div>
            </Link>
            <Link
              onClick={() => {
                setIsSidebarOpen(false);
              }}
              href="/notifications"
            >
              <div className="flex items-center gap-2  cursor-pointer hover:text-primary">
                <MdNotifications className="text-grayed-out" />
                Notifications
              </div>
            </Link>
            {user && (
              <div
                onClick={() => {
                  signOut();
                }}
                className="flex items-center text-red-500 gap-2  cursor-pointer hover:text-primary"
              >
                <MdLogout />
                Logout
              </div>
            )}
          </nav>
        </div>
      </div>

      {/* Top Navbar */}
      <div
        style={{
          zIndex: 1000,
        }}
        className="w-full p-2 bg-background-2 border-gray-1 border-b-[1px] flex items-center justify-between"
      >
        <div className="flex items-center">
          {/* Hamburger Menu for Mobile */}
          <div
            onClick={() => setIsSidebarOpen(true)}
            className="p-1 border mr-4 rounded-md border-gray-1 hover:bg-background-focused cursor-pointer"
          >
            <HiMenu className="text-grayed-out text-2xl " />
          </div>
          {/* Logo */}
          <Link href="/discover">
            <Logo size={40} />
          </Link>
        </div>

        {/* User Options */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link href="/notifications">
                <div className="p-2 rounded-full hover:bg-background-focused cursor-pointer">
                  <MdNotifications className="text-grayed-out text-2xl" />
                </div>
              </Link>
              <UserDropDown user={user} />
            </>
          ) : (
            <Link href="/auth/login">
              <div className="bg-primary my-button">Login</div>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
