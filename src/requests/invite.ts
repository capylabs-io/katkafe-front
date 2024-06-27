import { BASE_URL } from "@/constants/api-url";
import axios from "axios";

export const getInvites = async () => {
  const response = await axios.get(`${BASE_URL}`);
  return response.data;
};
