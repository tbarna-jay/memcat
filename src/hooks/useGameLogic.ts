import { useEffect, useReducer } from "react";
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
  cards: cardsType;
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
  cards: {} as cardsType,
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
    | "SET_ACTIVE_CARD"
    | "RESET_ACTIVE_CARD"
    | "SET_CARDS"
    | "FINISH";
  payload?: {
    card?: cardType;
    cards?: cardsType;
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
        cards: shuffleArray(state.imageUrlsSources).reduce((prev, url) => {
          prev[Math.random()] = {
            url,
            active: false,
            selected: false,
          };
          return prev;
        }, {} as cardsType),
      };
    case "SET_USER_A_NAME":
      return { ...state, userAName: String(action.payload?.userName) };
    case "SET_USER_B_NAME":
      return { ...state, userBName: String(action.payload?.userName) };
    case "TOGGLE_ACTIVE_USER":
      if (!state.userAName || !state.userBName || !action.payload?.match)
        return state;
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
    case "SET_ACTIVE_CARD":
      if (!action?.payload?.card || !action?.payload?.id) return state;
      if (Object.keys(state.activeCards).length >= 2) return state;
      const activeCard = {
        [action?.payload?.id]: {
          ...action?.payload?.card,
          active: true,
        },
      };
      return {
        ...state,
        cards: { ...state.cards, ...activeCard },
        activeCards: {
          ...state.activeCards,
          ...activeCard,
        },
      };
    case "RESET_ACTIVE_CARD":
      return {
        ...state,
        activeCards: {},
      };
    case "SET_CARDS":
      return {
        ...state,
        cards: {
          ...state.cards,
          ...(action?.payload?.cards ?? {}),
        },
      };
    default:
      return state;
  }
};

const useGameLogic = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (Object.values(state.cards).every(({ selected }) => selected))
      dispatch({ type: "FINISH" });
  }, [state.cards]);

  useEffect(() => {
    if (Object.keys(state.activeCards).length) evaluate();
  }, [state.activeCards]);

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
      dispatch({
        type: "SET_CARDS",
        payload: {
          cards: {
            ...{
              [id1]: { ...card1, active: false, selected },
              [id2]: { ...card2, active: false, selected },
            },
          },
        },
      });
      dispatch({ type: "RESET_ACTIVE_CARD" });
      dispatch({ type: "INCREASE_USER_POINT", payload: { match: selected } });
      dispatch({ type: "TOGGLE_ACTIVE_USER", payload: { match: selected } });
    }, 400);
  };

  return {
    state,
    dispatch,
  };
};

export default useGameLogic;
