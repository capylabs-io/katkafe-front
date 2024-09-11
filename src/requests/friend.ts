import { BASE_URL } from "@/constants/api-url";
import katAxios from "./axios.config";
import { FriendListResponse } from "@/types/friend";

export const getFriendList = async () => {
  const response = await katAxios.get<FriendListResponse>(
    `${BASE_URL}/referrals`
  );
  return response.data;
};
