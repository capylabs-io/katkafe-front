import React, { useEffect, useState } from "react";
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
const itemsPerPage = 2;

function Restaurant() {
  const [setShowRestaurantPanel] = useLayoutStore((state) => [
    state.setShowRestaurantPanel,
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDialog, setShowDialog] = useState(false);
  const [unclockError, setUnclockError] = useState(false)
  const [user, setUser] = useUserStore((state) => [state.user, state.setUser])
  const [isShowing, show, hide] = useLoadingStore((state) => [
    state.isShowing,
    state.show,
    state.hide,
  ]);
  const [
    showSuccessDialog,
    setDialogType,
    setDialogContent
  ] = useDialogStore((state) => [
    state.show,
    state.setDialogType,
    state.setDialogContent
  ]);
  const [restaurants, nextRestaurantUnclock, currentRestaurant, setCurrentRestaurant] = useRestaurantStore((state) => [state.restaurants, state.nextRestaurantUnclock, state.currentRestaurant, state.setCurrentRestaurant])
  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const { fetchRestaurants } = useFetchRestaurants();

  const dataUnlock = {
    title: "Unlock the coffee shop!",
    description: "To unlock this coffee shopo you'll need:",
    catOwned: 4,
    shopLevel: 9,
    fee: "20000",
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
    if ((user && user?.cats.length >= Number(nextRestaurantUnclock?.numberCatsRequire)) && (currentRestaurant && currentRestaurant.level >= 9) && (Number(user?.bean) >= Number(nextRestaurantUnclock?.fee))) {
      try {
        show()
        const res = await unclockRestaurant()
        if (res) {
          setCurrentRestaurant(res?.newLocation)
          setUser(res?.updatedUser)
          fetchRestaurants();
          setShowDialog(false);
          setShowRestaurantPanel(false);
          setDialogType('restaurant')
          setDialogContent({
            title: 'Congratulation!',
            content: 'You have unlocked a new shop.',
            buttonText: 'Check it out',
            imgUrl: res?.newLocation.imgUrl
          })
          showSuccessDialog()
        }
      } catch (error) {
        console.error("Error fetching", error);
      } finally {
        setTimeout(() => {
          hide();
        }, 1000);
      }
    } else {
      setUnclockError(true);
      setTimeout(() => {
        setUnclockError(false);
      }, 1000);
    }
  }
  const handleOnCardClick = (order: number) => {
    const restaurantSelected = restaurants.find((restaurant) => restaurant.order === order)
    setCurrentRestaurant(restaurantSelected as RestaurantType | null)
  }
  useEffect(() => {
    fetchRestaurants();
    if (!currentRestaurant) {
      setCurrentRestaurant(restaurants && restaurants[0] as RestaurantType | null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <div className="w-full flex flex-col gap-2 bg-orange-10 rounded-b-[20px] rounded-t border border-gray-20 absolute z-10 h-[calc(100%-32px)] p-4 overflow-hidden mt-8">
            {currentRestaurants.map((restaurant) => (
              <>
                <div
                  key={restaurant._id}
                  className={classNames("bg-orange-10 p-2 rounded-lg", currentRestaurant?.order === restaurant.order ? 'border-2 border-primary !shadow-none' : 'border border-[#cccbbd]')}
                  style={{ boxShadow: "0px -4px 0px 0px #cccbbd inset" }}
                >
                  <RestaurantCard restaurant={restaurant} onUnlock={handleClickUnlock} onCardClick={handleOnCardClick} />
                </div >
              </>
            ))}
            {/* {currentPage ===
              Math.ceil((restaurants.length + 1) / itemsPerPage) && (
              <div
                className="border border-[#cccbbd] bg-[#F7F6E2] p-2 py-8 rounded-lg"
                style={{ boxShadow: "0px -4px 0px 0px #cccbbd inset" }}
              >
                <UnlockRestaurantCard onUnlock={handleClick} />
              </div>
            )} */}
            <Pagination
              onPageClick={handlePageClick}
              customClassName="flex justify-center absolute bottom-2 w-full left-1/2 -translate-x-1/2"
              currentPage={currentPage}
              totalPages={Math.ceil((restaurants.length + 1) / itemsPerPage)}
              onClickNextPage={handleNextPage}
              onClickPrevPage={handlePrevPage}
            />
          </div>
        </div>
      </div>
      {
        showDialog && (
          <>
            <div
              className="bg-[#807f76] opacity-70 absolute w-[384px] h-[608px] items-center flex justify-center top-0 left-0 z-10"
              onClick={handleClickOutside}
            ></div>
            <UnlockDialog
              data={dataUnlock}
              onUnclock={handleClickUnlockDialog}
              onClose={() => setShowDialog(false)}
            />
          </>
        )
      }
      {
        unclockError && (
          <div className="bg-[#000] opacity-70 text-bodyLg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 text-white px-4 py-2 w-max">
            Insufficient resource
          </div>
        )
      }
      {isShowing && <Loading />}
    </div >
  );
}

export default Restaurant;
