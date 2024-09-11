import React from "react";
import Image from "next/image";
import Button from "./Button";
import { get } from "lodash";
import { Bundle } from "@/types/bundle";

type Props = {
  bundle: Bundle;
  handleClick?: (bundle: Bundle) => void;
};

const BundleCard = ({ bundle, handleClick }: Props) => {
  const imageUrl = get(bundle, "imageUrl", "");
  const name = get(bundle, "name", "");
  const price = get(bundle, "price", 0);
  const items = get(bundle, "items", []);

  return (
    <div
      className="bg-[#f4f2d6] rounded-lg w-full h-full p-3 flex gap-8 items-center"
      onClick={() => handleClick?.(bundle)}
    >
      <div className="flex gap-1">
        {items.map((item, index) => (
          <>
            <div
              key={index}
              className="w-[64px] h-[74px] bg-[#4E322F] p-1 rounded-lg"
            >
              <div className="bg-[#FFFEEC] flex items-center justify-center w-[56px] h-[48px] rounded-md">
                <Image
                  src={get(item, "imageUrl", "")}
                  alt={""}
                  width={28}
                  height={28}
                />
              </div>
              <div className="text-center text-white">
                {get(item, "value", "")}
              </div>
            </div>
          </>
        ))}
      </div>

      <div className="flex flex-col gap-4 items-center text-center">
        <div>{name}</div>
        <div className="w-[88px] h-[30px] bg-[#fffde9] rounded-2xl">
          <Button>{price} $</Button>
        </div>
      </div>
    </div>
  );
};

export default BundleCard;
