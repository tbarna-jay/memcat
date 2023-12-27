import React, { type FC, type Dispatch } from "react";
import type { cardsType } from "../pages";
import Card from "../components/Card";
import type { CommonActionType } from "../hooks/useGameLogic";

type BoardProps = {
  cards: cardsType;
  isOpen: boolean;
  dispatch: Dispatch<CommonActionType>;
};

const Board: FC<BoardProps> = ({ cards, isOpen, dispatch }) => (
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
              id={id}
              url={card.url}
              selected={card.selected}
              active={card.active}
              onClick={() =>
                dispatch({ type: "SET_ACTIVE_CARD", payload: { card, id } })
              }
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Board;
