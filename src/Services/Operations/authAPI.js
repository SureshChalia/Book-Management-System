import { toast } from "react-hot-toast";
import { apiConnector } from "../ApiConnector";
import { endpoints } from "../Apis";




const {
  LOGIN_API,
  SIGNUP_API
} = endpoints


export const login = async (loginData) => {
  try {
    const headers = {
      "x-auth-key": import.meta.env.VITE_APP_AUTH_KEY,
    };
    const response = await apiConnector("POST", LOGIN_API, loginData,headers);
    toast.success("login successfully");
    localStorage.setItem('token', response.data.token);
    return response;
  } catch (error) {
    toast.error("Failed to login");
    throw error;
  }
};

export const signup = async (userData) => {
  try {
    const headers = {
      "x-auth-key": import.meta.env.VITE_APP_AUTH_KEY,
    };
    const response = await apiConnector("POST", SIGNUP_API, userData, headers);
    toast.success("sign up successfully");
  } catch (error) {
    toast.error("Failed to sign up");
    throw error;
  }
};



