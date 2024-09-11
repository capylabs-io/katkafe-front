import React from "react";
import Image from "next/image";
import { get } from "lodash";
import { Restaurant } from "@/types/restaurant";
import { useRestaurantStore } from "@/stores/restaurant/restaurantStore";
import Button from "./Button";
import classNames from "classnames";
import usePower from "@/lib/hooks/restaurant/useRestaurant";
type Props = {
  restaurant: Restaurant;
  onUnlock?: () => void;
  onCardClick?: (order: number) => void;
};

const RestaurantCard = ({ restaurant, onUnlock, onCardClick }: Props) => {
  const [nextRestaurantUnclockIndex, myRestaurants] = useRestaurantStore(
    (state) => [
      state.nextRestaurantUnclockIndex,
      state.myRestaurants,
      state.currentRestaurant,
    ]
  );
  const cats = get(restaurant, "cats", []);
  const { power } = usePower(restaurant._id, restaurant);
  const name = get(restaurant, "name", "");
  const imageUrl = get(restaurant, "imgUrl", "");
  const staffSlot = get(restaurant, "slot", "");
  const isUnlock =
    myRestaurants &&
    myRestaurants.some((item) => item.order === get(restaurant, "order"));

  const handleClickUnlock = () => {
    onUnlock?.();
  };

  const handleCardClick = () => {
    if (isUnlock) {
      onCardClick?.(restaurant.order);
    }
  };

  const restaurantLocked = (
    <>
      <div className="flex flex-col items-center justify-center gap-4 absolute w-full h-full z-10 bg-black/75 backdrop-blur-sm">
        <div>
          <Image src={"/images/unlock.png"} alt={""} width={24} height={32} />
        </div>
        {restaurant.order === nextRestaurantUnclockIndex ? (
          <div className="w-[156px] h-[36px] bg-white rounded-xl">
            <Button onClick={handleClickUnlock}>Unlock</Button>
          </div>
        ) : (
          <div className="max-w-[180px] text-center text-white">
            Fufill the requirement to unlock this shop
          </div>
        )}
      </div>
    </>
  );

  return (
    <div
      className="relative flex flex-col justify-center items-center min-h-[175px]"
      onClick={handleCardClick}
    >
      <Image
        src={imageUrl}
        alt="res pic"
        width={288}
        height={125}
        className="aspect-[2/1] object-cover rounded"
      />
      {!isUnlock && restaurantLocked}
      <div className="flex justify-between items-start mt-2 w-full">
        <div>
          <div>{name}</div>
          <div
            className={classNames(
              "flex gap-1 items-center",
              cats.length === 0 && "hidden"
            )}
          >
            <div>
              <Image
                src="/images/speed.png"
                alt="coin"
                width={16}
                height={16}
              />
            </div>
            {power}/s
          </div>
        </div>
        <div
          className={classNames(
            "flex items-center gap-1",
            cats.length === 0 && "hidden"
          )}
        >
          <div>
            <Image
              src="/images/slot_cat.png"
              alt="coin"
              width={16}
              height={16}
            />
          </div>
          <div>
            {cats.length}/{staffSlot}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
