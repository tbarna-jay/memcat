import React, { type FC } from "react";

type NewGameButtonProps = {
  openModal: () => void;
};

const NewGameButton: FC<NewGameButtonProps> = ({ openModal }) => (
  <button
    type="button"
    className="fixed right-2 top-2 z-0 rounded-md bg-blue-600 p-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-800"
    onClick={openModal}
  >
    New Game
  </button>
);

export default NewGameButton;
