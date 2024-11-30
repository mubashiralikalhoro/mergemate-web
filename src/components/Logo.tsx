import React from "react";
import { FaGithub, FaHeart } from "react-icons/fa";

interface Props {
  size?: number;
}
const Logo = ({ size = 70 }: Props) => {
  return (
    <div className="relative flex items-center justify-center">
      <FaHeart
        className=""
        style={{
          fontSize: size,
        }}
      />
      <FaGithub
        className="absolute text-background-2 scale-50  "
        style={{
          fontSize: size,
        }}
      />
    </div>
  );
};

export default Logo;
