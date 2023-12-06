import React, { useState, type FC } from "react";

type CellProps = {
  id: number;
};

const Cell: FC<CellProps> = ({}) => {
  const [active, setActive] = useState(false);
  return (
    <div
      className={`cell ${active ? "active" : ""}`}
      onClick={() => setActive(true)}
    >
      <div className="front face"></div>
      <div className="back face"></div>
    </div>
  );
};

export default Cell;
