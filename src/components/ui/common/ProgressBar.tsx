import React from 'react'

type Props = {
  progress: number
}
export const ProgressBar = ({ progress }: Props) => {
  return (
    <div className={`w-full bg-orange-20 rounded-full h-[12px] drop-shadow-xl animate-pulse`}>
      <div
        className={`bg-[#FC9B53] rounded-full h-[12px] w-[50%]`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
