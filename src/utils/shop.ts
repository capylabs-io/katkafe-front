import { CURRENCY_TYPES, ITEM_TYPES } from "@/types/item";
import { get } from "lodash";

export const getIconPathByCurrencyType = (type: string) => {
  switch (type) {
    default:
    case CURRENCY_TYPES.BEAN:
      return "/images/coin.png";
    case CURRENCY_TYPES.STAR:
      return "/icons/ic-star.png";
    case CURRENCY_TYPES.DIAMOND:
      return "/images/kbuck.png";
    case CURRENCY_TYPES.RAID:
      return "/icons/ic-raid-ticket.png";
    case CURRENCY_TYPES.SHIELD:
      return "/icons/ic-shield.png";
    case CURRENCY_TYPES.SPIN:
      return "/icons/ic-spin-ticket.png";
  }
};

export const getBigIconPathByCurrencyType = (type: string) => {
  switch (type) {
    default:
    case CURRENCY_TYPES.BEAN:
      return "/big-icons/Gold.png";
    case CURRENCY_TYPES.STAR:
      return "/icons/ic-star.png";
    case CURRENCY_TYPES.DIAMOND:
      return "/big-icons/Gem.png";
    case CURRENCY_TYPES.RAID:
      return "/big-icons/Raid.png";
    case CURRENCY_TYPES.SHIELD:
      return "/big-icons/Shield.png";
    case CURRENCY_TYPES.SPIN:
      return "/big-icons/Spin.png";
  }
};

export const getItemBgByType = (type: string) => {
  switch (type) {
    case ITEM_TYPES.STAR:
      return "/images/shop/bg-item-2.png";
    default:
      return "/images/shop/bg-item-1.png";
  }
};

export const isUserHasEnoughCurrency = (
  user: any,
  item: any,
  currencyType: string
) => {
  console.log("user", user);
  console.log("item", item);
  console.log("currencyType", currencyType);
  switch (currencyType) {
    case CURRENCY_TYPES.BEAN:
      return Number(get(user, "bean", 0)) >= Number(get(item, "price", 0));
    case CURRENCY_TYPES.STAR:
      return Number(get(user, "star", 0)) >= Number(get(item, "starPrice", 0));
    case CURRENCY_TYPES.DIAMOND:
      return (
        Number(get(user, "diamond", 0)) >= Number(get(item, "diamondPrice", 0))
      );
    default:
      return false;
  }
};
