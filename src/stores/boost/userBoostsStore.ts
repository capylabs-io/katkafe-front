import { postLogin } from "@/requests/login";
import { getUser } from "@/requests/user";
import { UserBoost } from "@/types/boost";
import { UserType } from "@/types/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Định nghĩa kiểu State và Actions
type State = {
  userBoosts: UserBoost[];
};

type Actions = {
  clear: () => void;
  setUserBoosts: (userBoosts: UserBoost[]) => void;
};

// Khởi tạo giá trị mặc định cho state
const defaultStates: State = {
  userBoosts: [],
};

// Tạo store sử dụng Zustand
export const useUserBoostsStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      ...defaultStates,
      clear: () => {
        set(defaultStates);
      },
      setUserBoosts: (userBoosts) => {
        set({ userBoosts });
      },
    }),
    { name: "userStore" }
  )
);
