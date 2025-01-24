import { toast } from "react-hot-toast";
import { apiConnector } from "../ApiConnector";
import { categoryEndpoints } from "../Apis";

const { ADD_CATEGORY, GET_CATEGORIES, DELETE_CATEGORY, UPDATE_CATEGORY } = categoryEndpoints;

export const addCategory = async (categoryData, token) => {
  try {
    const response = await apiConnector("POST", ADD_CATEGORY, categoryData, {
      Authorization: `Bearer ${token}`,
    });
    toast.success("category created successfully");
    return response.data;
  } catch (error) {
    toast.error("Failed to create category");
    throw error;
  }
};

export const getCategories = async (token) => {
  try {
    const response = await apiConnector("GET", GET_CATEGORIES, null)
    return response.data;
  } catch (error) {
    toast.error("Failed to fetch all categories");
    throw error;
  }
};

export const deleteCategory = async (categoryId, token) => {
  try {
    await apiConnector("DELETE", DELETE_CATEGORY, null, {
      Authorization: `Bearer ${token}`,
    }, { categoryId });
    toast.success("Book category deleted successfully");
  } catch (error) {
    toast.error("Failed to delete Book category");
    throw error;
  }
};

export const updateCategory = async (categoryId, categoryData, token) => {
  try {
    const response = await apiConnector("PUT", UPDATE_CATEGORY, categoryData, {
      Authorization: `Bearer ${token}`,
    }, { categoryId });
    toast.success("Book category updated successfully");
    return response.data;
  } catch (error) {
    toast.error("Failed to update Book category");
    throw error;
  }
};
