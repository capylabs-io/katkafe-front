"use client";

import { useState, useRef, useEffect, PropsWithChildren } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLayoutStore } from "@/stores/layoutStore";
import { MenuButton } from "../MenuButton";
import Image from "next/image";
import { Pixelify_Sans } from "next/font/google";
import { SHOW_ANNOUNCEMENT } from "@/constants/events";
import { CommonDot } from "../CommonDot";

const defaultIconSize = 44;
const defaultIconPath = "/icons/menu/";
const pixelify = Pixelify_Sans({ subsets: ["latin"] });

type MenuItemProps = {
  imgUrl: string;
  label: string;
  imgWidth?: number;
  imgHeight?: number;
  onClick?: () => void;
};

const MenuItem = ({
  imgUrl,
  label,
  imgWidth = 44,
  imgHeight = 44,
  onClick,
}: MenuItemProps) => {
  const handleItemClick = () => {
    onClick && onClick();
  };

  return (
    <div
      className="relative flex items-center justify-center overflow-x-visible cursor-pointer pt-0.5"
      style={{
        ...pixelify.style,
      }}
      onClick={handleItemClick}
    >
      <div
        className="px-[3px]"
        style={{
          width: imgWidth,
          height: imgHeight,
        }}
      >
        <Image
          src={imgUrl}
          width={imgWidth}
          height={imgHeight}
          alt={"menu-icon"}
        />
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 text-center text-white text-[16px] font-bold drop-shadow-[0px_1px_black] text-stroke-[0.25px] text-stroke-[#6f6f6f] -bottom-2 uppercase bg-black bg-opacity-30 px-2 rounded-md">
        {label}
      </div>
    </div>
  );
};

export const InGameMenu = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [
    setShowManagePanel,
    setShowStaffPanel,
    setShowShopPanel,
    setShowRestaurantPanel,
    setShowBoostPanel,
    setShowEventPanel,
    setShowRedeemPanel,
    setMiniGamePanel,
    setShowWalletPanel,
    setShowTransferPanel,
    setShowQuestPanel,
    setShowLeaderboardPanel,
    setShowRollPanel,
    setShowGuildPanel,
    setShowFriendPanel,
    setShowErrorPanel,
    isAnyPanelOpen,
  ] = useLayoutStore((state) => [
    state.setShowManagePanel,
    state.setShowStaffPanel,
    state.setShowShopPanel,
    state.setShowRestaurantPanel,
    state.setShowBoostPanel,
    state.setShowEventPanel,
    state.setShowRedeemPanel,
    state.setMiniGamePanel,
    state.setShowWalletPanel,
    state.setShowTransferPanel,
    state.setShowQuestPanel,
    state.setShowLeaderboardPanel,
    state.setShowRollPanel,
    state.setShowGuildPanel,
    state.setShowFriendPanel,
    state.setShowErrorPanel,
    state.isAnyPanelOpen,
  ]);

  const menuItems = [
    {
      icon: "ic-wallet.png",
      label: "WALLET",
      onClick: () => setShowWalletPanel(true),
    },
    {
      icon: "ic-transfer.png",
      label: "Transfer",
      onClick: () => setShowTransferPanel(true),
      showNotice: true,
    },
    {
      icon: "ic-event.png",
      label: "EVENT",
      onClick: () => setShowEventPanel(true),
      showNotice: true,
    },
    {
      icon: "ic-voucher.png",
      label: "REDEEM",
      onClick: () => setShowRedeemPanel(true),
    },
    {
      icon: "ic-booster.png",
      label: "BOOSTER",
      onClick: () => setShowBoostPanel(true),
    },
    {
      icon: "ic-quest.png",
      label: "QUEST",
      onClick: () => setShowQuestPanel(true),
    },
    {
      icon: "ic-leaderboard.png",
      label: "RANK",
      onClick: () => setShowLeaderboardPanel(true),
    },
    {
      icon: "ic-friend.png",
      label: "FRIEND",
      onClick: () => setShowFriendPanel(true),
    },
    //   {
    //     icon: "ic-buddy.png",
    //     label: "BUDDY",
    //   },
  ];

  useEffect(() => {
    const checkScroll = () => {
      if (scrollRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        setCanScrollUp(scrollTop > 0);
        setCanScrollDown(scrollTop < scrollHeight - clientHeight - 1);
      }
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", checkScroll);
      checkScroll(); // Initial check
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener("scroll", checkScroll);
      }
    };
  }, [isOpen]);

  const handleScroll = (direction: "up" | "down") => {
    if (scrollRef.current) {
      const scrollAmount = 100; // Adjust this value to control scroll speed
      scrollRef.current.scrollBy({
        top: direction === "up" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative font-mono">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="absolute bottom-full border border-gray-500 mb-2 left-0 w-[48px] rounded-lg bg-[#FFFDE9] pb-3 pt-1 shadow-lg overflow-x-visible"
          >
            {canScrollUp && (
              <div className="absolute top-2 left-0 z-10 flex w-full justify-center">
                <ChevronUp
                  size={64}
                  onClick={() => handleScroll("up")}
                  color="black"
                />
              </div>
            )}
            {/* <ScrollArea
              className="[&>div>div]:!block overflow-x-visible"
              ref={scrollRef}
            > */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.05,
                  },
                },
              }}
              className="grid grid-cols-1 gap-4 overflow-x-visible"
            >
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  variants={{
                    hidden: { opacity: 0, y: -20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.98 }}
                  className="overflow-x-visible"
                >
                  <div className="relative">
                    <MenuItem
                      imgUrl={`${defaultIconPath}${item.icon}`}
                      label={item.label}
                      imgHeight={defaultIconSize}
                      imgWidth={defaultIconSize}
                      onClick={item.onClick}
                    />
                    {SHOW_ANNOUNCEMENT && item.showNotice && (
                      <div className="absolute top-0 right-0 pointer-events-none">
                        <CommonDot />
                      </div>
                    )}
                  </div>
                </motion.button>
              ))}
            </motion.div>
            {/* </ScrollArea> */}
            {canScrollDown && (
              <div className="absolute bottom-2 left-0 z-10 flex w-full justify-center">
                <ChevronDown
                  className="size-4"
                  onClick={() => handleScroll("down")}
                />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
