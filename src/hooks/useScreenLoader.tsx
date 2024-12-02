import Loader from "@/components/Global/Loader";
import React from "react";

const useScreenLoader = () => {
  const [screenLoading, setScreenLoading] = React.useState(false);

  return {
    screenLoading,
    setScreenLoading,
    ScreenLoader: () => {
      return screenLoading ? (
        <div className="w-full h-[100dvh] fixed   flex items-center justify-center">
          <div className="bg-background-focused my-container p-2 ">
            <Loader className="text-4xl" />
          </div>
        </div>
      ) : null;
    },
  };
};

export default useScreenLoader;
