import React from "react";
import Button from "./Button";

type Props = {
  handleClick?: () => void;
  onClose?: () => void;
};

const ConfirmDialog: React.FC<Props> = ({ handleClick, onClose }: Props) => {
  const handleBack = () => {
    onClose?.();
  };
  return (
    <div className="bg-orange-10 absolute rounded-2xl w-[95%] text-center pt-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
      <div className="text-bodyXl">Caution, bro &gt; 3 &lt; </div>
      <div className="text-bodyLg text-gray-30 mb-2 px-4">
        You’re about to remove all your staffs. Are you sure?
      </div>

      <div className="flex flex-wrap gap-2 justify-center border-[#E8DDBD] border-t py-3 mt-6">
        <div className="w-[164px] h-[39px]" onClick={handleClick}>
          <Button>Remove All</Button>
        </div>

        <div className="w-[164px] h-[39px]" onClick={handleBack}>
          <Button>Not now</Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
