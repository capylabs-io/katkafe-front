import { TAP_TAP_ANIM } from "@/constants/anims";
import { create } from "zustand";
import { useUserStore } from "./userStore";
type States = {
  coinTaping: number | null,
  tapping: number | null,
  maxPower: number | null,
  currentPower: number | null,
}
type Actions = {
  increaseCoinTapping: () => void
  increaseTapping: () => void
  resetTapping: () => void
  resetCoinTapping: () => void
  setCoinTapping: (value: number) => void
  setMaxPower: (value: number) => void
  setCurrentPower: (value: number) => void
  decreasePower: () => void
  increasePower: () => void
}

const defaultStates = {
  coinTaping: 0,
  maxPower: null,
  currentPower: null,
  tapping: 0
};
export const useGamePlayStore = create<States & Actions>((set) => ({
  ...defaultStates,
  increaseCoinTapping: () => {
    set((state) => ({
      coinTaping: state.coinTaping! + useUserStore.getState().user?.beansPerTab!
    }))
  },
  increaseTapping: () => {
    set((state) => ({
      tapping: state.tapping === useUserStore.getState().user?.maxTabs! ? 0 : ++state.tapping!
    }))
  },
  setCoinTapping: (value: number) => {
    set({
      coinTaping: value
    })
  },
  setMaxPower: (value: number) => {
    set({
      maxPower: value
    })
  },
  setCurrentPower: (value: number) => {
    set({
      currentPower: value
    })
  },
  decreasePower: () => {
    set((state) => ({
      currentPower: state.currentPower === 0 ? 0 : --state.currentPower!
    }))
  },
  increasePower: () => {
    set((state) => ({
      currentPower: state.currentPower! + TAP_TAP_ANIM.RECOVER_POWER_PER_SECOND > state.maxPower! ? state.maxPower : state.currentPower! + TAP_TAP_ANIM.RECOVER_POWER_PER_SECOND
    }))
  },
  resetTapping: () => {
    set(() => ({
      tapping: 0
    }))
  },
  resetCoinTapping: () => {
    set(() => ({
      coinTaping: 0
    }))
  }
}))