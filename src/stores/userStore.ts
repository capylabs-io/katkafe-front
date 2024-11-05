import { postLogin } from "@/requests/login";
import { getUser, getUserInventory } from "@/requests/user";
import { UserType } from "@/types/user";
import { create } from "zustand";
import { get as getLD } from "lodash";

type State = {
  jwt: string | null;
  user: UserType | null;
};

type Actions = {
  login: (body: any) => Promise<UserType>;
  clear: () => void;
  setUser: (user: UserType | null) => void;
  fetchUser: () => Promise<void>;
  isLoggedIn: () => boolean;
};

const defaultStates: State = {
  jwt: null,
  user: null,
};

export const useUserStore = create<State & Actions>()((set, get) => ({
  ...defaultStates,
  login: async (body) => {
    const response = await postLogin(body);
    if (!response) {
      return;
    }
    set({
      jwt: response.accessToken,
      user: response.user,
    });
    return response.user;
  },
  clear: () => {
    set(defaultStates);
  },
  setUser: (user) => set((state) => ({ user: { ...state.user, ...user } })),
  fetchUser: async () => {
    const user = await getUser();
    if (user) {
      set({ user });
    }
    const inventory = await getUserInventory();
    console.log("inventory", inventory);
    if (inventory) {
      set((state) => ({
        user: {
          ...state.user!,
          ...inventory,
        },
      }));
    }
  },
  isLoggedIn: () => !!get().jwt && !!get().user,
}));
