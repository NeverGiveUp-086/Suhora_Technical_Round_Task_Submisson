import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api";
import { User } from "../../types/types";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData: Object) => {
    try {
      const response = await API.post("/register", userData);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userData: Object) => {
    try {
      const response = await API.post(
        `/login`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          // withCredentials: true,
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
  // const response = await API.post("/logout");
  // return response.data;
});