import { axiosInstance } from "../interceptor";

export const createProduct = async (product) => {
  try {
    const response = await axiosInstance.post("product", product);
    return response?.data;
  } catch (error) {
    console.error(error);
  }
};

export const getProductsList = async (filter = "") => {
  try {
    const response = await axiosInstance.get(`/product${filter}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/product/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axiosInstance.delete(`/product/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
