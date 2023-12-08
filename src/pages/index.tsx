/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { useEffect, useState } from "react";
import Board from "~/components/Board";

import Modal from "~/components/Modal";
import NewGameButton from "~/components/NewGameButton";
import ScoreDisplay from "~/components/ScoreDisplay";
import shuffleArray from "~/helpers/shuffleArray";
import useImageLoader from "~/hooks/useImageLoader";

const apiUrl = process.env.NEXT_PUBLIC_CAT_API_URL ?? "";

export type cardType = {
  url: string;
  active: boolean;
  selected: boolean;
};

export type cardsType = Record<string, cardType>;

export default function Home() {
  const [pointsUserA, setStepUserA] = useState(0);
  const [pointsUserB, setStepUserB] = useState(0);
  const [activeUser, setActiveUser] = useState<"userA" | "userB">("userA");
  const [userAName, setUserAName] = useState("");
  const [userBName, setUserBName] = useState("");
  const [cards, setCards] = useState<cardsType>({});
  const [finish, setFinish] = useState(false);
  const [activeCards, setActiveCards] = useState<cardsType>({});
  const { imageUrls, error, loading } = useImageLoader(apiUrl);

  const [isOpen, setIsOpen] = useState(true);
  const openModal = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    if (Object.values(cards).every(({ selected }) => selected)) setFinish(true);
  }, [cards]);

  useEffect(() => {
    if (Object.keys(activeCards).length) evaluate();
  }, [activeCards]);

  if (loading)
    return (
      <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center">
        <div className="text-textColor/[.2] h-10 w-10 transition">
          <img src="/logo.svg" alt="Logo" />
        </div>
      </div>
    );
  if (error || !imageUrls || imageUrls.length === 0) return <div>Error</div>;

  const resetGame = () => {
    setActiveUser("userA");
    setIsOpen(false);
    setStepUserA(0);
    setStepUserB(0);
    setFinish(false);
    const cutArray = imageUrls.slice(0, 8);
    setCards(
      shuffleArray([...cutArray, ...cutArray]).reduce((prev, url) => {
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

  return (
    <>
      <Head>
        <title>MemCat game</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative h-screen  w-screen bg-blue-300">
        <Board cards={cards} isOpen={isOpen} onActivateCard={onActivateCard} />
        <ScoreDisplay
          stepsUserA={pointsUserA}
          stepsUserB={pointsUserB}
          userAName={userAName}
          userBName={userBName}
          activeUser={activeUser}
          isOpen={isOpen}
          finish={finish}
        />
        <NewGameButton openModal={openModal} />
        <Modal
          startNewGame={resetGame}
          isOpen={isOpen}
          userAName={userAName}
          userBName={userBName}
          setUserAName={setUserAName}
          setUserBName={setUserBName}
        />
      </main>
    </>
  );
}
