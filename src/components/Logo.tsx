import classNames from "classnames";
import React from "react";
import { FaGithub, FaHeart } from "react-icons/fa";

interface Props {
  size?: number;
  className?: string;
}
const Logo = ({ size = 70, className }: Props) => {
  return (
    <div className={classNames("relative flex items-center justify-center", className)}>
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
