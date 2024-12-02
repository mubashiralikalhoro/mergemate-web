import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Card from "@/components/Cards/SwipeCards";
import AppLayout from "@/components/layout/AppLayout";
import useScrollController from "@/hooks/useScrollController";
import { IoReload } from "react-icons/io5";
import { getAppRepoFromApi } from "@/utils/api-helpers";
import Loader from "@/components/Global/Loader";
import { NextPageContext } from "next";
import getSession from "@/utils/getServerSession";
import { toAuthPage } from "@/utils";

const Home = () => {
  const [cards, setCards] = useState<AppRepo[]>([]);

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getAppRepoFromApi({
      limit: 20,
      page: 1,
    })
      .then((res) => {
        setCards((cards) => [...cards, ...res.repos]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const [history, setHistory] = useState<any[]>([]);
  const activeIndex = cards.length - 1;
  const removeCard = (oldCard: AppRepo, swipe: SwipeType) => {
    console.log("swipe", swipe, oldCard);
    setHistory((current) => [...current, { ...oldCard, swipe }]);
    setCards((current) =>
      current.filter((card) => {
        return card._id !== oldCard._id;
      })
    );
  };
  const undoSwipe = () => {
    const newCard = history.pop();
    if (newCard) {
      const { swipe } = newCard;
      setHistory((current) =>
        current.filter((card) => {
          return card._id !== newCard._id;
        })
      );
      setCards((current) => [...current, newCard]);
    }
  };

  useScrollController(false);

  return (
    <div className="relative flex flex-col justify-center items-center w-full h-[90dvh] gradient ">
      <AnimatePresence>
        {isLoading ? (
          <Loader className="text-7xl" />
        ) : (
          cards.map((card, index) => (
            <Card key={index} active={index === activeIndex} removeCard={removeCard} data={card} />
          ))
        )}
      </AnimatePresence>
      {cards.length === 0 && !isLoading ? <span className="text-white text-xl">End of Stack</span> : null}
      <footer className="absolute bottom-4 flex items-center space-x-4">
        {!isLoading && (
          <div className="flex flex-col items-center space-y-2">
            <button
              disabled={history.length === 0}
              className="w-14 h-14 rounded-full  bg-grayed-out inline-flex justify-center items-center disabled:cursor-not-allowed"
              onClick={undoSwipe}
              data-testid="undo-btn"
              aria-label="Undo Swipe"
            >
              <IoReload className="text-3xl text-background" />
            </button>
            <span className="text-xs text-white">Undo</span>
          </div>
        )}
      </footer>
    </div>
  );
};

Home.Layout = AppLayout;
export default Home;

export const getServerSideProps = async (context: NextPageContext) => {
  const { authenticated } = await getSession(context);

  if (!authenticated) {
    return toAuthPage;
  }

  return {
    props: {},
  };
};
