import React from "react";
import Button from "@/components/ui/Button";
import CatCard from "@/components/ui/CatCard";
import { Staff } from "@/types/common-types";
import { ChevronsRightIcon } from "lucide-react";

type Props = {
  onClose?: () => void;
  receiver: Staff;
  origin: Staff;
};

export const TransferResult: React.FC<Props> = ({
  onClose,
  receiver,
  origin,
}: Props) => {
  const handleBack = () => {
    onClose?.();
  };

  return (
    <div className="bg-[#2e2e2e] bg-opacity-85 w-full h-full absolute z-10 p-4 top-0 flex justify-center items-center text-white">
      <div className="flex flex-col">
        <div className="text-xl uppercase text-center">Transfer success!</div>
        <div className="flex gap-x-2 justify-center items-center mt-6">
          <div className="w-[140px] h-[182px] cursor-pointer">
            <CatCard cat={origin} size="large" width={104} height={104} />
          </div>
          <div className="pt-2">
            <ChevronsRightIcon size={24} color="white" strokeWidth={3} />
          </div>
          <div className="w-[140px] h-[182px] cursor-pointer">
            <CatCard cat={receiver} size="large" width={104} height={104} />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mt-8">
          <div className="w-[164px] h-[39px]">
            <Button onClick={handleBack}>Claim now</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
