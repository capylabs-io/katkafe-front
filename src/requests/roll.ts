import { BASE_URL } from "@/constants/api-url";
import { Roll } from "@/types/roll";
import axios from "axios";

export const getRolls = async () => {
  const response = await axios.get<Roll[]>(`${BASE_URL}`);
  return response.data;
};
