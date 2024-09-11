import React from "react";
import Image from "next/image";
import Button from "./Button";

type Props = {
  onUnlock?: () => void;
};

const UnlockRestaurantCard = ({ onUnlock }: Props) => {
  const handleClick = () => {
    onUnlock?.();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div>
        <Image src={"/images/unlock.png"} alt={""} width={24} height={32} />
      </div>
      <div className="max-w-[180px] text-center">
        Fufill the requirement to unlock this shop
      </div>
      <div className="w-[156px] h-[36px]" onClick={handleClick}>
        <Button>Unlock</Button>
      </div>
    </div>
  );
};

export default UnlockRestaurantCard;
