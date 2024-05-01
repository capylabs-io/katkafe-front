import React, { useEffect, useState } from "react";
import Button from "../../ui/Button";
import { useLayoutStore } from "@/stores/layoutStore";
import { useFriendStore } from "@/stores/friendStore";
import { useFetchFriends } from "@/lib/hooks/useFriend";
import CardFriend from "@/components/ui/CardFriend";

const Friend: React.FC = () => {
  const [setShowFriendPanel] = useLayoutStore((state) => [
    state.setShowFriendPanel,
  ]);
  const handleClose = () => {
    setShowFriendPanel(false);
  };
  const [activeTab, setActiveTab] = useState("Friend");
  const [friends, setCurrentFriend] = useFriendStore((state) => [
    state.friends,
    state.setCurrentFriend,
  ]);

  const isActive = "!py-2 !-translate-y-[28px] !border-[#5e5745] !bg-[#fffeec]";
  const handleFriendTabClick = () => {
    setActiveTab("Friend");
  };

  const handleLeaderTabClick = () => {
    setActiveTab("Leader");
  };

  const { fetchFriends } = useFetchFriends();

  useEffect(() => {
    fetchFriends();
  }, []);

  return (
    <div className="bg-[#2e2e2e] w-full h-full absolute z-10 p-4 top-0">
      <div className="rounded-3xl border-solid border-[#5e5745] border-4 h-[calc(100%-16px)] mt-4">
        <div className="rounded-[21px] border-solid border-[#ffedbb] border-4 bg-[#ffedbb] h-full relative">
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
              onClick={handleFriendTabClick}
              className={`absolute cursor-pointer left-1/2 -translate-x-[140px] border-2 border-b-0 px-6 py-1 bg-[#edc6a9] border-[#edc6a9] -translate-y-[20px] rounded-t-xl text-[#5e5745] ${
                activeTab === "Friend" ? isActive : ""
              }`}
            >
              Friendzone
            </div>
            <div
              onClick={handleLeaderTabClick}
              className={`absolute cursor-pointer left-1/2 translate-x-[10px] border-2 border-b-0 px-6 py-1 bg-[#edc6a9] border-[#edc6a9] -translate-y-[20px] rounded-t-xl text-[#5e5745] ${
                activeTab === "Leader" ? isActive : ""
              }`}
            >
              Top barista
            </div>
          </div>
          <span className="flex justify-between gap-2 absolute top-[14px] w-[90%] left-1/2 -translate-x-1/2">
            <p className="bg-[#e3b695] h-[2px] w-[13%]"></p>
            <p className="bg-[#e3b695] h-[2px] w-[70%]"></p>
            <p className="bg-[#e3b695] h-[2px] w-[13%]"></p>
          </span>
          {activeTab === "Leader" && (
            <div className="bg-[#fffeec] rounded-b-[20px] flex flex-wrap justify-center rounded-t border border-[#b5b5b5] w-full overflow-y-auto h-[calc(100%-32px)] p-4 mt-8">
              <div className="bg-[url('/images/bg-name.png')] w-[170px] h-[35px] bg-contain bg-center bg-no-repeat text-center mb-6">
                <div className="text-center uppercase">deal of the day</div>
              </div>
              <div className="w-full flex flex-wrap gap-10 justify-center">
                {friends.map((friend) => (
                  <div
                    key={friend.id}
                    className="flex flex-col items-center gap-4"
                  >
                    <div className="w-[100px] h-[130px]">
                      {/* <CatCard cat={friend} /> */}
                    </div>
                    <div className="w-[88px] h-[30px]">
                      {/* <Button>{friend.price} $</Button> */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === "Friend" && (
            <>
              <div
                className="bg-[#fffeec] rounded-b-[20px] rounded-t border border-[#b5b5b5] absolute z-10 h-[calc(100%-32px)] p-2 mt-8 w-full flex flex-col justify-between"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "#666666 #ffe",
                }}
              >
                <div className="w-[320px] h-[164px] relative">
                  <img
                    className="absolute top-1 right-1 w-8 h-8"
                    src="/images/btn-invite.png"
                    alt=""
                  />
                  <img
                    className="w-full h-full rounded-lg"
                    src="/images/bg-deploy.png"
                    alt=""
                  />
                </div>
                <div className="text-center mt-6 mb-4 text-xl">Friend list</div>
                <div className="overflow-y-auto">
                  <div className="flex flex-col gap-2">
                    {friends.map((friend) => (
                      <div
                        key={friend.id}
                        className="w-full h-full cursor-pointer"
                      >
                        <CardFriend friend={friend} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-3 justify-center flex">
                  <div className="w-[172px] h-[39px]">
                    <Button>Invite Friend</Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Friend;