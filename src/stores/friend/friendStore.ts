import { Friend } from "@/types/friend";
import { create } from "zustand";

type States = {
  friends: Friend[];
  currentFriend: Friend | null;
};

type Actions = {
  setFriends: (friends: Friend[]) => void;
  setCurrentFriend: (friend: Friend) => void;
};

const defaultStates = {
  friends: [],
  currentFriend: null,
};

export const useFriendStore = create<States & Actions>((set, get) => ({
  ...defaultStates,
  setFriends: (friends: Friend[]) => {
    set({
      friends,
    });
  },
  setCurrentFriend: (friend: Friend) => {
    set({
      currentFriend: friend,
    });
  },
}));
