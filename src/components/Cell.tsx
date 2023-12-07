import Image from "next/image";
import React, { type FC } from "react";

type CellProps = {
  url: string;
  active: boolean;
  onClick: () => void;
};

const Cell: FC<CellProps> = ({ url, active, onClick }) => {
  return (
    <div
      className={`cell cursor-pointer rounded-lg border border-solid border-x-[#d5dce2] border-b-[#b8c2cc] border-t-[#d5dce2] bg-white ${
        active ? "active" : ""
      }`}
      onClick={() => onClick()}
    >
      <div className="face absolute h-full w-full overflow-hidden rounded-lg">
        <Image
          className="h-full w-full object-cover"
          src={url}
          alt="cat image"
          width={300}
          height={300}
          unoptimized
        />
      </div>
      <div className="back face absolute h-full w-full overflow-hidden rounded-lg bg-[#f5f5dc]"></div>
    </div>
  );
};

export default Cell;
