import CardTask from "@/components/ui/CardTask";
// import { useFetchAchievements } from "@/lib/hooks/quest/useAchievement";
import { useFetchQuests } from "@/lib/hooks/quest/useFetchQuests";
import { checkIn, visitWebsite, youtube } from "@/requests/quest/quests";
import { useLayoutStore } from "@/stores/layoutStore";
import { useAchievementStore } from "@/stores/quest/achievementStore";
import React, { useEffect, useState } from "react";
import { QuestCodes } from "@/constants/quest";
import { useLoadingStore } from "@/stores/LoadingStore";
import { Loading } from "@/components/ui/Loading";
import RewardQuest from "@/components/ui/RewardQuest";

type Props = {};
const TAB = {
  DAILY: "Daily",
  SOCIAL: "Social",
};

function Task({}: Props) {
  const [activeTab, setActiveTab] = useState(TAB.DAILY);
  const [showReward, setShowReward] = useState(false);
  const [setShowQuestPanel] = useLayoutStore((state) => [
    state.setShowQuestPanel,
  ]);
  const [isShowing, show, hide] = useLoadingStore((state) => [
    state.isShowing,
    state.show,
    state.hide,
  ]);
  const [achievements] = useAchievementStore((state) => [state.achievements]);
  const isActive = "!py-2 !-translate-y-[28px] !border-orange-90 !bg-orange-10";

  const { quests, questTasks, refetchQuests } = useFetchQuests();
  // const { fetchAchievements } = useFetchAchievements();

  const handleTaskTabClick = () => {
    setActiveTab(TAB.DAILY);
  };

  const handleAchievementTabClick = () => {
    setActiveTab(TAB.SOCIAL);
  };

  const handleCheckInQuest = async () => {
    try {
      show();
      await checkIn();
      refetchQuests();
    } catch (error) {
      console.error("Failed to check in", error);
    } finally {
      hide();
      setShowReward(true);
    }
  };

  const handleVisitWebsiteQuest = async () => {
    try {
      await visitWebsite();
      refetchQuests();
    } catch (error) {
      console.error("Failed to visit website", error);
    } finally {
      hide();
      setShowReward(true);
    }
  };

  const handleYoutubeQuest = async () => {
    try {
      await youtube();
      refetchQuests();
    } catch (error) {
      console.error("Failed to youtube", error);
    } finally {
      hide();
      setShowReward(true);
    }
  };

  const handleQuestButtonClick = async (questCode: QuestCodes) => {
    switch (questCode) {
      case QuestCodes.CHECK_IN:
        await handleCheckInQuest();
        break;
      case QuestCodes.VISIT_WEBSITE:
        await handleVisitWebsiteQuest();
        break;
      case QuestCodes.YOUTUBE:
        await handleYoutubeQuest();
        break;
      default:
        break;
    }
  };

  const handleOnClick = () => {
    setShowReward(false);
  };

  const handleClose = (e: any) => {
    e.stopPropagation();
    setShowQuestPanel(false);
  };
  useEffect(() => {
    // fetchAchievements();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
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
          <div className="flex">
            <div
              onClick={handleTaskTabClick}
              className={`absolute cursor-pointer border-b-0 left-1/2 -translate-x-[135px] border-2 px-6 py-1 bg-[#edc6a9] border-[#edc6a9] -translate-y-[20px] rounded-t-xl text-orange-90 ${
                activeTab === "Daily" ? isActive : ""
              }`}
            >
              Daily Task
            </div>
            <div
              onClick={handleAchievementTabClick}
              className={`absolute cursor-pointer border-b-0 left-1/2 translate-x-[5px] border-2 px-6 py-1 bg-[#edc6a9] border-[#edc6a9] -translate-y-[20px] rounded-t-xl text-orange-90 ${
                activeTab === "Social" ? isActive : ""
              }`}
            >
              Social Task
            </div>
          </div>
          <span className="flex justify-between gap-2 absolute top-[14px] w-[90%] left-1/2 -translate-x-1/2">
            <p className="bg-red-10 h-[2px] w-[13%]"></p>
            <p className="bg-red-10 h-[2px] w-[70%]"></p>
            <p className="bg-red-10 h-[2px] w-[13%]"></p>
          </span>
          <div className="bg-[#fff8de] w-full rounded-b-[20px] flex flex-col justify-between rounded-t border border-gray-20 absolute z-10 h-[calc(100%-32px)] p-2 overflow-hidden mt-8">
            {/* Daily tab */}
            {activeTab === TAB.DAILY && (
              <div className="w-full flex flex-wrap gap-2 justify-start overflow-y-auto">
                {quests
                  .filter((quest) => quest.task === "Daily")
                  .map((quest) => (
                    <div
                      key={quest._id}
                      className="w-full flex flex-col items-center"
                    >
                      <CardTask
                        type="task"
                        content={quest.name}
                        img={{
                          imgUrl: quest.imgUrl,
                          width: 24,
                          height: 24,
                        }}
                        reward={{
                          type: "token",
                          quantity: quest.reward.value,
                        }}
                        button={{
                          text: "Go",
                          onClick: () =>
                            handleQuestButtonClick(quest.questCode),
                        }}
                        isDone={quest.progress}
                        visitUrl={quest.visitUrl}
                      />
                    </div>
                  ))}
              </div>
            )}

            {/* Social Task tab */}
            {activeTab === TAB.SOCIAL && (
              <div className="w-full flex flex-wrap gap-2 justify-start overflow-y-auto">
                {quests
                  .filter((quest) => quest.task === "Social")
                  .map((quest) => (
                    <div
                      key={quest._id}
                      className="w-full flex flex-col items-center"
                    >
                      <CardTask
                        type="task"
                        content={quest.name}
                        img={{
                          imgUrl: quest.imgUrl,
                          width: 24,
                          height: 24,
                        }}
                        reward={{
                          type: "token",
                          quantity: quest.reward.value,
                        }}
                        button={{
                          text: "Go",
                          onClick: () =>
                            handleQuestButtonClick(quest.questCode),
                        }}
                        isDone={quest.progress}
                        visitUrl={quest.visitUrl}
                      />
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {isShowing && <Loading />}
      {showReward && <RewardQuest onClick={handleOnClick} />}
    </div>
  );
}

export default Task;
