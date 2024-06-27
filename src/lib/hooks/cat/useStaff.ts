"use client";
import { getStaffUpgradeConfigs, getStaffs } from "@/requests/staff";
import { useStaffStore } from "@/stores/staffStore";
import { get } from "lodash";

export const useFetchStaffs = () => {
  const [setStaffs] = useStaffStore((state) => [state.setStaffs]);

  const fetchStaffs = async () => {
    try {
      const response = await getStaffs();
      setStaffs(response);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  return {
    fetchStaffs,
  };
};

export const useFetchStaffUpgradeConfigs = () => {
  const [setStaffUpgradeConfigs] = useStaffStore((state) => [
    state.setStaffUpgradeConfigs,
  ]);

  const fetchStaffUpgradeConfigs = async () => {
    try {
      const response = await getStaffUpgradeConfigs();
      setStaffUpgradeConfigs(response);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  return {
    fetchStaffUpgradeConfigs,
  };
};
