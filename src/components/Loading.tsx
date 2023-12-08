/* eslint-disable @next/next/no-img-element */
import React, { type FC } from "react";

const Loading: FC<{ progressText: string }> = ({ progressText }) => {
  return (
    <div className="fixed left-0 top-0 flex h-full w-full flex-col items-center justify-center">
      <div className="text-textColor/[.2] h-10 w-10 transition">
        <img src="/logo.svg" alt="Logo" />
      </div>
      <div>{progressText}</div>
    </div>
  );
};

export default Loading;
