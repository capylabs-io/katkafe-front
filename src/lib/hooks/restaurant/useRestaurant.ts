"use client";
import {
  getNextRestaurantUnclockConfig,
  getPower,
  getRestaurantConfigs,
  getRestaurantUpgradeConfigs,
  getRestaurants,
} from "@/requests/restaurant";
import { useRestaurantStore } from "@/stores/restaurant/restaurantStore";
import { useEffect, useState } from "react";

export const useFetchRestaurants = () => {
  const [
    setRestaurants,
    setCurrentRestaurant,
    setNextRestaurantUnclockIndex,
    setNextRestaurantUnclock,
    setMyRestaurants,
  ] = useRestaurantStore((state) => [
    state.setRestaurants,
    state.setCurrentRestaurant,
    state.setNextRestaurantUnclockIndex,
    state.setNextRestaurantUnclock,
    state.setMyRestaurants,
  ]);

  const fetchNextRestaurants = async (index: number) => {
    try {
      const nextRestaurant = await getNextRestaurantUnclockConfig(index);
      setNextRestaurantUnclock(nextRestaurant);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  const fetchRestaurants = async () => {
    try {
      const [restaurants, restaurantConfig] = await Promise.all([
        getRestaurants(),
        getRestaurantConfigs(),
      ]);
      const listRestaurantsConfigMapped = restaurantConfig.filter(
        (resConfig: any, index: any) =>
          resConfig[index]?.name === restaurants[index]?.name
      );
      const listRestaurantsMapped = [
        ...restaurants,
        ...listRestaurantsConfigMapped,
      ];
      if (listRestaurantsConfigMapped.length) {
        await fetchNextRestaurants(
          listRestaurantsMapped[restaurants.length - 1].order
        );
      }
      setNextRestaurantUnclockIndex(restaurants.length + 1);
      setRestaurants(listRestaurantsMapped);
      setMyRestaurants(restaurants);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  return {
    fetchRestaurants,
  };
};

const usePower = (locationId: string) => {
  const [power, setPower] = useState(null);

  useEffect(() => {
    const fetchPower = async (id: string) => {
      try {
        const powerData = await getPower(id);
        setPower(powerData);
      } catch (error) {
        console.error("Error fetching power:", error);
        setPower(null);
      }
    };

    if (locationId) {
      fetchPower(locationId);
    } else {
      setPower(null);
    }
  }, [locationId]);

  return power;
};

export default usePower;

export const useFetchRestaurantUpgradeConfigs = () => {
  const [setRestaurantUpgradeConfigs] = useRestaurantStore((state) => [
    state.setRestaurantUpgradeConfigs,
  ]);

  const fetchRestaurantUpgradeConfigs = async () => {
    try {
      const response = await getRestaurantUpgradeConfigs();
      setRestaurantUpgradeConfigs(response);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  return {
    fetchRestaurantUpgradeConfigs,
  };
};
