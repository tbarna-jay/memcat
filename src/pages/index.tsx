import Head from "next/head";
import { useEffect } from "react";
import Board from "../components/Board";
import Loading from "../components/Loading";

import Modal from "../components/Modal";
import NewGameButton from "../components/NewGameButton";
import ScoreDisplay from "../components/ScoreDisplay";
import useGameLogic from "../hooks/useGameLogic";
import useImageLoader from "../hooks/useImageLoader";

const apiUrl = process.env.NEXT_PUBLIC_CAT_API_URL ?? "";

export type cardType = {
  url: string;
  active: boolean;
  selected: boolean;
};

export type cardsType = Record<string, cardType>;

export default function Home() {
  const { imageUrls, error, loading, progressText } = useImageLoader(apiUrl);
  const {
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
  } = useGameLogic();

  useEffect(() => {
    if (!error && !loading && imageUrls.length) {
      const cutArray = imageUrls.slice(0, 8);
      setImageUrlsSource([...cutArray, ...cutArray]);
    }
  }, [error, imageUrls, loading]);

  if (loading) return <Loading progressText={progressText} />;
  if (error || !imageUrls || imageUrls.length === 0) return <div>Error</div>;

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
