"use client";
import { getFriendList } from "@/requests/friend";
import { useFriendStore } from "@/stores/friend/friendStore";
import { useLoadingStore } from "@/stores/LoadingStore";
import { FriendListResponse } from "@/types/friend";
import { useEffect, useState } from "react";

export const useFetchFriends = () => {
  const [friends, setFriends] = useState<FriendListResponse>();
  const [show, hide] = useLoadingStore((state) => [
    state.show,
    state.hide,
  ]);
  const fetchFriends = async () => {
    try {
      show()
      const response = await getFriendList();
      setFriends(response);
    } catch (error) {
      console.error("Error fetching", error);
    } finally {
      hide()
    }
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  return { friends, fetchFriends };
};
