import { BASE_URL } from "@/constants/api-url";
import { LoginBody, UserType } from "@/types/user";
import axios from "axios";
import katAxios from "./axios.config";
import { Staff } from "@/types/common-types";

// set up axios interceptor
export const postLogin = async (body: LoginBody | undefined) => {
  const response = await axios.post(`${BASE_URL}/auth/login`, body);
  return response.data;
};

export const updateLoginStatus = async () => {
  try {
    const response = await katAxios.post<Staff>(`${BASE_URL}/users/init`);
    return response.data;
  } catch (error) {
    console.error("Error updating login status", error);
  }
};

export const updateStatus = async () => {
  try {
    const response = await katAxios.post<UserType>(
      `${BASE_URL}/users/update-status`
    );
    return response.data;
  } catch (error) {
    console.error("Error update status", error);
  }
};
