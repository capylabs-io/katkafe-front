import { Invite } from "@/types/invite";
import { create } from "zustand";

type States = {
  invites: Invite[];
  currentInvite: Invite | null;
};

type Actions = {
  setInvites: (invites: Invite[]) => void;
  setCurrentInvite: (invite: Invite) => void;
};

const defaultStates = {
  currentInvite: null,
  invites: [],
};

export const useInviteStore = create<States & Actions>((set, get) => ({
  ...defaultStates,
  setInvites: (invites: Invite[]) => {
    set({
      invites,
    });
  },
  setCurrentInvite: (invite: Invite) => {
    set({
      currentInvite: invite,
    });
  },
}));
