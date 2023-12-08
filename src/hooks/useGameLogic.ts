import { useEffect, useState } from "react";
import shuffleArray from "../helpers/shuffleArray";
import type { cardType, cardsType } from "../pages";

const useGameLogic = () => {
  const [pointsUserA, setStepUserA] = useState(0);
  const [pointsUserB, setStepUserB] = useState(0);
  const [activeUser, setActiveUser] = useState<"userA" | "userB">("userA");
  const [userAName, setUserAName] = useState("");
  const [userBName, setUserBName] = useState("");
  const [cards, setCards] = useState<cardsType>({});
  const [finish, setFinish] = useState(false);
  const [activeCards, setActiveCards] = useState<cardsType>({});
  const [isOpen, setIsOpen] = useState(true);
  const [imageUrlsSource, setImageUrlsSource] = useState<string[]>([]);

  const openModal = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    if (Object.values(cards).every(({ selected }) => selected)) setFinish(true);
  }, [cards]);

  useEffect(() => {
    if (Object.keys(activeCards).length) evaluate();
  }, [activeCards]);

  const resetGame = () => {
    setActiveUser("userA");
    setIsOpen(false);
    setStepUserA(0);
    setStepUserB(0);
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

  const countSteps = (match: boolean) => {
    const isAlone = !userBName;
    if (isAlone) return setStepUserA((steps) => steps + 1);
    if (!match) return;
    const isActiveUserA = activeUser === "userA";
    isActiveUserA
      ? setStepUserA((steps) => steps + 1)
      : setStepUserB((steps) => steps + 1);
  };

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
      countSteps(selected);
      if (userAName && userBName && !selected) {
        setActiveUser((activeUser) =>
          activeUser === "userA" ? "userB" : "userA",
        );
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
    cards,
    onActivateCard,
    pointsUserA,
    pointsUserB,
    userAName,
    userBName,
    activeUser,
    finish,
    resetGame,
    setUserAName,
    setUserBName,
    isOpen,
    openModal,
    setImageUrlsSource,
  };
};

export default useGameLogic;
