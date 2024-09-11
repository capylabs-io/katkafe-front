"use client";
import { getInviteUrl, getUser } from "@/requests/user";
import { useLoadingStore } from "@/stores/LoadingStore";
import { useUserStore } from "@/stores/userStore";
import { useState } from "react";

export const useFetchUser = () => {
  const [setUser] = useUserStore((state) => [state.setUser]);
  const [show, hide] = useLoadingStore((state) => [state.show, state.hide]);

  const fetchUser = async () => {
    try {
      show();
      const response = await getUser();
      setUser(response);
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
