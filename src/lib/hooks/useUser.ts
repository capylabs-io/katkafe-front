"use client";
import { getUser } from "@/requests/user";
import { useUserStore } from "@/stores/userStore";

export const useFetchUser = () => {
  const [setUser] = useUserStore((state) => [state.setUser]);

  const fetchUser = async () => {
    try {
      const response = await getUser();
      setUser(response);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  return {
    fetchUser,
  };
};