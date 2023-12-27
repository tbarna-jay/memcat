import { useEffect, useReducer, useState } from "react";
import shuffleArray from "../helpers/shuffleArray";
import type { cardType, cardsType } from "../pages";

export enum activeUserType {
  A,
  B,
}

type imageUrlsSourcesType = string[];

interface StateType {
  pointsUserA: number;
  pointsUserB: number;
  userAName: string;
  userBName: string;
  activeUser: activeUserType;
  isOpen: boolean;
  finish: boolean;
  imageUrlsSources: imageUrlsSourcesType;
  activeCards: cardsType;
}

const initialState: StateType = {
  pointsUserA: 0,
  pointsUserB: 0,
  userAName: "",
  userBName: "",
  activeUser: activeUserType.A,
  isOpen: true,
  finish: false,
  imageUrlsSources: [],
  activeCards: {} as cardsType,
};

export type CommonActionType = {
  type:
    | "INCREASE_USER_POINT"
    | "START_NEW_GAME"
    | "SET_USER_A_NAME"
    | "SET_USER_B_NAME"
    | "TOGGLE_ACTIVE_USER"
    | "TOGGLE_OPEN"
    | "SET_IMAGE_SOURCES"
    | "SET_ACTIVE_CARDS"
    | "FINISH";
  payload?: {
    card?: cardType;
    images?: imageUrlsSourcesType;
    userName?: string;
    match?: boolean;
    id?: string;
  };
};

const reducer = (state: StateType, action: CommonActionType): StateType => {
  switch (action.type) {
    case "INCREASE_USER_POINT":
      const isAlone = !state.userBName;
      if (isAlone) return { ...state, pointsUserA: state.pointsUserA + 1 };
      if (!action.payload?.match) return state;
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
        finish: false,
      };
    case "SET_USER_A_NAME":
      return { ...state, userAName: String(action.payload?.userName) };
    case "SET_USER_B_NAME":
      return { ...state, userBName: String(action.payload?.userName) };
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
    case "FINISH":
      return {
        ...state,
        finish: true,
      };
    case "SET_IMAGE_SOURCES":
      return {
        ...state,
        imageUrlsSources:
          action.payload?.images ?? ([] as imageUrlsSourcesType),
      };
    case "SET_ACTIVE_CARDS":
      const card =
        action?.payload?.id && action?.payload?.card
          ? { [action?.payload?.id || ""]: action?.payload?.card }
          : {};
      return {
        ...state,
        activeCards: {
          ...state.activeCards,
          ...card,
        },
      };
    default:
      return state;
  }
};

const useGameLogic = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [cards, setCards] = useState<cardsType>({});

  useEffect(() => {
    if (Object.values(cards).every(({ selected }) => selected))
      dispatch({ type: "FINISH" });
  }, [cards]);

  useEffect(() => {
    if (Object.keys(state.activeCards).length) evaluate();
  }, [state.activeCards]);

  const startNewGame = () => {
    dispatch({ type: "START_NEW_GAME" });
    setCards(
      shuffleArray(state.imageUrlsSources).reduce((prev, url) => {
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
    const [card1, card2] = Object.values(state.activeCards);
    const [id1, id2] = Object.keys(state.activeCards);

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
      dispatch({ type: "SET_ACTIVE_CARDS" });
      dispatch({ type: "INCREASE_USER_POINT", payload: { match: selected } });
      if (state.userAName && state.userBName && !selected) {
        dispatch({ type: "TOGGLE_ACTIVE_USER" });
      }
    }, 400);
  };

  const onActivateCard = (id: string, card: cardType) => {
    if (Object.keys(state.activeCards).length >= 2) return;
    setCards((_cards) => {
      _cards[id] = { ...card, active: true };
      return _cards;
    });
    dispatch({ type: "SET_ACTIVE_CARDS", payload: { card, id } });
  };

  return {
    state,
    dispatch,
    cards,
    onActivateCard,
    startNewGame,
  };
};

export default useGameLogic;
