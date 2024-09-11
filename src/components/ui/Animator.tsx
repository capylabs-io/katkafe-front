import React, { useCallback, useEffect, useState } from "react";
import classNames from "classnames";

type Props = {
  width: number;
  height: number;
  steps?: number;
  url?: string;
  fps?: number;
  onClick?: () => void;
};

export const Animator: React.FC<Props> = ({
  width,
  height,
  url,
  steps,
  fps = 24,
  onClick,
}) => {
  const [pos, setPos] = useState(0);

  const handleChangeSprite = useCallback(() => {
    let newPos = pos + width;
    if (newPos >= steps! * width) {
      newPos = 0;
    }
    setPos(newPos);
  }, [pos, steps, width]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleChangeSprite();
    }, 1000 / fps);
    return () => clearInterval(interval);
  }, [fps, handleChangeSprite]);

  return (
    url && (
      <div
        className={classNames(
          "overflow-hidden z-10",
          onClick && "cursor-pointer"
        )}
        style={{
          width: `${width}px`,
          height: `${height}px`,
        }}
        onClick={onClick}
      >
        <img
          style={{ transform: `translateX(-${pos}px)` }}
          className="h-full max-w-max"
          height={height}
          src={url}
          alt="gif"
        />
      </div>
    )
  );
};
