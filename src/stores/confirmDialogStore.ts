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
};

type Actions = {
  show: (props: State) => void;
  close: () => void;
};

const defaultValues: State = {
  isShowing: false,
  title: "Purchase",
  content: "Are you sure?",
  icon: "",
  confirmText: "Confirm",
  cancelText: "Cancel",
  onConfirm: () => {},
  onClose: () => {},
};

export const useConfirmDialogStore = create<State & Actions>((set) => ({
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
