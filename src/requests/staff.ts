import { API_STAFF, BASE_URL } from "@/constants/api-url";
import { Staff } from "@/types/common-types";
import axios from "axios";
import katAxios from "./axios.config";
import { RemoveBody, RequireUpgradeBody, UpgradeBody } from "@/types/staff";

export const getStaffs = async () => {
  const response = await katAxios.get<Staff[]>(`${BASE_URL}/cats`);
  return response.data;
};

export const getOneStaff = async (id: string) => {
  const response = await katAxios.get<Staff>(`${BASE_URL}/cats/${id}`);
  return response.data;
};

export const deleteOneStaff = async (id: number) => {
  const response = await axios.delete(`${API_STAFF}/${id}`);
  return response.data;
};

export const upgradeStaff = async (body: UpgradeBody) => {
  const response = await katAxios.post(`${BASE_URL}/cats/upgrade`, body);
  return response.data;
};

export const upgradeRequireStaff = async (body: RequireUpgradeBody) => {
  const response = await katAxios.post(
    `${BASE_URL}/cat-upgrade/next-level`,
    body
  );
  return response.data;
};

export const removeStaff = async (body: RemoveBody) => {
  const response = await katAxios.post(`${BASE_URL}/cats/remove`, body);
  return response.data;
};
