import React from "react";
import Image from "next/image";
import Button from "../Button";
import { useDialogStore } from "@/stores/DialogStore";
import { useRestaurantStore } from "@/stores/restaurant/restaurantStore";

type Props = {
  onClick: () => void;
};

const Dialog = ({ onClick }: Props) => {
  const [currentRestaurant] = useRestaurantStore((state) => [state.currentRestaurant])

  const [isShowDialog, dialogContent, type] = useDialogStore((state) => [state.isShowDialog, state.dialogContent, state.type])
  return (
    <>
      {isShowDialog &&
        <>
          <div className="bg-[#232322] opacity-70 absolute w-[384px] h-[608px] items-center flex justify-center top-0 left-0 z-10"></div>
          <div className="bg-orange-10 absolute rounded-2xl w-[95%] text-center pt-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="p-3">
              <div className="text-xl mb-1">{dialogContent.title}</div>
              <div className="text-bodyLg text-gray-30 mb-4 max-w-[250px] mx-auto">
                {dialogContent.content}
              </div>
              {
                type === 'login' ? <div className="flex justify-center">
                  <Image
                    src={dialogContent.imgUrl}
                    alt="cat pic"
                    width={120}
                    height={120}
                  />
                </div> :
                  <div className="relative flex flex-col justify-center items-center min-h-[198px]">
                    <Image
                      src={dialogContent.imgUrl}
                      alt="res pic"
                      width={300}
                      height={300}
                      className="aspect-[2/1] object-cover rounded"
                    />
                    <div className="flex justify-center text-center items-start mt-5 w-full text-xl">
                      {currentRestaurant?.name}
                    </div>
                  </div>
              }

            </div>

            <div className="flex flex-wrap gap-2 justify-center border-[#E8DDBD] border-t py-3 mt-6">
              <div className="w-[164px] h-[39px]" onClick={onClick}>
                <Button>{dialogContent.buttonText}</Button>
              </div>
            </div>
          </div>
        </>
      }
    </>
  );
};

export default Dialog;
