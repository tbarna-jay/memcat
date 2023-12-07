import Head from "next/head";
import Cell from "~/components/Cell";
import useImageLoader from "~/hooks/useImageLoader";

const apiUrl = process.env.NEXT_PUBLIC_CAT_API_URL ?? "";

function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j] as T, array[i] as T];
  }
  return array;
}

export default function Home() {
  const { data, error, loading } = useImageLoader(apiUrl);

  if (loading) <div>Loading ...</div>;
  if (error || data) <div>Error</div>;
  const cutArray = data.slice(0, 8);
  const shuffledImageArray = shuffle([...cutArray, ...cutArray]);

  const onClick = (cellIndex: number) => {
    console.log(cellIndex);
  };

  return (
    <>
      <Head>
        <title>MemCat game</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen  w-screen">
        <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center ">
          <div className="gametable-wrapper relative flex h-0 w-full flex-col items-center justify-center gap-12 pb-[100%]">
            <div className="gametable absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center">
              <div className="grid h-4/5 w-4/5 grid-cols-4 grid-rows-4 gap-4">
                {shuffledImageArray.map(({ url }, index) => (
                  <Cell
                    key={url + index}
                    url={url}
                    active={false}
                    onClick={() => onClick(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
