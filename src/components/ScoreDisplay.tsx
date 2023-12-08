import React, { type FC } from "react";

type ScoreDisplayProps = {
  stepsUserA: number;
  stepsUserB: number;
  userAName: string;
  userBName: string;
  isOpen: boolean;
  finish: boolean;
  activeUser: "userA" | "userB";
};

const getFinishText = (
  userAName: string,
  userBName: string,
  stepsUserA: number,
  stepsUserB: number,
) => {
  if (!userBName) return "Finish!";
  if (stepsUserA > stepsUserB) return userAName + " Win!";
  if (stepsUserA < stepsUserB) return userBName + " Win!";
  return "Tie!";
};

const ScoreDisplay: FC<ScoreDisplayProps> = ({
  stepsUserA,
  stepsUserB,
  userAName,
  userBName,
  isOpen,
  activeUser,
  finish,
}) =>
  isOpen ? null : (
    <div className="fixed left-3 top-3 flex">
      <div className="">
        <div className="flex justify-between rounded-lg bg-white px-4 py-2 shadow">
          <div className="flex items-center">
            <h2 className="mr-1 text-lg font-semibold">{userAName}: </h2>
          </div>
          <div className="flex items-center">
            <h2 className="font-semibd mr-4 text-lg">
              {" "}
              {stepsUserA} {userBName ? "score" : "steps"}
            </h2>
            {activeUser === "userA" && userBName && (
              <div className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                Active
              </div>
            )}
          </div>
        </div>
      </div>
      {!!userBName && (
        <div className="ml-2">
          <div className="flex justify-between rounded-lg bg-white px-4 py-2 shadow">
            <div className="flex items-center">
              {activeUser === "userB" && (
                <div className="mr-2 inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                  Active
                </div>
              )}
              <h2 className="mr-1 text-lg font-semibold">{userBName}: </h2>
            </div>
            <div className="flex items-center">
              <h2 className="mr-4 text-lg ">{stepsUserB} steps</h2>
            </div>
          </div>
        </div>
      )}
      {!!finish && (
        <div className="ml-2">
          <div className="flex justify-between rounded-lg bg-white px-4 py-2 shadow">
            <div className="flex items-center">
              <h2 className="mr-1 text-lg font-semibold">
                {getFinishText(userAName, userBName, stepsUserA, stepsUserB)}
              </h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );

export default ScoreDisplay;
