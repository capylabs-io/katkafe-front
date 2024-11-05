import { RewardType } from "@/types/quest";

export const getIconPathByRewardType = (type: string) => {
  switch (type) {
    default:
    case RewardType.BEAN:
      return "/images/coin.png";
    case RewardType.DIAMOND:
      return "/images/kbuck.png";
    case RewardType.SPIN:
      return "/icons/ic-spin-ticket.png";
    case RewardType.RAID:
      return "/icons/ic-raid-ticket.png";
    case RewardType.SHIELD:
      return "/icons/ic-shield.png";
  }
};

export const getImagePathByRewardType = (type: string) => {
  switch (type) {
    default:
    case RewardType.BEAN:
      return "/big-icons/Gold.png";
    case RewardType.DIAMOND:
      return "/big-icons/Gem.png";
    case RewardType.SPIN:
      return "/big-icons/Spin.png";
    case RewardType.RAID:
      return "/big-icons/Raid.png";
    case RewardType.SHIELD:
      return "/big-icons/Shield.png";
  }
};
