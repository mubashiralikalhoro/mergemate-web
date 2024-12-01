import React, { useEffect, useState } from "react";
import DropDown from "@/components/Global/DropDown";
import { FaSignOutAlt } from "react-icons/fa";

import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { useUserContext } from "@/context/UserContext";

const UserDropDown = ({ user }: { user: User }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    signOut();
  };

  if (!user) {
    return <div />;
  }

  return (
    <div className="w-12 aspect-square">
      <img
        onClick={() => {
          router.pathname.includes("/discover") ? router.push("/user/profile") : setIsOpen((p) => !p);
        }}
        src={user?.image || "/images/user-placeholder.png"}
        alt="avatar"
        className=" w-full h-full object-cover rounded-full hover:shadow-lg cursor-pointer border-2 border-gray-1"
      />

      <div className="relative">
        <DropDown
          className="absolute mt-2 right-0"
          isOpen={isOpen}
          sections={[
            [
              {
                content: (
                  <p className="text-lightText">
                    <span className="font-semibold">{user.name}</span>
                    <br />
                    <p className="text-xs">{user.email}</p>
                  </p>
                ),
                clickable: false,
              },
            ],
            [
              {
                content: "Profile",
                link: "/user/profile",
                onClick() {
                  setIsOpen(false);
                },
              },
            ],
            [
              {
                content: (
                  <div className="text-red-500 flex gap-2 items-center">
                    <FaSignOutAlt />
                    Logout
                  </div>
                ),
                onClick: handleLogout,
              },
            ],
          ]}
        />
      </div>
    </div>
  );
};

export default UserDropDown;
