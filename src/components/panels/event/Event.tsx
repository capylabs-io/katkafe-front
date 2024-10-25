import CardTask from "@/components/ui/CardTask";
import { useLayoutStore } from "@/stores/layoutStore";
import React, { useEffect, useRef, useState } from "react";
import { useLoadingStore } from "@/stores/LoadingStore";
import RewardQuest from "@/components/ui/RewardQuest";
import { useSnackBarStore } from "@/stores/SnackBarStore";
import { Quest, RewardType } from "@/types/quest";
import { useWebApp } from "@zakarliuka/react-telegram-web-tools";
import { useEvent } from "@/lib/hooks/event/useEvent";
import { get, set } from "lodash";
import { EventReward, EventRewardType, EventType } from "@/types/event";
import { doEventQuest } from "@/requests/event/events";
import { RARITY_CONFIG, Staff } from "@/types/common-types";
import { CatRarity } from "@/types/cat-config";
import { getOneStaff } from "@/requests/staff";
import AwardPanel from "@/components/ui/AwardPanel";
import { EventRewardInfo } from "@/components/ui/event/EventRewardInfo";
import { useFetchStaffs } from "@/lib/hooks/cat/useStaff";
import classNames from "classnames";

type Props = {};

const TAB = {
  INFO: "Info",
  QUEST: "Quest",
};

function EventPanel({}: Props) {
  const isActive = "!py-2 !-translate-y-[28px] !border-orange-90 !bg-orange-10";
  const [activeTab, setActiveTab] = useState(TAB.INFO);
  const [showReward, setShowReward] = useState(false);
  const [showEventReward, setShowEventReward] = useState(false);
  const [questReward, setQuestReward] = useState();
  const [eventReward, setEventReward] = useState();
  const [rewardCat, setRewardCat] = useState<Staff>();

  const eventQuestSectionRefs = useRef({});
  const [currentEvent, setCurrentEvent] = useState<EventType>();

  const [setShowEventPanel] = useLayoutStore((state) => [
    state.setShowEventPanel,
  ]);
  const [showLoading, hideLoading] = useLoadingStore((state) => [
    state.show,
    state.hide,
  ]);
  const [showSnackbar] = useSnackBarStore((state) => [state.show]);
  const { fetchStaffs } = useFetchStaffs();

  const { events, fetchEvents } = useEvent();
  const webApp = useWebApp();

  const handleInfoTabClick = () => {
    setActiveTab(TAB.INFO);
  };

  const handleQuestTabClick = () => {
    setActiveTab(TAB.QUEST);
  };

  const handleQuestSubmit = async (quest: Quest) => {
    if (!quest) return;
    try {
      showLoading();
      //TODO: call finish quest
      const res = await doEventQuest(quest.questCode);
      if (!res) {
        showSnackbar("Claim quest failed!");
        return;
      }
      await fetchEvents();
      if (res.quest) {
        showSnackbar("Quest completed!");
        setQuestReward(res.quest);
        setShowReward(true);
      }
      if (res.event && res.event.length > 0) {
        const catReward = res.event.find(
          (reward) =>
            reward.type === EventRewardType.CAT ||
            reward.type === EventRewardType.SPECIAL_CAT
        );
        if (catReward) {
          const rewardCat = await getOneStaff(catReward.value);
          setRewardCat(rewardCat);
        }
        await fetchStaffs();
        showSnackbar("Event completed!");
        setEventReward(res.event);
        setShowEventReward(true);
      }
      if (quest.visitUrl) webApp.openLink(quest.visitUrl);
    } catch (error) {
      console.error(error);
      showSnackbar("Claim quest failed!");
    } finally {
      hideLoading();
    }
  };

  const closeQuestReward = () => {
    setShowReward(false);
  };

  const closeEventReward = () => {
    setShowEventReward(false);
  };

  const handleClose = (e: any) => {
    e.stopPropagation();
    setShowEventPanel(false);
  };

  const handleEventInfoClick = (e: EventType) => {
    if (!e || !e.reward || !e.quests || e.quests.length === 0) return;
    handleQuestTabClick();
    setCurrentEvent(e);
    // handleScrollToSection(e._id);
  };

  useEffect(() => {
    if (activeTab === TAB.QUEST && currentEvent) {
      handleScrollToSection(currentEvent._id);
    } else if (activeTab === TAB.INFO) {
      setCurrentEvent(undefined);
    }
  }, [activeTab, currentEvent]);

  const handleScrollToSection = (sectionId) => {
    const ref = eventQuestSectionRefs.current[sectionId];
    if (ref) {
      ref.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const tabs = (
    <div className="absolute flex gap-x-4 -translate-x-1/2 left-1/2 items-end">
      <div
        onClick={handleInfoTabClick}
        className={`cursor-pointer border-b-0 border-2 py-1 px-6 bg-[#edc6a9] border-[#edc6a9] -translate-y-[28px] rounded-t-xl text-orange-90 ${
          activeTab === TAB.INFO ? isActive : ""
        }`}
      >
        <div className="uppercase font-semibold">Info</div>
      </div>
      <div
        onClick={handleQuestTabClick}
        className={`cursor-pointer border-b-0 border-2 py-1 px-6 bg-[#edc6a9] border-[#edc6a9] -translate-y-[28px] rounded-t-xl text-orange-90 ${
          activeTab === TAB.QUEST ? isActive : ""
        }`}
      >
        <div className="uppercase font-semibold"> Quest</div>
      </div>
    </div>
  );

  const infoTabContent = (
    <div className="w-full flex flex-wrap gap-3 justify-start overflow-y-auto p-3">
      {events.map((e) => (
        <div
          className="bg-[#fffffa] border-black border rounded-lg w-full p-3 cursor-pointer"
          key={e._id}
          onClick={() => handleEventInfoClick(e)}
        >
          <img className="mb-2" src={e.logoUrl} alt="quest-info" />
          <div className="text-bodyLg">{e.name}</div>
          <div
            className="!font-light text-orange-90 text-bodyMd"
            dangerouslySetInnerHTML={{ __html: e.description }}
          ></div>
        </div>
      ))}
    </div>
  );

  const questTabContent = (
    <div className="w-full flex flex-col gap-y-3 divide-y overflow-y-auto p-3">
      {/* {quests.map((quest) => (
        <div key={quest._id} className="w-full flex flex-col items-center">
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
              onClick: () => handleQuestSubmit(quest),
            }}
            isDone={quest.progress}
            visitUrl={quest.needCheck ? quest.visitUrl : undefined}
          />
        </div>
      ))} */}
      {events
        .filter((e) => e.reward && e.quests && e.quests.length > 0)
        .map((e, index) => {
          const quests = get(e, "quests", []);
          const rewards = get(e, "reward", []);

          const isCompleted = quests.every((quest: Quest) => !!quest.progress);
          return (
            <div
              key={e._id}
              ref={(el) => (eventQuestSectionRefs.current[e._id] = el)}
              className={classNames(index !== 0 && "pt-2")}
            >
              <div className="text-center">{e.name}</div>
              {!isCompleted ? (
                <>
                  <div className="text-orange-90 text-center text-bodyMd">
                    Complete all the quests to get the reward
                  </div>
                  <div className="flex justify-center gap-x-2 my-1">
                    {rewards.map((reward: EventReward, index) => (
                      <EventRewardInfo reward={reward} key={index} />
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center text-orange-90 text-bodyMd">
                  You have completed all the quests and received the reward
                </div>
              )}
              <div className="flex flex-col gap-y-3 mt-2">
                {quests.map((quest: Quest) => (
                  <CardTask
                    key={quest._id}
                    type="task"
                    content={quest.name}
                    img={{
                      imgUrl: quest.imgUrl,
                      width: 24,
                      height: 24,
                    }}
                    reward={{
                      type: quest.reward.type,
                      quantity: get(quest, "reward.value", 0),
                    }}
                    button={{
                      text: "Go",
                      onClick: () => handleQuestSubmit(quest),
                    }}
                    isDone={quest.progress}
                    visitUrl={quest.needCheck ? quest.visitUrl : undefined}
                  />
                ))}
              </div>
            </div>
          );
        })}
    </div>
  );

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
          {tabs}
          <span className="flex justify-between gap-2 absolute top-[14px] w-[90%] left-1/2 -translate-x-1/2">
            <p className="bg-red-10 h-[2px] w-[13%]"></p>
            <p className="bg-red-10 h-[2px] w-[70%]"></p>
            <p className="bg-red-10 h-[2px] w-[13%]"></p>
          </span>
          <div className="bg-[#fff8de] w-full rounded-b-[20px] flex flex-col justify-between rounded-t border border-gray-20 absolute z-10 h-[calc(100%-32px)] overflow-hidden mt-8">
            {/* Daily tab */}
            {activeTab === TAB.INFO && infoTabContent}

            {/* Social Task tab */}
            {activeTab === TAB.QUEST && questTabContent}
          </div>
        </div>
      </div>
      {showReward && (
        <RewardQuest
          onClick={closeQuestReward}
          reward={get(questReward, "value")}
        />
      )}
      {showEventReward && (
        <AwardPanel
          handleClaim={closeEventReward}
          cat={rewardCat}
          rewards={eventReward}
        />
      )}
      {/* {
        confirmDialog &&
        <ConfirmDialog onCancel={() => setConfirmDialog(false)} onAgree={() => handleQuestSubmit(selectedQuestCode!)} title="Quest Confirmation" content={confirmDialogContent} />
      } */}
    </div>
  );
}

export default EventPanel;
