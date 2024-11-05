"use client";
import { useLoadingStore } from "@/stores/LoadingStore";
import { useUserStore } from "@/stores/userStore";

export const useFetchUser = () => {
  const [getUser] = useUserStore((state) => [state.fetchUser]);
  const [show, hide] = useLoadingStore((state) => [state.show, state.hide]);

  const fetchUser = async () => {
    try {
      show();
      await getUser();
    } catch (error) {
      console.error("Error fetching", error);
    } finally {
      hide();
    }
  };

  return {
    fetchUser,
  };
};
