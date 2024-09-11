"use client";
import { StartLoading } from "@/components/ui/StartLoading";
import { useCallback, useEffect, useState } from "react";
import { get } from "lodash";
import { ErrorStartApp } from "@/components/ui/ErrorStartApp";
import {
  useFetchRestaurants,
  useFetchRestaurantUpgradeConfigs,
} from "@/lib/hooks/restaurant/useRestaurant";
import {
  useFetchStaffs,
  useFetchStaffUpgradeConfigs,
} from "@/lib/hooks/cat/useStaff";
import { useFetchUserBoosts } from "@/lib/hooks/boost/useFetchUserBoosts";

export const DataConfigProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const { fetchRestaurants } = useFetchRestaurants();
  const { fetchStaffs } = useFetchStaffs();
  const { fetchStaffUpgradeConfigs } = useFetchStaffUpgradeConfigs();
  const { fetchRestaurantUpgradeConfigs } = useFetchRestaurantUpgradeConfigs();
  const { fetchUserBoosts } = useFetchUserBoosts();

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await Promise.all([
        fetchRestaurants(true),
        fetchStaffs(),
        fetchStaffUpgradeConfigs(),
        fetchRestaurantUpgradeConfigs(),
        fetchUserBoosts(),
      ]);
    } catch (error) {
      console.log("error", error);
      setError(get(error, "message", ""));
      //TODO: handle error
    } finally {
      console.log("finally false");
      setIsLoading(false);
    }
  }, [
    fetchRestaurantUpgradeConfigs,
    fetchRestaurants,
    fetchStaffUpgradeConfigs,
    fetchStaffs,
    fetchUserBoosts,
  ]);

  useEffect(() => {
    fetchData();
  }, []);

  const renderContent = () => {
    if (isLoading) return <StartLoading></StartLoading>;
    else if (!isLoading && error) return <ErrorStartApp></ErrorStartApp>;
    else return children;
  };

  return renderContent();
};
