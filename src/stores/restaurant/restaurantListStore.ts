import { Restaurant } from "@/types/restaurant";
import { create } from "zustand";

type States = {
  restaurants: Restaurant[];
  currentRestaurant: Restaurant | null;
};

type Actions = {
  setRestaurants: (restaurants: Restaurant[]) => void;
  setCurrentRestaurant: (restaurant: Restaurant) => void;
};

const defaultStates = {
  currentRestaurant: null,
  restaurants: [],
};

export const useRestaurantStore = create<States & Actions>((set, get) => ({
  ...defaultStates,
  setRestaurants: (restaurants: Restaurant[]) => {
    set({
      restaurants,
    });
  },
  setCurrentRestaurant: (restaurant: Restaurant) => {
    set({
      currentRestaurant: restaurant,
    });
  },
}));
