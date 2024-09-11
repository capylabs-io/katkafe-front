import React from "react";
import Button from "./Button";
import { useRestaurantStore } from "@/stores/restaurant/restaurantStore";
import classNames from "classnames";
import { useUserStore } from "@/stores/userStore";

type Props = {
  data: {
    title: string;
    description: string;
    catOwned: number;
    shopLevel: number;
  };
  onClose?: () => void;
  onUnclock?: () => void;
};

const UnlockDialog: React.FC<Props> = ({ data, onUnclock }: Props) => {
  const [user] = useUserStore((state) => [state.user])
  const [nextRestaurantUnclock, currentRestaurant] = useRestaurantStore((state) => [state.nextRestaurantUnclock, state.currentRestaurant])
  const handleClick = async () => {
    onUnclock?.()
  };
  return (
    <div className="bg-orange-10 absolute rounded-2xl w-[95%] text-center p-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
      <div className="p-4">
        <div className="text-xl">{data.title}</div>
        <div className="mx-auto font-light mb-4">{data.description}</div>
        <div className="flex gap-12">
          <div>
            <div>Cat Owned</div>
            <div className="flex gap-2 items-center">
              <div>
                <img src="./images/cat-img.png" alt="" width={24} height={24} />
              </div>
              <div className={classNames("flex items-center ", user && user?.cats.length < Number(nextRestaurantUnclock?.numberCatsRequire) ? 'text-[#F74751]' : 'text-black')}>
                <span>{user?.cats.length}</span>
                <span>/{nextRestaurantUnclock?.numberCatsRequire}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <div>
              <div>Shop level</div>
              <div className="flex gap-2 items-center">
                <div>
                  <img
                    src="./images/cat-img.png"
                    alt=""
                    width={24}
                    height={24}
                  />
                </div>
                <div className={classNames(currentRestaurant && currentRestaurant.level < 9 ? 'text-[#F74751]' : 'text-black')}>
                  <span>{currentRestaurant && currentRestaurant.level}</span>
                  <span>/9</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start mt-3">
          <div>Fee</div>
          <div className="flex gap-1">
            <img src="/images/coin.png" width={24} height={24} alt="" />
            {Number(user?.bean) < Number(nextRestaurantUnclock?.fee) ? (
              <span className="text-[#F74751]">{user?.bean}/{nextRestaurantUnclock?.fee}</span>
            ) : (
              <span className="text-black">{user?.bean}/{nextRestaurantUnclock?.fee}</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 justify-center border-[#E8DDBD] border-t pt-2">
        <div className="w-[164px] h-[39px]" onClick={handleClick}>
          {user && user?.cats.length < 9 ? (
            <Button disabled>Unlock</Button>
          ) : (
            <Button>Unlock</Button>
          )}
        </div>
      </div>
    </div >
  );
};

export default UnlockDialog;
