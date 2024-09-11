import React, { useEffect, useState } from "react";
import Button from "../../ui/Button";
import { useLayoutStore } from "@/stores/layoutStore";
import { useFetchFriends } from "@/lib/hooks/friend/useFriend";
import CardBarista from "@/components/ui/CardBarista";
import { useUserStore } from "@/stores/userStore";
import Image from "next/image";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { getInviteUrl } from "@/requests/user";
import { useRankConfigs } from "@/lib/hooks/rank/useRankConfigs";
import CardBonus from "@/components/ui/CardBonus";
import { useFetchRanks } from "@/lib/hooks/rank/useRank";
import { useLoadingStore } from "@/stores/LoadingStore";
import { Loading } from "@/components/ui/Loading";
import { useSnackBarStore } from "@/stores/SnackBarStore";

export const TABS = {
  FRIENDLIST: "Friendlist",
  INVITE: "Invite Info",
};

const Friend: React.FC = () => {
  const isActive = "!py-2 !-translate-y-[28px] !border-orange-90 !bg-orange-10";
  const [activeTab, setActiveTab] = useState(TABS.FRIENDLIST);
  const [inviteUrl, setInviteUrl] = useState("");
  const [showNotiCoppyRight, setShowNotiCoppyRight] = useState(false);

  const [setShowFriendPanel] = useLayoutStore((state) => [
    state.setShowFriendPanel,
  ]);
  const user = useUserStore((state) => state.user);

  const [show, hide] = useLoadingStore((state) => [state.show, state.hide]);
  const [showSnackbar] = useSnackBarStore((state) => [state.show]);

  const { friends } = useFetchFriends();
  const [rankConfigs, fetchRankConfigs] = useRankConfigs();
  const { claimRankReward } = useFetchRanks();

  const handleClose = () => {
    setShowFriendPanel(false);
  };

  const handleClaim = async (id: string) => {
    try {
      show();
      const body = {
        rankConfigId: id,
      };
      await claimRankReward(body);
      await fetchRankConfigs();
      showSnackbar("Claim Successfully!");
    } catch (error) {
      console.error("Error claiming", error);
      showSnackbar("Claim Fail!");
    } finally {
      hide();
    }
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleInviteUrl = async () => {
    try {
      show();
      const response = await getInviteUrl();
      if (response.inviteUrl) {
        setInviteUrl(response.inviteUrl);
      }
      showSnackbar("Copied to clipboard!");
    } catch (error) {
      console.error("Error fetching", error);
    } finally {
      hide();
    }
  };

  useEffect(() => {
    fetchRankConfigs();
    // if using fetchRankConfigs inside dependencies, it will cause infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

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
                <div>
                  <div className="w-[320px] relative">
                    <div className="flex justify-between mt-2">
                      <div className="flex items-center gap-2 bg-[#EEEDD8] border-[#DDDCC9] border w-fit rounded px-2">
                        <Image
                          width={16}
                          height={16}
                          src="/images/friend.png"
                          alt=""
                        />
                        <div>{user?.referralCounter}</div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between items-center border-orange-20 rounded-lg p-2 mb-1">
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
                    {friends?.referralList &&
                    friends.referralList.length > 0 ? (
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
                              referralReward={friend.referralReward}
                              bean={"0"}
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex justify-center items-center bg-orange-60 border border-orange-20 h-12 rounded-lg">
                        <div className="text-center text-gray-60 text-bodyMd">
                          You haven&apos;t invited any friends yet
                        </div>
                      </div>
                    )}
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
            <div className="bg-orange-10 rounded-b-[20px] rounded-t border border-gray-20 absolute z-10 h-[calc(100%-32px)] p-2 mt-8 w-full flex flex-col">
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
              <div className="w-full flex flex-col mt-2">
                <div className="text-center text-bodyXl text-gray-40 mb-2">
                  Friend level up bonus
                </div>
                <div className="bg-[#f7f6dc] flex flex-col justify-between items-center border-orange-20 border rounded-lg p-2 max-h-[230px] overflow-y-auto overflow-x-hidden">
                  <div className="justify-between w-full grid grid-cols-10 mb-1 text-bodyMd text-gray-40">
                    <span className="text-center col-span-4">Level up</span>
                    <span className="text-center col-span-3">Users</span>
                    <span className="text-center col-span-3">Reward</span>
                  </div>
                  <div className="h-full overflow-y-auto">
                    <div className="flex flex-col bg-orange-10 border-[#e8ddbd] border rounded-lg">
                      {rankConfigs.map((rankConfig) => (
                        <div
                          key={rankConfig._id}
                          // className="w-full h-full cursor-pointer"
                          className="w-full h-full cursor-pointer bg-[#f7f5dc] border-[#e8ddbd] border-b first:rounded-t-lg last:border-b-0 last:rounded-b-lg"
                        >
                          <CardBonus
                            rankConfig={rankConfig}
                            onClick={() => handleClaim(rankConfig._id)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Friend;
