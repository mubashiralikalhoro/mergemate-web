import AppLayout from "@/components/layout/AppLayout";
import Image from "next/image";
import React from "react";
import { FaPen } from "react-icons/fa";

const ProfilePage = () => {
  return (
    <div className="p-2">
      <div className="my-container mt-5 p-4 flex items-center gap-4">
        <Image
          alt="user"
          src={"/images/user-placeholder.png"}
          className="w-[100px] md:w-[200px] aspect-square rounded-full"
          width={200}
          height={200}
        />
        <div className="w-full flex items-center justify-between">
          <div className="">
            <h1 className="text-2xl font-bold">John Dee</h1>
            <p className="text-gray-400">John@gmail.com</p>
          </div>
          <div className="p-4 rounded-full border  border-gray-1 hover:bg-background-focused cursor-pointer">
            <FaPen className="text-lg cursor-pointer hover:scale-110" />
          </div>
        </div>
      </div>
      <div className="my-container mt-5 p-4">
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Repositories</h2>
          <ul className="space-y-4">
            {["Repo 1", "Repo 2", "Repo 3"].map((repo, index) => (
              <li
                key={index}
                className="my-container p-2 rounded-lg cursor-pointer hover:bg-background-focused"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold">{repo}</h3>
                    <p className="text-gray-500">Description of {repo}</p>
                  </div>
                  <div className="flex items-center space-x-2"></div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

ProfilePage.Layout = AppLayout;
export default ProfilePage;
