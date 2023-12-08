/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { useEffect, useState } from "react";
import Board from "~/components/Board";

import Modal from "~/components/Modal";
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
  const [stepsUserA, setStepUserA] = useState(0);
  const [stepsUserB, setStepUserB] = useState(0);
  const [activeUser, setActiveUser] = useState<"userA" | "userB">("userA");
  const [userAName, setUserAName] = useState("");
  const [userBName, setUserBName] = useState("");
  const [cards, setCards] = useState<cardsType>({});
  const [activeCards, setActiveCards] = useState<cardsType>({});
  const { imageUrls, error, loading } = useImageLoader(apiUrl);

  const [isOpen, setIsOpen] = useState(true);
  const openModal = () => {
    setIsOpen(true);
  };

  const startNewGame = () => {
    setActiveUser("userA");
    setIsOpen(false);
    resetGame();
  };

  useEffect(() => {
    console.log("activeCards effect", activeCards);
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
      }),
        setActiveCards({});
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
        <button
          type="button"
          className="fixed right-2 top-2 z-0 rounded-md bg-blue-600 p-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-800"
          onClick={openModal}
        >
          New Game
        </button>
        <Modal
          startNewGame={startNewGame}
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
