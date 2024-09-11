import React from "react";
import Image from "next/image";
import { get } from "lodash";
import { Guild } from "@/types/guild";
import { ChevronRight } from "lucide-react";

type Props = {
  guild: Guild;
};

const CardGuild = ({ guild }: Props) => {
  const imageUrl = get(guild, "imageUrl", "");
  const backgroundUrl = get(guild, "backgroundUrl", "");
  const title = get(guild, "title", "");
  const rank = get(guild, "rank", 0);

  return (
    <div className="w-full h-full p-2 flex items-center gap-1 justify-between">
      <div className="flex">
        <Image src={backgroundUrl} alt="cat pic" width={48} height={48}></Image>
        <div>
          <div className="flex gap-2">
            <div>{title}</div>
          </div>
          <div className="flex items-center gap-1">
            <Image src={imageUrl} alt="cat pic" width={16} height={16} />
            <div className="capitalize">{rank}</div>
          </div>
        </div>
      </div>

      <div>
        <ChevronRight />
      </div>
    </div>
  );
};

export default CardGuild;
