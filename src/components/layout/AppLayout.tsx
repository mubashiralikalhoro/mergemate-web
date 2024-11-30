import React from "react";
import Navbar from "./Navbar";

interface Props {
  children: React.ReactNode;
}

const AppLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col items-center w-screen h-[100dvh] ">
      <div className="h-[60px]" />
      <Navbar />
      <div className="max-w-5xl w-full">{children}</div>
    </div>
  );
};

export default AppLayout;
