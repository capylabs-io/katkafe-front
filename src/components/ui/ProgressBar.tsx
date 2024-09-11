import React from "react";
import classNames from "classnames";

type ProgressProps = {
  value: number;
  max: number;
  className?: string;
  color?: string;
};

const Progress: React.FC<ProgressProps> = ({
  value,
  max,
  className,
  color,
}) => {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div
      className={classNames(
        "w-full rounded-[100px] border-t-2 bg-[#EEEDD8] border-t-[#d6d5c2] h-full",
        className
      )}
    >
      <div
        className="h-full rounded-l-[100px] border-b-2 border-[#e38b4b]"
        style={{ width: `${percentage}%`, backgroundColor: color }}
      />
    </div>
  );
};

export default Progress;
