import React, { useMemo } from "react";
import Image from "next/image";
import Button from "./Button";
import { DEFAULT_QUEST_ICON } from "@/constants/config";
import { Check } from "lucide-react";
import Link from "next/link";

type Props = {
  type: "achievement" | "task";
  content: string;
  img: {
    imgUrl?: string;
    width: number;
    height: number;
  };
  reward: {
    type: "cat" | "token";
    quantity: number | string;
  };
  button?: {
    text: string;
    onClick?: Function;
    disabled?: boolean;
  };
  progress?: {
    current: number | string;
    total: number | string;
  };
  isDone?: boolean;
  visitUrl?: string;
};

const CardTask = ({
  type,
  content,
  img,
  reward,
  button,
  progress,
  isDone,
  visitUrl,
}: Props) => {
  const isAchievement = useMemo(() => type === "achievement", [type]);

  return (
    <div className="bg-[#fffffa] border-black border rounded-lg w-full h-full px-2 py-3">
      <div className="flex flex-col">
        <div className="flex justify-between mb-1">
          <div className="rounded-full w-6 h-6">
            <Image
              src={img.imgUrl || DEFAULT_QUEST_ICON}
              alt="quest-icon"
              width={img.width}
              height={img.height}
            />
          </div>
          <div className="flex items-center gap-1">
            <div className="text-gray-30">{reward.quantity}</div>
            {reward.type === "token" && (
              <div className="w-4 h-4">
                <img src="/images/coin.png" alt="" />
              </div>
            )}
          </div>
        </div>
        <div>
          {content}
          {isAchievement && (
            <span>
              : {progress?.current || 0}/{progress?.total || 0}
            </span>
          )}
        </div>
      </div>
      {isAchievement && (
        <Image
          src="/images/Progress-Bar.png"
          alt="progress"
          width={304}
          height={12}
          className="rounded-[100px]"
        />
      )}
      <div className="w-full flex justify-center mt-2">
        <div className="w-[150px] h-[28px] flex justify-center gap-x-4">
          {visitUrl && (
            <Button onClick={() => window.open(visitUrl, "_blank")}>
              Visit
            </Button>
          )}
          {!isDone == true ? (
            <Button
              onClick={button?.onClick}
              disabled={button?.disabled}
              customClassNames="max-w-[74px]"
            >
              {button?.text}
            </Button>
          ) : (
            <div className="text-orange-50 flex gap-x-1">
              <Check size={24} />
              Done
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardTask;
