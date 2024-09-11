import React from "react";
import Button from "../Button";

type Props = {
  onCancel?: () => void;
  onAgree?: () => void;
  title?: string
  content?: React.ReactNode
};

function ConfirmDialog({ onCancel, onAgree, title, content }: Props) {
  return (
    <>
      <div
        className="bg-[#807f76] opacity-70 absolute w-[384px] h-[608px] items-center flex justify-center top-0 left-0 !z-30"
        onClick={onCancel}
      ></div >
      <div className="bg-orange-10 absolute rounded-2xl w-[95%] text-center p-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 !z-40">
        <div className="text-xl">{title}</div>
        <div className="text-lg text-gray-30 mb-2">
          {content}
        </div>
        <div className="flex flex-wrap gap-2 justify-center border-[#E8DDBD] border-t py-3 mt-6">
          <div className="w-[164px] h-[39px]" onClick={onCancel}>
            <Button>Cancel</Button>
          </div>

          <div className="w-[164px] h-[39px]" onClick={onAgree}>
            <Button>OK</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConfirmDialog;
