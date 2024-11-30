import { StaticImageData } from "next/image";
import { easeIn, motion, PanInfo, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import SwipeButton from "./SwipeButtons";

export type CardProps = {
  data: AppRepo;
  active: boolean;
  removeCard: (id: number, action: "right" | "left") => void;
};

const Card = ({ data, active, removeCard }: CardProps) => {
  const [exitX, setExitX] = useState(0);

  const x = useMotionValue(0);
  const input = [-200, 0, 200];
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -125, 0, 125, 200], [0.5, 1, 1, 1, 0.5]);

  const dragEnd = (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 100) {
      setExitX(200);
      removeCard(data.repo.id, "right");
    } else if (info.offset.x < -100) {
      setExitX(-200);
      removeCard(data.repo.id, "left");
    }
  };

  return (
    <div className="w-full max-w-3xl absolute p-10">
      {/* <SwipeButton exit={setExitX} removeCard={removeCard} id={data.repo.id} /> */}
      {
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          className="bg-background-focused"
          onDragEnd={dragEnd}
          initial={{ scale: 0.95, opacity: 0.5 }}
          animate={{
            scale: 1.05,
            opacity: 1,
          }}
          style={{ x, rotate, opacity }}
          transition={{ type: "tween", duration: 0.3, ease: "easeIn" }}
          whileDrag={{ cursor: "grabbing" }}
          exit={{ x: exitX }}
        >
          <div className="my-container w-full p-4">
            <div className="mt-5 w-full flex items-center gap-4">
              <Image
                alt="user"
                src={data.repo?.owner?.avatar_url || "/images/user-placeholder.png"}
                className="w-[100px] md:w-[50px] aspect-square rounded-full"
                width={50}
                height={50}
              />
              <div className="">
                <p className="">@{data.repo.owner?.login}</p>
              </div>
            </div>
            <div className="mt-6">
              <h1 className="text-2xl font-bold">{data.repo.name} </h1>
              <p className="text-grayed-out">{data.repo.description}</p>
            </div>

            <div className="flex items-center mt-4 gap-2">
              <p className="font-bold ">Difficulty: </p>
              <div
                className={`text-sm font-medium border-[1px] w-fit ${
                  data.difficulty === "easy"
                    ? "text-green-500 border-green-500"
                    : data.difficulty === "medium"
                    ? "text-yellow-500 border-yellow-500"
                    : "text-red-500 border-red-500"
                } p-1 rounded`}
              >
                {data.difficulty}
              </div>
            </div>

            <div className="flex items-center mt-4 gap-2 flex-wrap">
              <p className="font-bold ">Tech Stack: </p>
              {data.technologies.map((item) => (
                <div
                  key={item}
                  className={`text-sm font-medium border-[1px] w-fit text-grayed-out border-grayed-out p-1 rounded`}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      }
    </div>
  );
};

export default Card;
