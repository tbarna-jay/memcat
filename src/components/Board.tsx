import React, { type FC } from "react";
import type { cardType, cardsType } from "~/pages";
import Card from "~/components/Card";

type BoardProps = {
  cards: cardsType;
  isOpen: boolean;
  onActivateCard: (id: string, card: cardType) => void;
};

const Board: FC<BoardProps> = ({ cards, isOpen, onActivateCard }) => (
  <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center ">
    <div
      className={`${
        isOpen ? "perspective-10000" : "perspective-1000"
      } relative flex h-0 w-full flex-col items-center justify-center gap-12 pb-[100%] transition-[perspective]`}
    >
      <div className="gametable absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center">
        <div className="grid h-4/5 w-4/5 grid-cols-4 grid-rows-4 gap-[3%]">
          {Object.entries(cards).map(([id, card]) => (
            <Card
              key={id}
              url={card.url}
              selected={card.selected}
              active={card.active}
              onClick={() => onActivateCard(id, card)}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Board;
