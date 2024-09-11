import { Guild } from "@/types/guild";
import { create } from "zustand";

type States = {
  guilds: Guild[];
  currentGuild: Guild | null;
  guild: Guild | null;
};

type Actions = {
  setGuilds: (guilds: Guild[]) => void;
  setCurrentGuild: (guild: Guild) => void;
  setGuild: (guild: Guild) => void;
};

const defaultStates = {
  guilds: [],
  currentGuild: null,
  guild: null,
};

export const useGuildStore = create<States & Actions>((set, get) => ({
  ...defaultStates,
  setGuilds: (guilds: Guild[]) => {
    set({
      guilds,
    });
  },
  setCurrentGuild: (guild: Guild) => {
    set({
      currentGuild: guild,
    });
  },
  setGuild: (guild: Guild) => {
    set({
      guild: guild,
    });
  },
}));
