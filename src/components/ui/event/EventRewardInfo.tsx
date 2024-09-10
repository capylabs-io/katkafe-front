import { EventReward, EventRewardType } from "@/types/event";

export const EventRewardInfo = ({ reward }: { reward: EventReward }) => {
  switch (reward.type) {
    case EventRewardType.BEAN:
    //TODO: Split diamond and bean
    case EventRewardType.DIAMOND:
      return (
        <div className="flex items-center gap-x-1">
          <img src="/images/coin.png" className="w-4 h-4" alt="" />
          <span>{reward.value}</span>
        </div>
      );

    case EventRewardType.CAT:
    case EventRewardType.SPECIAL_CAT:
      return (
        <div className="flex items-center gap-x-1">
          <img src="/icons/ic-staff.png" className="w-4 h-4" alt="" />
          {reward.type === EventRewardType.CAT && <span>1 Free Cat</span>}
          {reward.type === EventRewardType.SPECIAL_CAT && (
            <span>1 Special Character</span>
          )}
        </div>
      );
  }
};
