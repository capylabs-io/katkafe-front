import React from "react";
import Image from "next/image";
import { get } from "lodash";
import { Friend } from "@/types/friend";

type Props = {
  friend: Friend | any;
};

const CardFriend = ({ friend }: Props) => {
  const id = get(friend, "id", "");
  const imageUrl = get(friend, "imageUrl", "");
  const name = get(friend, "name", "");
  const totalFriend = get(friend, "totalFriend", 0);
  const balance = get(friend, "balance", 0);

  return (
    <div className="w-full h-full p-2 pl-4 flex gap-8 items-center justify-between">
      <div className="flex gap-2 items-center text-center">
        <div>{id}</div>
        <div className="rounded-full w-6 h-6">
          <Image src={imageUrl} alt="cat pic" width={24} height={24} />
        </div>
        <div>{name}</div>
      </div>
      <div className="flex items-center gap-1">
        <div>{balance}M</div>
        <div className="w-4 h-4">
          <img src="/images/kbuck.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default CardFriend;
