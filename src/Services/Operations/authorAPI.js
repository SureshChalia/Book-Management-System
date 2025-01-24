import { toast } from "react-hot-toast";
import { apiConnector } from "../ApiConnector";
import { authorEndpoints } from "../Apis";

const { ALL_AUTHORS_API } = authorEndpoints;

export const allAuthors = async (token) => {
  try {
    const response = await apiConnector("GET", ALL_AUTHORS_API, null, {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    });
    return response.data;
  } catch (error) {
    toast.error("Failed to fetch authors");
    throw error;
  }
};