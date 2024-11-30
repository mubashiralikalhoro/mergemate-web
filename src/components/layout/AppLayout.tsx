import React from "react";
import Navbar from "./Navbar";

interface Props {
  children: React.ReactNode;
}

const AppLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col items-center w-screen min-h-[100dvh] overflow-x-hidden">
      <div className="h-[60px]" />
      <Navbar />
      {children}
    </div>
  );
};

export default AppLayout;
