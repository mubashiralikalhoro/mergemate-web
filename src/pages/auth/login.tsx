import Globe from "@/components/Globe";
import Logo from "@/components/Logo";
import constants from "@/constants";
import React from "react";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";

const LoginPage = () => {
  return (
    <>
      <div className="w-screen h-screen absolute top-0 right-0 flex items-center justify-center z-[-1] ">
        <Globe className="absolute  translate-y-[25%] opacity-50" />
      </div>
      <div className="w-screen h-[100dvh] flex items-center justify-center flex-col p-4 z-10 ">
        <Logo size={100} />
        <h1 className="font-bold text-3xl">{constants.APP_NAME}</h1>
        <p className="mb-10 text-xs text-grayed-out">{constants.TAG_LINE}</p>
        <div className="w-full max-w-xl p-4 border-gray-1 border rounded-md cursor-pointer hover:bg-background-focused">
          <div
            className="flex gap-2 items-center  text-xl font-bold justify-between"
            onClick={() => {
              signIn("github", { callbackUrl: `${window.location.origin}/user/profile` });
            }}
          >
            <FaGithub className="text-4xl" />
            Sign in with Github
            <FaGithub className="text-4xl opacity-0" />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
