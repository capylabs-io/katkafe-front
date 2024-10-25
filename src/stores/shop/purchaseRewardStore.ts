import { CURRENCY_TYPES, PurchaseReward } from "@/types/item";
import { create } from "zustand";

type State = {
  isShowing?: boolean;
  title?: string | React.ReactNode;
  content?: string | React.ReactNode;
  icon?: string;
  confirmText?: string | React.ReactNode;
  cancelText?: string;
  onConfirm?: () => void;
  onClose?: () => void;
  rewards?: PurchaseReward[];
};

type Actions = {
  show: (props: State) => void;
  close: () => void;
};

const defaultValues: State = {
  isShowing: false,
  title: "Congratulation!",
  content: "Are you sure?",
  icon: "",
  confirmText: "Got it!",
  cancelText: "Cancel",
  onConfirm: () => {},
  onClose: () => {},
  rewards: [],
};

export const usePurchaseRewardStore = create<State & Actions>((set) => ({
  ...defaultValues,
  show: (props) => {
    set({
      ...defaultValues,
      ...props,
      isShowing: true,
    });
  },
  close: () => {
    set({
      ...defaultValues,
      isShowing: false,
    });
  },
}));
