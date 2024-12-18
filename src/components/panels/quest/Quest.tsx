import CardTask from "@/components/ui/CardTask";
import { useFetchQuests } from "@/lib/hooks/quest/useFetchQuests";
import {
  allDailyQuests,
  checkIn,
  followTwitter,
  joinTelegramChat,
  joinTelegramOfficialAnnouncement,
  raidQuest,
  shareLinktree,
  spinQuest,
  visitTelegramAnnouncement,
  visitTelegramChat,
  visitTwitter,
  visitWebsite,
  youtube,
} from "@/requests/quest/quests";
import { useLayoutStore } from "@/stores/layoutStore";
import React, { useState } from "react";
import { QuestCodes } from "@/constants/quest";
import { useLoadingStore } from "@/stores/LoadingStore";
import RewardQuest from "@/components/ui/RewardQuest";
import { useSnackBarStore } from "@/stores/SnackBarStore";
import { Quest } from "@/types/quest";
import {
  useRequestContact,
  useSendData,
  useShowPopup,
  useWebApp,
} from "@zakarliuka/react-telegram-web-tools";

type Props = {};
const TAB = {
  DAILY: "Daily",
  SOCIAL: "Social",
};

function Task({}: Props) {
  const isActive = "!py-2 !-translate-y-[28px] !border-orange-90 !bg-orange-10";
  const [activeTab, setActiveTab] = useState(TAB.DAILY);
  const [showReward, setShowReward] = useState(false);
  const [currentQuest, setCurrentQuest] = useState<Quest | null>(null);

  const [setShowQuestPanel] = useLayoutStore((state) => [
    state.setShowQuestPanel,
  ]);
  const [show, hide] = useLoadingStore((state) => [state.show, state.hide]);
  const [showSnackbar] = useSnackBarStore((state) => [state.show]);

  const { quests, refetchQuests } = useFetchQuests();
  const webApp = useWebApp();

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
      showSnackbar("Check in successfully!");
      setShowReward(true);
    } catch (error) {
      showSnackbar("Check in fail!");
    } finally {
      hide();
    }
  };

  const handleVisitWebsiteQuest = async () => {
    try {
      show();
      await visitWebsite();
      refetchQuests();
      showSnackbar("Visit website successfully!");
      setShowReward(true);
    } catch (error) {
      showSnackbar("Visit website faild!");
    } finally {
      hide();
    }
  };

  const handleYoutubeQuest = async () => {
    try {
      show();
      await youtube();
      refetchQuests();
      showSnackbar("Visit youtube successfully!");
      setShowReward(true);
    } catch (error) {
      showSnackbar("Visit youtube faild!");
    } finally {
      hide();
    }
  };

  const handleVisitTelegramAnnouncementQuest = async () => {
    try {
      show();
      await visitTelegramAnnouncement();
      refetchQuests();
      showSnackbar("Visit telegram announcement successfully!");
      setShowReward(true);
    } catch (error) {
      showSnackbar("Visit telegram announcement faild!");
    } finally {
      hide();
    }
  };

  const handleVisitTeleramChatQuest = async () => {
    try {
      show();
      await visitTelegramChat();
      refetchQuests();
      showSnackbar("Visit telegram chat successfully!");
      setShowReward(true);
    } catch (error) {
      showSnackbar("Visit telegram chat faild!");
    } finally {
      hide();
    }
  };

  const handleVisitTwitterQuest = async () => {
    try {
      show();
      await visitTwitter();
      refetchQuests();
      showSnackbar("Visit twitter successfully!");
      setShowReward(true);
    } catch (error) {
      showSnackbar("Visit twitter fail!");
    } finally {
      hide();
    }
  };

  const handleSpinTicketQuest = async () => {
    try {
      show();
      await spinQuest();
      refetchQuests();
      showSnackbar("Claim spin ticket successfully!");
      setShowReward(true);
    } catch (error) {
      showSnackbar("Claim spin ticket fail!");
    } finally {
      hide();
    }
  };

  const handleRaidTicketQuest = async () => {
    try {
      show();
      await raidQuest();
      refetchQuests();
      showSnackbar("Claim raid ticket successfully!");
      setShowReward(true);
    } catch (error) {
      showSnackbar("Claim raid ticket fail!");
    } finally {
      hide();
    }
  };

  const handleAllDailyQuests = async () => {
    try {
      show();
      await allDailyQuests();
      refetchQuests();
      showSnackbar("All daily quest done!");
      setShowReward(true);
    } catch (error) {
      showSnackbar("You are not done all daily quests!");
    } finally {
      hide();
    }
  };

  const handleJoinTelegramChat = async () => {
    try {
      show();
      await joinTelegramChat();
      refetchQuests();
      showSnackbar("Join telegram chat successfully!");
      setShowReward(true);
    } catch (error) {
      showSnackbar("User does not join group.");
    } finally {
      hide();
    }
  };

  const handleJoinTelegramOfficialAnnouncement = async () => {
    try {
      show();
      await joinTelegramOfficialAnnouncement();
      refetchQuests();
      showSnackbar("Join telegram announcement successfully!");
      setShowReward(true);
    } catch (error) {
      showSnackbar("User does not join group.");
    } finally {
      hide();
    }
  };

  const handleFollowTwitter = async () => {
    try {
      show();
      await followTwitter();
      refetchQuests();
      showSnackbar("Follow Twitter successfully!");
      setShowReward(true);
    } catch (error) {
      showSnackbar("Follow Twitter faild!");
    } finally {
      hide();
    }
  };

  const handleShareLinktreeQuest = async () => {
    try {
      show();
      await shareLinktree();
      refetchQuests();
      showSnackbar("Share Linktree successfully!");
      setShowReward(true);
    } catch (error) {
      showSnackbar("Share Linktree faild!");
    } finally {
      hide();
    }
  };
  // const handleQuestButtonClick = (quest: Quest) => {
  //   if (quest.questCode === QuestCodes.CHECK_IN) {
  //     handleQuestSubmit(quest.questCode)
  //   } else {
  //     setSelectedQuestCode(quest.questCode)
  //     switch (quest.questCode) {
  //       case QuestCodes.VISIT_WEBSITE:
  //         setConfirmDialogContent('This action will redirect to other channel!')
  //         break;
  //       case QuestCodes.YOUTUBE:
  //         setConfirmDialogContent('This action will redirect to other platform!')
  //         break;
  //       default:
  //         break;
  //     }
  //   }

  //   setConfirmDialog(true)
  // }
  const handleQuestSubmit = async (quest: Quest) => {
    setCurrentQuest(quest);
    switch (quest.questCode) {
      case QuestCodes.CHECK_IN:
        // webApp.openLink(quest.visitUrl);
        await handleCheckInQuest();
        break;
      case QuestCodes.VISIT_WEBSITE:
        webApp.openLink(quest.visitUrl);
        await handleVisitWebsiteQuest();
        break;
      // case QuestCodes.YOUTUBE:
      //   webApp.openLink(quest.visitUrl);
      //   await handleYoutubeQuest();
      //   break;
      case QuestCodes.JOIN_TELEGRAM_CHAT:
        await handleJoinTelegramChat();
        break;
      case QuestCodes.JOIN_TELEGRAM_OFFICIAL_ANNOUNCEMENT:
        await handleJoinTelegramOfficialAnnouncement();
        break;
      case QuestCodes.FOLLOW_TWITTER:
        webApp.openLink(quest.visitUrl);
        await handleFollowTwitter();
        break;
      case QuestCodes.SHARE_LINKTREE:
        webApp.openLink("https://t.me/share?url=" + encodeURI(quest.visitUrl));
        await handleShareLinktreeQuest();
      case QuestCodes.VISIT_TELEGRAM_OFFICIAL_ANNOUNCEMENT:
        webApp.openLink(quest.visitUrl);
        await handleVisitTelegramAnnouncementQuest();
        break;
      case QuestCodes.VISIT_TELEGRAM_CHAT:
        webApp.openLink(quest.visitUrl);
        await handleVisitTeleramChatQuest();
        break;
      case QuestCodes.VISIT_TWITTER:
        webApp.openLink(quest.visitUrl);
        await handleVisitTwitterQuest();
        break;
      case QuestCodes.SPIN_TICKET:
        await handleSpinTicketQuest();
        break;
      case QuestCodes.RAID_TICKET:
        await handleRaidTicketQuest();
        break;
      case QuestCodes.ALL_DAILY_QUESTS:
        await handleAllDailyQuests();
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
              <div className="uppercase font-semibold">Daily Task</div>
            </div>
            <div
              onClick={handleAchievementTabClick}
              className={`absolute cursor-pointer border-b-0 left-1/2 translate-x-[5px] border-2 px-6 py-1 bg-[#edc6a9] border-[#edc6a9] -translate-y-[20px] rounded-t-xl text-orange-90 ${
                activeTab === "Social" ? isActive : ""
              }`}
            >
              <div className="uppercase font-semibold"> Social Task</div>
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
                          type: quest.reward.type,
                          quantity: quest.reward.value,
                        }}
                        button={{
                          text: "Check",
                          onClick: () => handleQuestSubmit(quest),
                        }}
                        isDone={quest.progress}
                        visitUrl={quest.needCheck ? quest.visitUrl : undefined}
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
                          type: quest.reward.type,
                          quantity: quest.reward.value,
                        }}
                        button={{
                          text: "Go",
                          onClick: () => handleQuestSubmit(quest),
                        }}
                        isDone={quest.progress}
                        visitUrl={quest.needCheck ? quest.visitUrl : undefined}
                      />
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {showReward && (
        <RewardQuest
          onClick={handleOnClick}
          reward={Number(currentQuest.reward.value)}
          rewardType={currentQuest.reward.type}
        />
      )}
      {/* {
        confirmDialog &&
        <ConfirmDialog onCancel={() => setConfirmDialog(false)} onAgree={() => handleQuestSubmit(selectedQuestCode!)} title="Quest Confirmation" content={confirmDialogContent} />
      } */}
    </div>
  );
}

export default Task;
