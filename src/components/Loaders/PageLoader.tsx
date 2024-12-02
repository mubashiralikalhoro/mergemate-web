import React from "react";
import Logo from "../Logo";

const PageLoader = () => {
  return (
    <div className="w-screen h-[100dvh] flex items-center justify-center">
      <Logo className="animate-pulse" />
    </div>
  );
};

export default PageLoader;
