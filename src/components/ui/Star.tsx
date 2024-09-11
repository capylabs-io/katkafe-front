import React from "react";

type StarProps = {
  isHollow: boolean;
  customClass: string;
};

const Star: React.FC<StarProps> = ({ isHollow, customClass }) => {
  if (isHollow) {
    return (
      <div className={customClass}>
        <div className="bg-[url('/images/hollow-star.png')] w-full h-full bg-no-repeat bg-cover"></div>
      </div>
    );
  } else {
    return (
      <div className={customClass}>
        <div className="bg-[url('/images/Star.png')] w-full h-full bg-no-repeat bg-cover"></div>
      </div>
    );
  }
};

export default Star;
