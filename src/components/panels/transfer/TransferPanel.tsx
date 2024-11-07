import { useLayoutStore } from "@/stores/layoutStore";
import React, { useState } from "react";
import { EmptyCatCard } from "./EmptyCatCard";
import { ChevronsRightIcon } from "lucide-react";
import Image from "next/image";
import { getIconPathByCurrencyType } from "@/utils/shop";
import { CURRENCY_TYPES } from "@/types/item";
import { DEFAULT_TRANSFER_FEE } from "@/constants/transfer";
import Button from "@/components/ui/Button";
import { useSnackBarStore } from "@/stores/SnackBarStore";
import { useStaffStore } from "@/stores/staffStore";
import { get, set } from "lodash";
import { AssignCatPanel } from "./AssignCatPanel";
import { Staff } from "@/types/common-types";
import StaffCard from "@/components/ui/StaffCard";
import { useConfirmDialogStore } from "@/stores/confirmDialogStore";
import CardInfo from "@/components/ui/CardInfo";
import { useLoadingStore } from "@/stores/LoadingStore";
import { useFetchStaffs } from "@/lib/hooks/cat/useStaff";
import { transferStaff } from "@/requests/staff";
import { TransferResult } from "./TransferResult";

const ObjectType = {
  ORIGINAL: "original",
  RECEIVER: "receiver",
};

export const TransferPanel = () => {
  const [originalCat, setOriginalCat] = useState<Staff>();
  const [receiverCat, setReceiverCat] = useState<Staff>();
  const [isAssigningCat, setIsAssigningCat] = useState(false);
  const [isAssigningReceiver, setisAssigningReceiver] = useState(false);
  const [showCardInfo, setShowCardInfo] = useState(false);
  const [showTransferResult, setShowTransferResult] = useState(false);
  const [activeCard, setActiveCard] = useState<string>();
  const { fetchStaffs } = useFetchStaffs();

  const [setShowTransferPanel] = useLayoutStore((state) => [
    state.setShowTransferPanel,
  ]);
  const showSnackbar = useSnackBarStore((state) => state.show);
  const showConfirm = useConfirmDialogStore((state) => state.show);
  const [showLoading, hideLoading] = useLoadingStore((state) => [
    state.show,
    state.hide,
  ]);

  const [autoActives, setAutoActives, staffs, isOneAssign, setCurrentStaff] =
    useStaffStore((state) => [
      state.autoActives,
      state.setAutoActives,
      state.staffs,
      state.isOneAssign,
      state.setCurrentStaff,
    ]);

  const staffNotAssign = staffs
    .filter(
      (staff) =>
        get(originalCat, "_id") !== staff._id &&
        get(receiverCat, "_id") !== staff._id
    )
    .sort((a, b) => b.level - a.level);

  const handleClose = () => {
    setShowTransferPanel(false);
  };

  const handleChooseCat = (isReceiver = false) => {
    setisAssigningReceiver(isReceiver);
    setIsAssigningCat(true);
  };

  const handleCardClick = (e: any, isReceiver = false) => {
    e.stopPropagation();
    if (isReceiver) {
      setActiveCard(ObjectType.RECEIVER);
    } else {
      setActiveCard(ObjectType.ORIGINAL);
    }
  };

  const handleTransferLevel = async () => {
    if (!originalCat || !receiverCat) {
      showSnackbar("Select original and receiver to transfer!");
      return;
    }

    if (receiverCat.level >= originalCat.level) {
      showSnackbar(
        "Receiver must be lower level than origin! Receiver must be lower level than origin!"
      );
      return;
    }

    try {
      showLoading();
      const res = await transferStaff(receiverCat._id, originalCat._id);
      const newReceiver = get(res, "destinationCat", receiverCat);
      const newOriginal = get(res, "sourceCat", originalCat);
      setReceiverCat(newReceiver);
      setOriginalCat(newOriginal);
      await fetchStaffs();
      showSnackbar("Transfer successfully!");
      setShowTransferResult(true);
    } catch (error) {
      console.error(error);
      showSnackbar("Transfer failed! Pleasy try again");
    } finally {
      hideLoading();
    }
  };

  const handleRemoveActive = () => {
    setActiveCard(undefined);
  };

  const onAssignCat = (cat: Staff) => {
    if (isAssigningReceiver) {
      setReceiverCat(cat);
    } else {
      setOriginalCat(cat);
    }
    setIsAssigningCat(false);
  };

  const handleConfirmRemoveCat = (isReceiver = false) => {
    showConfirm({
      title: "Remove Selected Cat",
      content: "Are you sure you want to remove the selected cat?",
      confirmText: "Remove",
      onConfirm: () => {
        if (isReceiver) setReceiverCat(null);
        else setOriginalCat(null);
      },
    });
  };

  const handleViewClick = (catId: string) => {
    const staff = staffs.find((staff) => get(staff, "_id") === catId);
    if (staff) {
      setCurrentStaff(staff);
    }
    setShowCardInfo(!showCardInfo);
  };

  const handleCloseResult = () => {
    reset();
  };

  const reset = () => {
    setShowTransferResult(false);
    setReceiverCat(undefined);
    setOriginalCat(undefined);
  };

  const transferPanel = (
    <div className="bg-[#2e2e2e] w-full h-full absolute z-10 p-4 top-0">
      <div className="rounded-3xl border-solid border-orange-90 border-4 h-[calc(100%-16px)] mt-4">
        <div
          className="rounded-[21px] border-solid border-orange-30 border-4 bg-orange-30 h-full relative"
          onClick={handleRemoveActive}
        >
          <div className="absolute -right-[15px] -top-[13px] bg-[#fffde9] rounded-full border-[#ededed] cursor-pointer">
            <img
              className="w-6 h-6"
              src="/images/btn-close.png"
              alt=""
              onClick={handleClose}
            />
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 -translate-y-[28px] border-2 px-6 py-2 border-orange-90 bg-orange-10 rounded-t-xl text-orange-90">
            <div className="uppercase font-semibold">Lvl Transfer</div>
          </div>

          <span className="flex justify-between gap-2 absolute top-[14px] w-[90%] left-1/2 -translate-x-1/2">
            <p className="bg-red-10 h-[2px] w-[13%]"></p>
            <p className="bg-red-10 h-[2px] w-[70%]"></p>
            <p className="bg-red-10 h-[2px] w-[13%]"></p>
          </span>

          <div className="flex flex-col items-center justify-between font-normal w-full bg-[#fffeec] rounded-b-[20px] rounded-t border border-gray-20 absolute z-10 h-[calc(100%-32px)] overflow-hidden mt-8">
            <div className="p-4">
              <div className="text-gray-30">
                LVL Transfer allows user to transfer all of your current
                progress of a Kat to your favorite one with a calculated price{" "}
              </div>
              <div className="flex justify-center items-center gap-x-4 mt-5">
                <div>
                  <div className="text-center uppercase font-medium mb-1">
                    Origin
                  </div>
                  {!originalCat ? (
                    <EmptyCatCard onClick={() => handleChooseCat(false)} />
                  ) : (
                    <div
                      className="w-[100px] h-[130px]"
                      onClick={(e) => handleCardClick(e, false)}
                    >
                      <StaffCard
                        onRemoveClick={() => handleConfirmRemoveCat(false)}
                        onViewClick={() => handleViewClick(originalCat._id)}
                        catId={originalCat._id}
                        active={activeCard === ObjectType.ORIGINAL}
                      />
                    </div>
                  )}
                </div>
                <div className="pt-5">
                  <ChevronsRightIcon
                    size={24}
                    color={"#68AF5A"}
                    strokeWidth={3}
                  />
                </div>
                <div>
                  <div className="text-center uppercase font-medium mb-1">
                    Receiver
                  </div>
                  {!receiverCat ? (
                    <EmptyCatCard onClick={() => handleChooseCat(true)} />
                  ) : (
                    <div
                      className="w-[100px] h-[130px]"
                      onClick={(e) => handleCardClick(e, true)}
                    >
                      <StaffCard
                        onRemoveClick={() => handleConfirmRemoveCat(true)}
                        onViewClick={() => handleViewClick(receiverCat._id)}
                        catId={receiverCat._id}
                        active={activeCard === ObjectType.RECEIVER}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="text-bodyMd mt-6">
                <div className="font-semibold underline">Notice:</div>
                <ul className="text-gray-30 list-disc px-4">
                  <li>Receiver will inherit all stats from the Origin</li>
                  <li>The Origin will be reseted to level 1</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-20 w-full flex flex-col items-center p-2 gap-y-1.5">
              <div className="font-normal text-gray-30">Transfer Fee</div>
              <div className="flex items-center gap-x-1.5">
                <Image
                  src={getIconPathByCurrencyType(CURRENCY_TYPES.DIAMOND)}
                  width={16}
                  height={16}
                  alt={"diamond"}
                />
                {DEFAULT_TRANSFER_FEE}
              </div>
              <Button onClick={handleTransferLevel}>Transfer Level</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {isAssigningCat ? (
        <AssignCatPanel
          staffs={staffNotAssign}
          onAssign={onAssignCat}
          onClose={() => setIsAssigningCat(false)}
        />
      ) : (
        transferPanel
      )}
      {showCardInfo && (
        <div className="absolute !z-20 w-full h-full top-0 left-0">
          <CardInfo onBack={() => setShowCardInfo(false)} />
        </div>
      )}
      {showTransferResult && (
        <TransferResult
          receiver={receiverCat}
          origin={originalCat}
          onClose={handleCloseResult}
        />
      )}
    </>
  );
};
