import { axiosInstance } from "../interceptor";

export const createCategory = async (category) => {
  try {
    const response = await axiosInstance.post("category", category);
    return response?.data;
  } catch (error) {
    console.error(error);
  }
};

export const getCategoriesList = async () => {
  try {
    const response = await axiosInstance.get("/category");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
