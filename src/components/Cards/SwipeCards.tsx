import { PanInfo, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface Props {
  data: AppRepo;
  removeCard: any;
  active: boolean;
}

const Card: React.FC<Props> = ({ data, removeCard, active }) => {
  const [leaveX, setLeaveX] = useState(0);
  const [leaveY, setLeaveY] = useState(0);

  const onDragEnd = (_e: any, info: PanInfo) => {
    if (info.offset.y < -100) {
      setLeaveY(-2000);
      removeCard(data, "superlike");
      return;
    }
    if (info.offset.x > 100) {
      setLeaveX(1000);
      removeCard(data, "like");
    }
    if (info.offset.x < -100) {
      setLeaveX(-1000);
      removeCard(data, "nope");
    }
  };
  const classNames = `absolute aspect-[3/4] max-w-lg  w-[90vw] bg-background-focused my-container shadow-xl rounded-2xl flex flex-col justify-center items-center cursor-grab`;

  return (
    <>
      {active ? (
        <motion.div
          drag={true}
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          onDragEnd={onDragEnd}
          initial={{
            scale: 1,
          }}
          animate={{
            scale: 1.05,
            // rotate: `${data?.repo?.name?.length % 2 === 0 ? 6 : -6}deg`,
          }}
          exit={{
            x: leaveX,
            y: leaveY,
            opacity: 0,
            scale: 0.5,
            transition: { duration: 0.2 },
          }}
          className={classNames}
          data-testid="active-card"
        >
          <CardComponent data={data} />
        </motion.div>
      ) : (
        <div className={`${classNames}`}>
          <CardComponent data={data} />
        </div>
      )}
    </>
  );
};

const CardComponent = ({ data }: { data: AppRepo }) => (
  <div className="w-full h-full p-4">
    <div className="mt-5 w-full flex items-center gap-4">
      <Image
        alt="user"
        src={data?.repo?.owner?.avatar_url || "/images/user-placeholder.png"}
        className="w-[100px] md:w-[50px] aspect-square rounded-full"
        width={50}
        height={50}
      />
      <div className="">
        <p className="">@{data?.repo.owner?.login}</p>
      </div>
    </div>
    <div className="mt-6">
      <h1 className="text-2xl font-bold">{data?.repo.name} </h1>
      <p className="text-grayed-out">{data?.repo.description}</p>
    </div>
    <div className="flex items-center space-x-2">
      <div className="text-xs text-gray-500">{data.repo.forks} Forks</div>
      <div className="text-xs text-gray-500">{data.repo.stargazers_count} Stars</div>
      <div className="text-xs text-gray-500">{data.repo.watchers} Watchers</div>
    </div>
    <p className="text-gray-500 text-xs mt-2">{new Date(data.repo.created_at).toDateString().substring(4)}</p>

    <div className="bg-gray-1 w-full h-[1px] mt-4" />
    <div className="flex items-center mt-4 gap-2">
      <p className="font-bold ">Difficulty: </p>
      <div
        className={`text-sm font-medium border-[1px] w-fit ${
          data?.difficulty === "easy"
            ? "text-green-500 border-green-500"
            : data?.difficulty === "medium"
            ? "text-yellow-500 border-yellow-500"
            : "text-red-500 border-red-500"
        } p-1 rounded`}
      >
        {data?.difficulty}
      </div>
    </div>

    <div className="flex items-center mt-4 gap-2 flex-wrap">
      <p className="font-bold ">Tech Stack: </p>
      {data?.technologies.map((item) => (
        <div
          key={item}
          className={`text-sm font-medium border-[1px] w-fit text-grayed-out border-grayed-out p-1 rounded`}
        >
          {item}
        </div>
      ))}
    </div>
    <div className="bg-gray-1 w-full h-[1px] mt-4" />

    <div className="mt-5">
      <p className="font-bold ">Contribution Guidelines</p>
      <p className="text-grayed-out">{data?.contributionGuidelines}</p>
    </div>

    <div className="mt-5">
      <p className="font-bold ">Description</p>
      <p className="text-grayed-out">{data?.description}</p>
    </div>
  </div>
);

export default Card;
