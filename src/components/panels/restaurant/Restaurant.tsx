import React, { useState } from "react";
import Image from "next/image";
import { useLayoutStore } from "@/stores/layoutStore";
import { useFetchRestaurants } from "@/lib/hooks/restaurant/useRestaurant";
import { useRestaurantStore } from "@/stores/restaurant/restaurantStore";
import RestaurantCard from "@/components/ui/RestaurantCard";
import { Pagination } from "@/components/ui/Pagination";
import UnlockDialog from "@/components/ui/UnlockDialog";
import { useUserStore } from "@/stores/userStore";
import { useLoadingStore } from "@/stores/LoadingStore";
import { Loading } from "@/components/ui/Loading";
import { unclockRestaurant } from "@/requests/restaurant";
import { useDialogStore } from "@/stores/DialogStore";
import { Restaurant as RestaurantType } from "@/types/restaurant";
import classNames from "classnames";
import { useSnackBarStore } from "@/stores/SnackBarStore";
import ConfirmDialog from "@/components/ui/common/ConfirmDialog";
const itemsPerPage = 2;

function Restaurant() {
  const [currentPage, setCurrentPage] = useState(1);
  const [showDialog, setShowDialog] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(false);

  const [setShowRestaurantPanel] = useLayoutStore((state) => [
    state.setShowRestaurantPanel,
  ]);
  const [user, setUser] = useUserStore((state) => [state.user, state.setUser]);
  const [show, hide] = useLoadingStore((state) => [state.show, state.hide]);
  const [showSuccessDialog, setDialogType] = useDialogStore((state) => [
    state.show,
    state.setDialogType,
  ]);
  const [
    restaurants,
    nextRestaurantUnclock,
    currentRestaurant,
    setCurrentRestaurant,
  ] = useRestaurantStore((state) => [
    state.restaurants,
    state.nextRestaurantUnclock,
    state.currentRestaurant,
    state.setCurrentRestaurant,
  ]);
  const [showSnackbar] = useSnackBarStore((state) => [state.show]);

  const { fetchRestaurants } = useFetchRestaurants();

  const dataUnlock = {
    title: "Unlock the coffee shop!",
    description: "To unlock this coffee shopo you'll need:",
    catOwned: 4,
    shopLevel: 9,
  };
  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRestaurants =
    startIndex >= restaurants.length
      ? []
      : restaurants.slice(startIndex, endIndex) || [];

  const handleBack = () => {
    setShowRestaurantPanel(false);
  };
  const handleClickUnlock = () => {
    setShowDialog(true);
  };
  const handleClickOutside = (e: any) => {
    setShowDialog(false);
  };
  const handleClickUnlockDialog = async () => {
    if (
      user &&
      user?.cats.length >= Number(nextRestaurantUnclock?.numberCatsRequire) &&
      currentRestaurant &&
      currentRestaurant.level >= 9 &&
      Number(user?.bean) >= Number(nextRestaurantUnclock?.fee)
    ) {
      try {
        setConfirmDialog(false);
        show();
        const res = await unclockRestaurant();
        if (res) {
          setCurrentRestaurant(res?.newLocation);
          setUser(res?.updatedUser);
          fetchRestaurants();
          setShowDialog(false);
          setShowRestaurantPanel(false);
          setDialogType("restaurant");
          showSuccessDialog({
            title: "Congratulation!",
            content: "You have unlocked a new shop.",
            buttonText: "Check it out",
            imgUrl: res?.newLocation.imgUrl,
          });
        }
      } catch (error) {
        console.error("Error fetching", error);
        showSnackbar("Unlock Fail");
      } finally {
        setTimeout(() => {
          hide();
        }, 1000);
      }
    } else {
      showSnackbar("Insufficient resource");
    }
  };
  const handleOnCardClick = (order: number) => {
    const restaurantSelected = restaurants.find(
      (restaurant) => restaurant.order === order
    );
    setCurrentRestaurant(restaurantSelected as RestaurantType | null);
    setShowRestaurantPanel(false);
  };
  return (
    <div className="list-panel bg-[#2e2e2e] w-full h-full absolute z-10 p-4 top-0">
      <div className="rounded-3xl border-solid border-orange-90 border-4 h-[calc(100%-16px)] mt-4">
        <div className="rounded-[21px] border-solid border-orange-30 border-4 bg-orange-30 h-full relative">
          <div className="absolute -left-[15px] -top-[13px] bg-[#fffde9] rounded-full border-[#ededed] cursor-pointer">
            <Image
              src="/images/back.png"
              alt="cat pic"
              width={32}
              height={32}
              onClick={handleBack}
            />
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 -translate-y-[28px] border-2 px-6 py-2 border-orange-90 bg-orange-10 rounded-t-xl text-orange-90">
            Coffee spot
          </div>

          <span className="flex justify-between gap-2 absolute top-[14px] w-[90%] left-1/2 -translate-x-1/2">
            <p className="bg-red-10 h-[2px] w-[13%]"></p>
            <p className="bg-red-10 h-[2px] w-[70%]"></p>
            <p className="bg-red-10 h-[2px] w-[13%]"></p>
          </span>
          <div className="w-full flex flex-col gap-2 bg-orange-10 rounded-b-[20px] rounded-t border border-gray-20 absolute z-10 h-[calc(100%-32px)] p-4 overflow-auto mt-8">
            <Pagination
              onPageClick={handlePageClick}
              customClassName="flex justify-center w-full z-20"
              currentPage={currentPage}
              totalPages={Math.ceil((restaurants.length + 1) / itemsPerPage)}
              onClickNextPage={handleNextPage}
              onClickPrevPage={handlePrevPage}
            />
            {currentRestaurants.map((restaurant) => (
              <>
                <div
                  key={`${restaurant._id}+ ${restaurant.name}`}
                  className={classNames(
                    "bg-orange-10 p-2 rounded-lg",
                    currentRestaurant?.order === restaurant.order
                      ? "border-2 border-primary !shadow-none"
                      : "border border-[#cccbbd]"
                  )}
                  style={{ boxShadow: "0px -4px 0px 0px #cccbbd inset" }}
                >
                  <RestaurantCard
                    restaurant={restaurant}
                    onUnlock={handleClickUnlock}
                    onCardClick={handleOnCardClick}
                  />
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
      {showDialog && (
        <>
          <div
            className="bg-[#807f76] opacity-70 absolute w-[384px] h-[608px] items-center flex justify-center top-0 left-0 z-10"
            onClick={handleClickOutside}
          ></div>
          <UnlockDialog
            data={dataUnlock}
            onUnclock={() => {
              setConfirmDialog(true), setShowDialog(false);
            }}
            onClose={() => setShowDialog(false)}
          />
        </>
      )}
      {confirmDialog && (
        <ConfirmDialog
          onCancel={() => setConfirmDialog(false)}
          onAgree={handleClickUnlockDialog}
          title="Unlock Confirmation"
          content="Do you want to unlock this restaurant?"
        />
      )}
    </div>
  );
}

export default Restaurant;
