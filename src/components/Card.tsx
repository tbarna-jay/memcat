/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React, { type FC } from "react";

type CardProps = {
  url: string;
  selected: boolean;
  active: boolean;
  onClick: () => void;
  id: string;
};

const Card: FC<CardProps> = ({ url, selected, onClick, active, id }) => {
  return (
    <div
      data-testid={id}
      className={`cell cursor-pointer rounded-lg border border-solid border-x-[#d5dce2] border-b-[#b8c2cc] border-t-[#d5dce2] bg-white ${
        selected ? "selected" : ""
      } ${active ? "active" : ""}`}
      onClick={() => (selected || active ? null : onClick())}
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
      <div className="back face absolute h-full w-full overflow-hidden rounded-lg bg-blue-50">
        <img src="/logo.svg" alt="Logo" />
      </div>
    </div>
  );
};

export default Card;
