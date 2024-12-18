import Button from "@/components/ui/Button";
import { useItemStore } from "@/stores/shop/itemStore";
import { useLayoutStore } from "@/stores/layoutStore";
import React, { useEffect, useMemo, useState } from "react";
import RewardDialog from "@/components/ui/RewardDialog";
import { Bundle, ShopType } from "@/types/bundle";
import { CURRENCY_TYPES, Item, ITEM_TYPES } from "@/types/item";
import CardInfo from "@/components/ui/CardInfo";
import { useStaffStore } from "@/stores/staffStore";
import { buyItem, getItems } from "@/requests/shop/item";
import { useUserStore } from "@/stores/userStore";
import { useFetchStaffs } from "@/lib/hooks/cat/useStaff";
import ConfirmDialog from "@/components/ui/common/ConfirmDialog";
import Image from "next/image";
import { useLoadingStore } from "@/stores/LoadingStore";
import { useSnackBarStore } from "@/stores/SnackBarStore";
import { InfoIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { get } from "lodash";
import NumberFormatter from "@/components/ui/NumberFormat";
import { GemShopContent } from "./GemShopContent";
import qs from "qs";
import { StarterBundleShopContent } from "./StarterBundleContent";
import moment from "moment";

const TABS = {
  CAT: "Cat",
  ROLL: "Roll",
  BOOSTER: "Booster",
  GEM: "Gem",
  STARTER_BUNDLE: "Starter-Bundle",
};

const Shop = () => {
  const isActive = "!py-2 !-translate-y-[28px] !border-orange-90 !bg-orange-10";
  const [showRewardDialog, setShowRewardDialog] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [activeTab, setActiveTab] = useState(TABS.ROLL);
  const [showCardInfo, setShowCardInfo] = useState(false);
  const [purchasedItem, setPurchasedItem] = useState(null);
  const [showNotiBean, setShowNotiBean] = useState(false);

  const [setShowShopPanel] = useLayoutStore((state) => [
    state.setShowShopPanel,
  ]);
  const [items, currentItem, setCurrentItem, setItems] = useItemStore(
    (state) => [
      state.items,
      state.currentItem,
      state.setCurrentItem,
      state.setItems,
    ]
  );
  const [setStaffs, setCurrentStaff] = useStaffStore((state) => [
    state.setStaffs,
    state.setCurrentStaff,
  ]);
  const [user, setUser] = useUserStore((state) => [state.user, state.setUser]);
  const [show, hide] = useLoadingStore((state) => [state.show, state.hide]);
  const [showSnackbar] = useSnackBarStore((state) => [state.show]);
  const [currencyType, setCurrencyType] = useState(CURRENCY_TYPES.BEAN);

  const { fetchStaffs } = useFetchStaffs();

  const handleViewDetail = (item: Item) => {
    setShowCardInfo(true);
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleClose = () => {
    setItems([]);
    setShowShopPanel(false);
  };

  const confirmBundleDialog = (bundle: Bundle) => {
    setShowRewardDialog(!showRewardDialog);
  };

  const showConfirm = (item: Item, currencyType: CURRENCY_TYPES) => {
    setShowConfirmDialog(!showConfirmDialog);
    setCurrentItem(item);
    setCurrencyType(currencyType);
  };

  const handleBuyItem = async (item: Item) => {
    if (item) {
      setCurrentItem(item);
    }
    if (!user) return;
    if (Number(user.bean) < Number(item.price)) {
      setShowNotiBean(true);
      showSnackbar("Not enough gold!");
      return;
    }
    try {
      if (!user || !item) return;
      show();
      const body = {
        itemId: item._id,
        currencyType,
      };
      const response = await buyItem(body);
      if (response) {
        setPurchasedItem(response.items.cats[0]);
        setStaffs(response.user.cats);
        setUser(response.user);
        await fetchStaffs();
        setCurrentStaff(response.items.cats[0]);
        // showSnackbar("Purchase successfully!");
        setShowRewardDialog(true);
      }
    } catch (error) {
      console.error("Failed to buy item", error);
      showSnackbar("Purchase fail!");
    } finally {
      hide();
    }
  };

  const fetchItems = async () => {
    try {
      show();
      let type;
      switch (activeTab) {
        case TABS.ROLL:
          type = ITEM_TYPES.PACK;
          break;
        // case TABS.CAT:
        //   type = "cat";
        //   break;
        case TABS.STARTER_BUNDLE:
          type = ITEM_TYPES.STARTER_BUNDLE;
          break;
        case TABS.GEM:
          type = ITEM_TYPES.STAR;
          break;
        default:
          type = ITEM_TYPES.PACK;
          break;
      }
      const response = await getItems(type);
      console.log(response);
      setItems(response);
      return response;
    } catch (error) {
      console.error("Failed to fetch cat deals", error);
    } finally {
      hide();
    }
  };

  const handleCancel = () => {
    setShowConfirmDialog(false);
  };

  const handleAgree = () => {
    setShowConfirmDialog(false);

    if (currentItem) {
      handleBuyItem(currentItem);
    }
  };

  const packItems = useMemo(() => {
    if (!items) return [];
    return items.filter((item) => item.type === ITEM_TYPES.PACK);
  }, [items]);

  const gemShopContent = <GemShopContent />;
  const starterBundleShopContent = (
    <StarterBundleShopContent onPurchase={fetchItems} />
  );

  const rollCatShopContent = (
    <div className="bg-orange-10 rounded-b-[20px] flex flex-wrap justify-center rounded-t border border-gray-20 w-full overflow-y-auto h-[calc(100%-32px)] p-4 mt-8">
      <div className="bg-[url('/images/bg-name.png')] w-[170px] h-[35px] bg-contain bg-center bg-no-repeat text-center mb-6">
        <div className="text-center uppercase">deal of the day</div>
      </div>
      <div className="w-full grid grid-cols-1 gap-6 justify-center">
        {packItems
          .sort((a, b) =>
            moment(a.createdAt).isAfter(moment(b.createdAt)) ? -1 : 1
          )
          .map((item) => (
            <div key={item._id} className="flex flex-col items-center gap-y-2">
              <div className="w-[114px] h-[186px]">
                <Image
                  alt="pack image"
                  src={item.imgUrl}
                  width={114}
                  height={186}
                />
              </div>
              <Popover>
                <PopoverTrigger>
                  <div className="text-orange-90 flex items-center hover:cursor-pointer">
                    <div>{item.itemName}</div>
                    <InfoIcon size={16} className="ml-2 cursor-pointer" />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-[150px] bg-[#fffde9] text-orange-90">
                  <div>
                    <div className="text-bold text-black">Rarity Info</div>
                    <div className="flex flex-row gap-x-1.5">
                      <div>Common:</div>
                      <div>{get(item, "data.rarity.common", 0)}%</div>
                    </div>
                    <div className="flex flex-row gap-x-1.5">
                      <div className="text-[#5e80d8]">Rare:</div>
                      <div>{get(item, "data.rarity.rare", 0)}%</div>
                    </div>
                    <div className="flex flex-row gap-x-1.5">
                      <div className="text-[#a8163d]">Epic:</div>
                      <div>{get(item, "data.rarity.epic", 0)}%</div>
                    </div>
                    <div className="flex flex-row gap-x-1.5">
                      <div className="text-[#a8163d]">Legendary:</div>
                      <div>{get(item, "data.rarity.legendary", 0)}%</div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <div className="h-fit flex flex-col justify-center items-center gap-y-1.5 mt-2 w-[120px]">
                {get(item, "price").toString() !== "0" && (
                  <Button
                    onClick={() => showConfirm(item, CURRENCY_TYPES.BEAN)}
                    customClassNames=""
                  >
                    <NumberFormatter value={item.price} />
                    <img
                      className="w-4 h-4 ml-1"
                      src="./images/coin.png"
                      alt=""
                    />
                  </Button>
                )}
                {get(item, "diamondPrice").toString() !== "0" && (
                  <Button
                    onClick={() => showConfirm(item, CURRENCY_TYPES.DIAMOND)}
                  >
                    <NumberFormatter value={item.diamondPrice} />
                    <img
                      className="w-4 h-4 ml-1"
                      src="./images/kbuck.png"
                      alt=""
                    />
                  </Button>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );

  const renderShopContent = () => {
    switch (activeTab) {
      default:
      case TABS.ROLL:
        return rollCatShopContent;
      case TABS.GEM:
        return gemShopContent;
      case TABS.STARTER_BUNDLE:
        return starterBundleShopContent;
    }
  };

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, showRewardDialog]);

  return (
    <>
      <div className="bg-[#2e2e2e] w-full h-full absolute z-10 p-4 top-0">
        <div className="rounded-3xl border-solid border-orange-90 border-4 h-[calc(100%-16px)] mt-4">
          <div className="rounded-[21px] border-solid border-orange-30 border-4 bg-orange-30 h-full relative">
            <div className="absolute -right-[15px] -top-[13px] bg-[#fffde9] rounded-full border-[#ededed] cursor-pointer">
              <img
                className="w-6 h-6"
                src="/images/btn-close.png"
                alt=""
                onClick={handleClose}
              />
            </div>
            <div className="flex w-full">
              <div
                onClick={() => handleTabClick(TABS.ROLL)}
                className={`absolute cursor-pointer left-1/2 -translate-x-[140px] border-2 px-4 py-1 bg-[#edc6a9] border-[#edc6a9] -translate-y-[20px] rounded-t-xl text-orange-90 ${
                  activeTab === TABS.ROLL ? isActive : ""
                }`}
              >
                <div className="uppercase font-semibold">Roll</div>
              </div>
              <div
                onClick={() => handleTabClick(TABS.STARTER_BUNDLE)}
                className={`absolute cursor-pointer left-1/2 -translate-x-[56px] border-2 px-4 py-1 bg-[#edc6a9] border-[#edc6a9] -translate-y-[20px] rounded-t-xl text-orange-90 ${
                  activeTab === TABS.STARTER_BUNDLE ? isActive : ""
                }`}
              >
                <div className="uppercase font-semibold">Bundle</div>
              </div>
              <div
                onClick={() => handleTabClick(TABS.GEM)}
                className={`absolute cursor-pointer left-1/2 translate-x-[44px] border-2 px-4 py-1 bg-[#edc6a9] border-[#edc6a9] -translate-y-[20px] rounded-t-xl text-orange-90 ${
                  activeTab === TABS.GEM ? isActive : ""
                }`}
              >
                <div className="uppercase font-semibold">Diamond</div>
              </div>
              {/* <div
                onClick={() => handleTabClick(TABS.CAT)}
                className={`absolute cursor-pointer left-1/2 translate-x-[10px] border-2 px-6 py-1 bg-[#edc6a9] border-[#edc6a9] -translate-y-[20px] rounded-t-xl text-orange-90 ${
                  activeTab === TABS.CAT ? isActive : ""
                }`}
              >
                Cat
              </div> */}
            </div>
            <span className="flex justify-between gap-2 absolute top-[14px] w-[90%] left-1/2 -translate-x-1/2">
              <p className="bg-red-10 h-[2px] w-[13%]"></p>
              <p className="bg-red-10 h-[2px] w-[70%]"></p>
              <p className="bg-red-10 h-[2px] w-[13%]"></p>
            </span>
            {/* {activeTab === TABS.CAT && (
              <div className="bg-orange-10 rounded-b-[20px] flex flex-wrap justify-center rounded-t border border-gray-20 w-full overflow-y-auto h-[calc(100%-32px)] p-4 mt-8">
                <div className="bg-[url('/images/bg-name.png')] w-[170px] h-[35px] bg-contain bg-center bg-no-repeat text-center mb-6">
                  <div className="text-center uppercase">deal of the day</div>
                </div>
                <div className="w-full flex flex-wrap gap-10 justify-center">
                  {items.map((item) => (
                    <div
                      key={item._id}
                      className="flex flex-col items-center gap-4"
                    >
                      <div className="w-[100px] h-[130px]">
                        <CatCard cat={item} />
                      </div>
                      <div
                        className="w-[88px] h-[30px]"
                        onClick={(event: React.MouseEvent<HTMLDivElement>) =>
                          showConfirm(item)
                        }
                      >
                        <Button>
                          {item.price || 0}
                          <img
                            className="w-4 h-4 ml-1"
                            src="./images/coin.png"
                            alt=""
                          />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )} */}
            {renderShopContent()}
          </div>
        </div>
        {showRewardDialog && (
          <>
            <div className="bg-[#807f76] opacity-70 absolute w-full h-full items-center flex justify-center top-0 left-0 z-40"></div>
            {purchasedItem && (
              <RewardDialog
                type={activeTab === TABS.ROLL ? ShopType.Roll : ShopType.Cat}
                onClose={() => setShowRewardDialog(false)}
                closeShopPanel={() => setShowShopPanel(false)}
                button={{ type: "coin" }}
                handleChooseDetail={handleViewDetail}
                item={purchasedItem}
              />
            )}
          </>
        )}

        {showCardInfo && (
          <div className="absolute z-50 w-full h-full top-0 left-0">
            <CardInfo onBack={() => setShowCardInfo(false)} />
          </div>
        )}
        {showConfirmDialog && (
          <>
            <ConfirmDialog
              onCancel={handleCancel}
              onAgree={handleAgree}
              title="Purchase Confirmation"
              content="Do you want to buy this items?"
            />
          </>
        )}
      </div>
    </>
  );
};

export default Shop;
