import { getPower } from "@/requests/restaurant";
import { Restaurant } from "@/types/restaurant";
import { RestaurantUpgrade } from "@/types/restaurantUpgrade";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

type States = {
  restaurants: Restaurant[];
  myRestaurants: Restaurant[];
  nextRestaurantUnclockIndex: number | null;
  currentRestaurant: Restaurant | null;
  nextRestaurantUnclock: RestaurantUpgrade | null;
  power: any | null;
  restaurantUpgradeConfigs: RestaurantUpgrade[];
};

type Actions = {
  setRestaurants: (restaurants: Restaurant[]) => void;
  setMyRestaurants: (myRestaurants: Restaurant[]) => void;
  setNextRestaurantUnclockIndex: (
    nextRestaurantUnclockIndex: number | null
  ) => void;
  setCurrentRestaurant: (restaurant: Restaurant | null) => void;
  setNextRestaurantUnclock: (restaurant: RestaurantUpgrade | null) => void;
  // fetchAndSetPower: (locationId: string) => Promise<void>;
  setRestaurantUpgradeConfigs: (
    restaurantUpgradeConfigs: RestaurantUpgrade[]
  ) => void;
};

const defaultStates = {
  currentRestaurant: null,
  restaurants: [],
  myRestaurants: [],
  power: null,
  nextRestaurantUnclockIndex: null,
  nextRestaurantUnclock: null,
  restaurantUpgradeConfigs: [],
};

export const useRestaurantStore = create<States & Actions>()(
  subscribeWithSelector((set, get) => ({
    ...defaultStates,
    setRestaurants: (restaurants: Restaurant[]) => {
      set({
        restaurants: restaurants,
      });
    },
    setMyRestaurants: (myRestaurants: Restaurant[]) => {
      set({
        myRestaurants: myRestaurants,
      });
    },
    setCurrentRestaurant: (restaurant: Restaurant | null) => {
      set({
        currentRestaurant: restaurant,
      });
      // if (restaurant && restaurant._id) {
      //   get().fetchAndSetPower(restaurant._id);
      // } else {
      //   set({ power: null });
      // }
    },
    setNextRestaurantUnclock: (restaurant: RestaurantUpgrade | null) => {
      set({
        nextRestaurantUnclock: restaurant,
      });
    },
    setNextRestaurantUnclockIndex: (
      nextRestaurantUnclockIndex: number | null
    ) => {
      set({
        nextRestaurantUnclockIndex,
      });
    },
    // fetchAndSetPower: async (locationId: string) => {
    //   try {
    //     const power = await getPower(locationId);
    //     set({ power });
    //     return power;
    //   } catch (error) {
    //     console.error("Error fetching power:", error);
    //     set({ power: null });
    //   }
    // },
    setRestaurantUpgradeConfigs: (
      restaurantUpgradeConfigs: RestaurantUpgrade[]
    ) => {
      set({
        restaurantUpgradeConfigs,
      });
    },
  }))
);
