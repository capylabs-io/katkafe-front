import { BASE_URL } from "@/constants/api-url";
import katAxios from "../axios.config";

export const getEvents = async () => {
  const response = await katAxios.get(`${BASE_URL}/events`);
  return response.data;
};

export const doEventQuest = async (questCode: string) => {
  const response = await katAxios.post(`${BASE_URL}/quests/event`, {
    questCode,
  });
  return response.data;
};
