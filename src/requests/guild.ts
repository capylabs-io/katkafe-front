import { BASE_URL } from "@/constants/api-url";
import axios from "axios";

export const getGuilds = async () => {
  const response = await axios.get(`${BASE_URL}`);
  return response.data;
};

export const getOneGuild = async (guildId: string) => {
  const response = await axios.get(`${BASE_URL}/${guildId}`);
  return response.data;
};
