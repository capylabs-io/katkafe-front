import { BASE_URL } from "@/constants/api-url";
import { BoostBody, InviteUrlResponse, UserType } from "@/types/user";
import katAxios from "./axios.config";
import { UserBoost } from "@/types/boost";

export const getUser = async () => {
  const response = await katAxios.get(`${BASE_URL}/users/me`);
  return response.data;
};

export const getClaim = async () => {
  const response = await katAxios.post<UserType>(`${BASE_URL}/users/claim`);
  return response.data;
};

export const getClaimable = async () => {
  const response = await katAxios.get(`${BASE_URL}/users/claimable`);
  return response.data;
};

export const getInviteUrl = async () => {
  const response = await katAxios.get<InviteUrlResponse>(
    `${BASE_URL}/users/invite-url`
  );
  return response.data;
};

export const postBoost = async (body: BoostBody) => {
  const response = await katAxios.post<UserBoost>(
    `${BASE_URL}/users/boost`,
    body
  );
  return response.data;
};
