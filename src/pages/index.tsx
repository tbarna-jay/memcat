import Head from "next/head";
import Cell from "~/components/cell/cell";

export default function Home() {
  const cellArray = Array.from({ length: 16 }, (_, index) => index);

  return (
    <>
      <Head>
        <title>MemCat game</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen  w-screen">
        <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center ">
          <div className="gametable-wrapper flex h-screen w-screen flex-col items-center justify-center gap-12">
            <div className="gametable flex items-center justify-center">
              <div className="grid h-4/5 w-4/5 grid-cols-4 grid-rows-4 gap-4">
                {cellArray.map((key) => (
                  <Cell key={key} id={key} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
