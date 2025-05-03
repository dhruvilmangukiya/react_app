import { toast } from "react-toastify";

export const errorMessage = (message) => {
  toast.error(message);
};

export const successMessage = (message) => {
  toast.success(message);
};

export const setGlobalItem = (name, value) => {
  if (value !== undefined) {
    window.sessionStorage.setItem(name, JSON.stringify(value));
  }
};

export const getGlobalItem = (name) => {
  if (typeof window !== "undefined") {
    const result = JSON.parse(window.sessionStorage.getItem(name));
    return result;
  }
};

export const clearGlobalItem = (name) => {
  if (typeof window !== "undefined") {
    if (name) window.sessionStorage.removeItem(name);
    else window.sessionStorage.clear();
  }
};
