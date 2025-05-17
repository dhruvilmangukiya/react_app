import { axiosInstance } from "../interceptor";

export const createUser = async (formData) => {
  try {
    const response = await axiosInstance.post("user", formData);
    return response?.data;
  } catch (error) {
    console.error(error);
  }
};
