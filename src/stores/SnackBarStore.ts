import { create } from "zustand";

type State = {
  /**
   * The loader is shown if `show()` has been called more times than `hide()` \
   * I.e. it will stop showing once `hide()` has been called as many times as `show()` (once all loading operations are complete)
   */
  isShowing: boolean;
  content: string;
};

type Actions = {
  show: (content?: string) => void;
  hide: () => void;
};

export const useSnackBarStore = create<State & Actions>((set) => ({
  isShowing: false,
  content: "",
  showContent: false,
  show: (content = "") =>
    set(() => ({
      content,
      isShowing: true,
    })),
  hide: () =>
    set(() => ({
      isShowing: false,
    })),
}));
