import { BASE_URL } from "@/constants/api-url";
import { useUserStore } from "@/stores/userStore";
import axios, { AxiosRequestConfig, AxiosError } from "axios";

const config: AxiosRequestConfig = {
  baseURL: BASE_URL,
};

const katAxios = axios.create(config);

const getJwt = async () => {
  const jwt = useUserStore.getState().jwt;
  return jwt;
};

katAxios.interceptors.request.use(
  async (config) => {
    const jwt = await getJwt();
    if (jwt) {
      // config.headers không đc gán trực tiếp mà phải thông qua phương thức set của đối tượng AxiosRequestConfig
      config.headers.set("Authorization", `Bearer ${jwt}`);
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default katAxios;
