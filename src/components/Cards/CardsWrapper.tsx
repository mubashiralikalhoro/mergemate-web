import React from "react";
import { AnimatePresence } from "framer-motion";
import Card from "./Card";

interface Props {
  cards: AppRepo[];
  setCards: React.Dispatch<React.SetStateAction<AppRepo[]>>;
}
const CardsWrapper = ({ cards, setCards }: Props) => {
  const activeIndex = cards.length - 1;

  const removeCard = (id: number, action: "right" | "left") => {
    setCards((prev) => prev.filter((card) => card.repo.id !== id));
    if (action === "right") {
      console.log("Right Swipe");
    } else {
      console.log("Left Swipe");
    }
  };

  return (
    <>
      {cards.length ? (
        cards.map((card, index) => (
          <Card key={card.repo.id} data={card} active={index === activeIndex} removeCard={removeCard} />
        ))
      ) : (
        <h2 className="absolute z-10 text-center text-2xl font-bold text-textGrey ">No more cards to show</h2>
      )}
    </>
  );
};

export default CardsWrapper;
