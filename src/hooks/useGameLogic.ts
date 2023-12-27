import { useEffect, useReducer, useState } from "react";
import shuffleArray from "../helpers/shuffleArray";
import type { cardType, cardsType } from "../pages";

export enum activeUserType {
  A,
  B,
}

interface InitialStateType {
  pointsUserA: number;
  pointsUserB: number;
  userAName: string;
  userBName: string;
  activeUser: activeUserType;
  isOpen: boolean;
}

const initialState: InitialStateType = {
  pointsUserA: 0,
  pointsUserB: 0,
  userAName: "",
  userBName: "",
  activeUser: activeUserType.A,
  isOpen: true,
};

export type CommonActionType = {
  type:
    | "INCREASE_USER_POINT"
    | "START_NEW_GAME"
    | "SET_USER_A_NAME"
    | "SET_USER_B_NAME"
    | "TOGGLE_ACTIVE_USER"
    | "TOGGLE_OPEN";

  payload?: string | boolean;
};

const reducer = (state: InitialStateType, action: CommonActionType) => {
  switch (action.type) {
    case "INCREASE_USER_POINT":
      const isAlone = !state.userBName;
      if (isAlone) return { ...state, pointsUserA: state.pointsUserA + 1 };
      if (!action.payload) return state;
      if (state.activeUser === activeUserType.A) {
        return { ...state, pointsUserA: state.pointsUserA + 1 };
      }
      return { ...state, pointsUserB: state.pointsUserB + 1 };
    case "START_NEW_GAME":
      return {
        ...state,
        isOpen: false,
        activeUser: activeUserType.A,
        pointsUserA: 0,
        pointsUserB: 0,
      };
    case "SET_USER_A_NAME":
      return { ...state, userAName: String(action.payload) };
    case "SET_USER_B_NAME":
      return { ...state, userBName: String(action.payload) };
    case "TOGGLE_ACTIVE_USER":
      return {
        ...state,
        activeUser:
          state.activeUser === activeUserType.A
            ? activeUserType.B
            : activeUserType.A,
      };
    case "TOGGLE_OPEN":
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    default:
      return state;
  }
};

const useGameLogic = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [cards, setCards] = useState<cardsType>({});
  const [finish, setFinish] = useState(false);
  const [activeCards, setActiveCards] = useState<cardsType>({});
  const [imageUrlsSource, setImageUrlsSource] = useState<string[]>([]);

  useEffect(() => {
    if (Object.values(cards).every(({ selected }) => selected)) setFinish(true);
  }, [cards]);

  useEffect(() => {
    if (Object.keys(activeCards).length) evaluate();
  }, [activeCards]);

  const startNewGame = () => {
    dispatch({ type: "START_NEW_GAME" });
    setFinish(false);
    setCards(
      shuffleArray(imageUrlsSource).reduce((prev, url) => {
        prev[Math.random()] = {
          url,
          active: false,
          selected: false,
        };
        return prev;
      }, {} as cardsType),
    );
  };

  const isCard = (obj: unknown): obj is cardType =>
    typeof obj === "object" && obj !== null && "url" in obj;

  const evaluate = () => {
    const [card1, card2] = Object.values(activeCards);
    const [id1, id2] = Object.keys(activeCards);

    if (
      !isCard(card1) ||
      !isCard(card2) ||
      typeof id1 !== "string" ||
      typeof id2 !== "string"
    ) {
      return;
    }

    let selected = false;
    if (card1.url === card2.url) {
      selected = true;
    }

    setTimeout(() => {
      setCards({
        ...cards,
        ...{
          [id1]: { ...card1, active: false, selected },
          [id2]: { ...card2, active: false, selected },
        },
      });
      setActiveCards({});
      dispatch({ type: "INCREASE_USER_POINT", payload: selected });
      if (state.userAName && state.userBName && !selected) {
        dispatch({ type: "TOGGLE_ACTIVE_USER" });
      }
    }, 400);
  };

  const onActivateCard = (id: string, card: cardType) => {
    if (Object.keys(activeCards).length >= 2) return;
    setCards((_cards) => {
      _cards[id] = { ...card, active: true };
      return _cards;
    });
    return setActiveCards((actives) => ({ ...actives, [id]: card }));
  };

  return {
    state,
    dispatch,
    cards,
    onActivateCard,
    finish,
    startNewGame,
    openModal: () => dispatch({ type: "TOGGLE_OPEN" }),
    setImageUrlsSource,
  };
};

export default useGameLogic;
