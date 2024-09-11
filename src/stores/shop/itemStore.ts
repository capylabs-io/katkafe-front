import { Item } from "@/types/item";
import { create } from "zustand";

type States = {
  items: Item[];
  currentItem: Item | null;
};

type Actions = {
  setItems: (items: Item[]) => void;
  setCurrentItem: (item: Item) => void;
};

const defaultStates = {
  items: [],
  currentItem: null,
};

export const useItemStore = create<States & Actions>((set, get) => ({
  ...defaultStates,
  setItems: (items: Item[]) => {
    set({
      items,
    });
  },
  setCurrentItem: (item: Item) => {
    set({
      currentItem: item,
    });
  },
}));
