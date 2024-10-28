import { CURRENCY_TYPES, ITEM_TYPES } from "@/types/item";

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

export const getItemBgByType = (type: string) => {
  switch (type) {
    case ITEM_TYPES.STAR:
      return "/images/shop/bg-item-2.png";
    default:
      return "/images/shop/bg-item-1.png";
  }
};
