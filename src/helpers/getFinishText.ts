const getFinishText = (
  userAName: string,
  userBName: string,
  stepsUserA: number,
  stepsUserB: number,
): string => {
  if (!userBName) return "Finish!";
  if (stepsUserA > stepsUserB) return userAName + " Win!";
  if (stepsUserA < stepsUserB) return userBName + " Win!";
  return "Tie!";
};

export default getFinishText;
