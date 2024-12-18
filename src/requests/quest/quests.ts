import { BASE_URL } from "@/constants/api-url";
import katAxios from "../axios.config";

export const getQuestsWithProgress = async () => {
  const response = await katAxios.get(`${BASE_URL}/quests`);
  return response.data;
};

export const checkIn = async () => {
  const response = await katAxios.post(`${BASE_URL}/quests/check-in`);
  return response.data;
};

export const visitWebsite = async () => {
  const response = await katAxios.post(`${BASE_URL}/quests/visit-website`);
  return response.data;
};

export const youtube = async () => {
  const response = await katAxios.post(`${BASE_URL}/quests/youtube`);
  return response.data;
};
export const joinTelegramChat = async () => {
  const response = await katAxios.post(`${BASE_URL}/quests/join-telegram-chat`);
  return response.data;
};
export const joinTelegramOfficialAnnouncement = async () => {
  const response = await katAxios.post(
    `${BASE_URL}/quests/join-telegram-official-announcement`
  );
  return response.data;
};
export const followTwitter = async () => {
  const response = await katAxios.post(`${BASE_URL}/quests/follow-twitter`);
  return response.data;
};

export const shareLinktree = async () => {
  const response = await katAxios.post(`${BASE_URL}/quests/share-linktree`);
  return response.data;
};

export const visitTelegramAnnouncement = async () => {
  const response = await katAxios.post(
    `${BASE_URL}/quests/visit-telegram-announcement`
  );
  return response.data;
};

export const visitTelegramChat = async () => {
  const response = await katAxios.post(
    `${BASE_URL}/quests/visit-telegram-chat`
  );
  return response.data;
};

export const visitTwitter = async () => {
  const response = await katAxios.post(`${BASE_URL}/quests/visit-twitter`);
  return response.data;
};

export const allDailyQuests = async () => {
  const response = await katAxios.post(`${BASE_URL}/quests/all-daily-quests`);
  return response.data;
};

export const spinQuest = async () => {
  const response = await katAxios.post(`${BASE_URL}/quests/spin`);
  return response.data;
};

export const raidQuest = async () => {
  const response = await katAxios.post(`${BASE_URL}/quests/raid`);
  return response.data;
};
