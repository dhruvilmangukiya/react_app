import axios from "axios";
import { errorMessage, getGlobalItem } from "./utils/utils";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = getGlobalItem("token");
  if (token) {
    config.baseURL = process.env.REACT_APP_BASE_URL;
    config.headers["x-access-token"] = token;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    const res = error?.response;
    if (error.response?.status !== 401) {
      errorMessage(
        res?.message || res?.data?.message || "Something went wrong"
      );
    }
  }
);
