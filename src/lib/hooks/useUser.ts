"use client";
import { getInviteUrl, getUser } from "@/requests/user";
import { useUserStore } from "@/stores/userStore";
import { useState } from "react";

export const useFetchUser = () => {
  const [setUser] = useUserStore((state) => [state.setUser]);
  const [inviteUrl, setInviteUrl] = useState<string>("");

  const fetchUser = async () => {
    try {
      const response = await getUser();
      setUser(response);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  const fetchInviteUrl = async () => {
    try {
      const response = await getInviteUrl();
      if (response.inviteUrl) {
        setInviteUrl(response.inviteUrl);
      }
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  return {
    inviteUrl,
    fetchInviteUrl,
    fetchUser,
  };
};
