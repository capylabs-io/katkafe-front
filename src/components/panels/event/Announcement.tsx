import Button from "@/components/ui/Button";
import {
  CURRENT_EVENTS,
  TOKEN_SALE_END_DATE,
  TOKEN_SALE_START_DATE,
} from "@/constants/events";
import { useLayoutStore } from "@/stores/layoutStore";
import moment from "moment";
import React, { useMemo } from "react";
import "react-multi-carousel/lib/styles.css";
import Countdown from "react-countdown";
import { formatTimeUnit } from "@/utils/helpers";

export const Announcement = () => {
  const [
    setShowAnnouncementPanel,
    setIsAnnouncementPanelOpened,
    setShowEventPanel,
  ] = useLayoutStore((state) => [
    state.setShowAnnouncementPanel,
    state.setIsAnnouncementPanelOpened,
    state.setShowEventPanel,
  ]);

  const handleClose = () => {
    setShowAnnouncementPanel(false);
    setIsAnnouncementPanelOpened(false);
  };

  const handleEventClick = () => {
    handleClose();
    setShowEventPanel(true);
  };

  const currentEvent = useMemo(() => {
    if (!CURRENT_EVENTS || CURRENT_EVENTS.length === 0) return;
    const event = CURRENT_EVENTS.find((event) => {
      return (
        moment
          .utc()
          .isAfter(moment.utc(event.startDate, "DD/MM/YYYY").startOf("day")) &&
        moment
          .utc()
          .isBefore(moment.utc(event.endDate, "DD/MM/YYYY").endOf("day"))
      );
    });
    if (!event) return CURRENT_EVENTS[CURRENT_EVENTS.length - 1];
    return event;
  }, []);

  const isTokenSaleStarted = useMemo(() => {
    if (!TOKEN_SALE_START_DATE) return false;
    return moment.utc().isAfter(moment.utc(TOKEN_SALE_START_DATE));
  }, []);

  const isTokenSaleEnded = useMemo(() => {
    if (!TOKEN_SALE_START_DATE) return false;
    return moment.utc().isAfter(moment.utc(TOKEN_SALE_START_DATE));
  }, []);

  const countdownTime = useMemo(() => {
    if (!isTokenSaleStarted) return TOKEN_SALE_START_DATE;
    return TOKEN_SALE_END_DATE;
  }, [isTokenSaleStarted]);

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    return (
      <div className="flex items-center gap-x-2 text-lg">
        <div className="rounded-lg w-10 h-10 flex items-center justify-center border border-gray-30 bg-orange-20">
          {formatTimeUnit(hours + days * 24)}
        </div>
        <span>:</span>
        <div className="rounded-lg w-10 h-10 flex items-center justify-center border border-gray-30 bg-orange-20">
          {formatTimeUnit(minutes)}
        </div>
        <span>:</span>
        <div className="rounded-lg w-10 h-10 flex items-center justify-center border border-gray-30 bg-orange-20">
          {formatTimeUnit(seconds)}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#2e2e2e] bg-opacity-65 w-full h-full absolute z-20 p-4 top-0 flex items-center justify-center">
      <div className="rounded-3xl border-solid border-orange-90 border-4 !min-h-[472px] h-[75%] w-[95%] mt-4">
        <div className="rounded-[21px] border-solid border-orange-30 border-4 bg-orange-30 h-full relative">
          <div className="absolute -right-[15px] -top-[13px] bg-[#fffde9] rounded-full border-[#ededed] cursor-pointer">
            <img
              className="w-6 h-6"
              src="/images/btn-close.png"
              alt=""
              onClick={handleClose}
            />
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 -translate-y-[28px] border-2 px-6 py-2 border-orange-90 bg-orange-10 rounded-t-xl text-orange-90">
            <div className="uppercase font-semibold">Announcement</div>
          </div>

          <span className="flex justify-between gap-2 absolute top-[14px] w-[90%] left-1/2 -translate-x-1/2">
            <p className="bg-red-10 h-[2px] w-[13%]"></p>
            <p className="bg-red-10 h-[2px] w-[70%]"></p>
            <p className="bg-red-10 h-[2px] w-[13%]"></p>
          </span>

          <div className="flex flex-col items-center w-full bg-[#fffeec] h-[calc(100%-32px)] rounded-b-[20px] rounded-t border border-gray-20 absolute z-10 overflow-y-auto mt-8">
            {currentEvent && (
              <div className="border-b border-gray-20 pb-3">
                <div className="text-center font-semibold my-2">
                  Current Event
                </div>
                <div>
                  <img
                    className="w-full max-h-[240px]"
                    src={currentEvent.imgUrl}
                    alt="event-pic"
                  />
                  <div className="px-3 mt-2 text-center">
                    <div>{currentEvent.title}</div>
                    <div className="text-bodyMd text-orange-90">
                      {currentEvent.startDate}
                    </div>
                  </div>
                </div>
                {/* <Button customClassNames="!min-h-7 !h-7 max-w-fit mx-auto mt-2">
                  See all
                </Button> */}
              </div>
            )}
            <div className="p-2 flex flex-col justify-center items-center">
              <div className="mb-3 text-center text-bodyLg">
                {!isTokenSaleStarted
                  ? "Solanium Token Sale will start after"
                  : isTokenSaleEnded
                  ? "Solanium Token Sale will end after"
                  : "Solanium Token Sale ended"}
              </div>
              <Countdown
                date={moment(countdownTime).unix() * 1000}
                renderer={renderer}
              />
              <Button
                customClassNames="!min-h-8 !h-8 max-w-fit mx-auto mt-4"
                onClick={handleEventClick}
              >
                More Detail
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
