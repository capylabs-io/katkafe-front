import React, { useEffect, useState } from "react";
import Button from "../../ui/Button";
import { useLayoutStore } from "@/stores/layoutStore";
import { useFetchFriends } from "@/lib/hooks/friend/useFriend";
import CardBarista from "@/components/ui/CardBarista";
import { useFetchBaristas } from "@/lib/hooks/friend/useBarista";
import { useFetchUser } from "@/lib/hooks/useUser";
import { useUserStore } from "@/stores/userStore";
import Image from "next/image";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { getInviteUrl } from "@/requests/user";
import { useRankConfigs } from "@/lib/hooks/rank/useRankConfigs";
import CardBonus from "@/components/ui/CardBonus";

export const TABS = {
  FRIENDLIST: "Friendlist",
  INVITE: "Invite Info",
};

const Friend: React.FC = () => {
  const [setShowFriendPanel] = useLayoutStore((state) => [
    state.setShowFriendPanel,
  ]);
  const handleClose = () => {
    setShowFriendPanel(false);
  };
  const [activeTab, setActiveTab] = useState(TABS.FRIENDLIST);
  const { friends } = useFetchFriends();
  const [rankConfigs, fetchRankConfigs] = useRankConfigs();
  const user = useUserStore((state) => state.user);
  const [setShowInviteInfoPanel] = useLayoutStore((state) => [
    state.setShowInviteInfoPanel,
  ]);

  const [inviteUrl, setInviteUrl] = useState("");
  const [showNotiCoppyRight, setShowNotiCoppyRight] = useState(false);

  const isActive = "!py-2 !-translate-y-[28px] !border-orange-90 !bg-orange-10";
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleInviteUrl = async () => {
    try {
      const response = await getInviteUrl();
      if (response.inviteUrl) {
        setInviteUrl(response.inviteUrl);
      }
      setShowNotiCoppyRight(true);
      setTimeout(() => {
        setShowNotiCoppyRight(false);
      }, 2000);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  const { fetchBaristas } = useFetchBaristas();
  const { fetchUser } = useFetchUser();

  useEffect(() => {
    fetchBaristas();
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("friends", friends);

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
              onClick={() => handleTabClick(TABS.FRIENDLIST)}
              className={`absolute cursor-pointer left-1/2 -translate-x-[145px] border-2 border-b-0 px-6 py-1 bg-[#edc6a9] border-[#edc6a9] -translate-y-[20px] rounded-t-xl text-orange-90 ${
                activeTab === TABS.FRIENDLIST ? isActive : ""
              }`}
            >
              {TABS.FRIENDLIST}
            </div>
            <div
              onClick={() => handleTabClick(TABS.INVITE)}
              className={`absolute cursor-pointer left-1/2 translate-x-[0px] border-2 border-b-0 px-6 py-1 bg-[#edc6a9] border-[#edc6a9] -translate-y-[20px] rounded-t-xl text-orange-90 ${
                activeTab === TABS.INVITE ? isActive : ""
              }`}
            >
              {TABS.INVITE}
            </div>
          </div>
          <span className="flex justify-between gap-2 absolute top-[14px] w-[90%] left-1/2 -translate-x-1/2">
            <p className="bg-red-10 h-[2px] w-[13%]"></p>
            <p className="bg-red-10 h-[2px] w-[70%]"></p>
            <p className="bg-red-10 h-[2px] w-[13%]"></p>
          </span>
          {activeTab === TABS.FRIENDLIST && (
            <>
              <div className="bg-orange-10 rounded-b-[20px] rounded-t border border-gray-20 absolute z-10 h-[calc(100%-32px)] p-2 mt-8 w-full flex flex-col justify-between">
                <div className="w-[320px] h-[164px] relative">
                  <div className="flex justify-between mb-4 mt-2">
                    <div className="flex items-center gap-2 bg-[#EEEDD8] border-[#DDDCC9] border w-fit rounded pr-4">
                      <img className="w-6 h-6" src="/images/kbuck.png" alt="" />
                      <div>{user?.referralCounter}</div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between items-center border-orange-20 border rounded-lg p-2 mb-1">
                    <div className="flex flex-col justify-between items-center w-full mb-1">
                      <div className="flex justify-center mb-2">
                        {friends?.userRank.name}
                      </div>
                      <Image
                        src={friends?.userRank.imgUrl || ""}
                        alt="rank icon"
                        width={80}
                        height={80}
                      />
                    </div>
                    {/* <div className="flex justify-between items-center w-full">
                      <div className="flex flex-col gap-1">
                        <div>Invite Regular user</div>
                        <div className="flex items-center gap-1">
                          <div className="w-4 h-4">
                            <img src="/images/kbuck.png" alt="" />
                          </div>
                          <span className="text-[#6F6F6F]">
                            +3 For you and your Friend
                          </span>
                        </div>
                      </div>
                      <div>
                        <img src="/images/info-2.png" alt="" className="w-10" />
                      </div>
                    </div> */}
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="text-center mb-2 text-xl">Friend list</div>
                  <div className="text-center mb-2 text-md">
                    Invite more friend to get to the top
                  </div>
                </div>
                <div className="overflow-y-auto">
                  <div className="flex flex-col bg-orange-10 border-[#e8ddbd] border rounded-lg">
                    {friends?.referralList.map((friend, index) => (
                      <div
                        key={friend._id}
                        className="w-full h-full cursor-pointer bg-[#f7f6dc] border-[#e8ddbd] border-b first:rounded-t-lg last:border-b-0 last:rounded-b-lg"
                      >
                        <CardBarista
                          type={TABS.FRIENDLIST}
                          id={index}
                          avatarUrl={friend.avatarUrl}
                          username={friend.username}
                          referralCounter={friend.referralCounter}
                          bean={"0"}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-3 justify-center flex">
                  <div className="w-[172px] h-[39px]">
                    <CopyToClipboard text={inviteUrl}>
                      <Button onClick={handleInviteUrl}>Invite Friend</Button>
                    </CopyToClipboard>
                  </div>
                </div>
              </div>
            </>
          )}
          {activeTab === TABS.INVITE && (
            <div className="bg-orange-10 rounded-b-[20px] rounded-t border border-gray-20 absolute z-10 h-[calc(100%-32px)] p-2 mt-8 w-full flex flex-col justify-between">
              {/* <div className="mt-4 w-[120px] h-[120px]">
                <img src="/images/barista.png" alt="" />
              </div>
              <div className="text-xl mt-2">TOP BARISTA</div>
              <div className="text-sm mb-6">
                Invite more friend to get to the top
              </div>
              <div className="overflow-y-auto w-full">
                <div className="flex flex-col bg-orange-10 border-[#e8ddbd] border rounded-lg">
                  {friends?.referralList.map((friend, index) => (
                    <div
                      key={friend._id}
                      className="w-full h-full cursor-pointer bg-[#f7f5dc] border-[#e8ddbd] border-b first:rounded-t-lg last:border-b-0 last:rounded-b-lg"
                    >
                      <CardBarista
                        type={TABS.FRIENDLIST}
                        id={index}
                        avatarUrl={friend.avatarUrl}
                        username={friend.username}
                        referralCounter={friend.referralCounter}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-3 justify-center flex">
                <div className="w-[172px] h-[39px]">
                  <Button>Invite Friend</Button>
                </div>
              </div> */}
              <div className="w-full">
                <div className="text-center text-bodyXl text-gray-50 mb-2">
                  Invite friend to get bonus
                </div>
                <div className="flex flex-col justify-between items-center border-orange-20 border rounded-lg p-2 mb-1">
                  <div className="flex justify-between items-center w-full mb-1">
                    <div className="flex flex-col gap-1 text-bodyMd text-gray-40">
                      <div>Invite Regular user</div>
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-4">
                          <img src="/images/kbuck.png" alt="" />
                        </div>
                        <span className="text-gray-30">
                          +500 For you and your Friend
                        </span>
                      </div>
                    </div>
                    <div>
                      <img src="/images/info-1.png" alt="" className="w-10" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <div className="flex flex-col gap-1 text-bodyMd text-gray-40">
                      <div>Invite Regular user</div>
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-4">
                          <img src="/images/kbuck.png" alt="" />
                        </div>
                        <span className="text-gray-30">
                          +1000 For you and your Friend
                        </span>
                      </div>
                    </div>
                    <div>
                      <img src="/images/info-2.png" alt="" className="w-10" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col">
                <div className="text-center text-bodyXl text-gray-40 mb-4">
                  Friend level up bonus
                </div>
                <div className="bg-[#f7f6dc] flex flex-col justify-between items-center border-orange-20 border rounded-lg p-2 max-h-[190px] overflow-y-auto overflow-x-hidden">
                  <div className="justify-between w-full grid grid-cols-10 mb-1 text-bodyMd text-gray-40">
                    <span className="text-center col-span-4">Level up</span>
                    <span className="text-center col-span-3">Users</span>
                    <span className="text-center col-span-3">Reward</span>
                  </div>
                  <div className="overflow-y-auto">
                    <div className="flex flex-col bg-orange-10 border-[#e8ddbd] border rounded-lg">
                      {rankConfigs.map((rankConfig) => (
                        <div
                          key={rankConfig._id}
                          // className="w-full h-full cursor-pointer"
                          className="w-full h-full cursor-pointer bg-[#f7f5dc] border-[#e8ddbd] border-b first:rounded-t-lg last:border-b-0 last:rounded-b-lg"
                        >
                          <CardBonus rankConfig={rankConfig} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-3 justify-center flex">
                  <div className="w-[172px] h-[39px]">
                    <Button>Claim Reward</Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {showNotiCoppyRight && (
        <div className="bg-[#000] opacity-70 text-bodyLg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 text-white px-4 py-2 w-max">
          Copied to clipboard!
        </div>
      )}
    </div>
  );
};

export default Friend;
