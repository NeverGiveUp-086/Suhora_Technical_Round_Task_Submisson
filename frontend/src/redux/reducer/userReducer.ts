import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserReducerInitialState } from "../../types/reducer-types";
import { User } from "../../types/types";
import { registerUser, loginUser, logoutUser } from "../api/userApi";

const initialState = {
  user: null,
  loading: true,
};

export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    [registerUser.pending.type]: (state) => {
      state.loading = true;
    },
    [registerUser.fulfilled.type]: (state, action: any) => {
      state.user = action.payload;
      state.loading = false;
    },
    [registerUser.rejected.type]: (state) => {
      state.loading = false;
    },
    [loginUser.pending.type]: (state) => {
      state.loading = true;
    },
    [loginUser.fulfilled.type]: (state, action: any) => {
      console.log("from reducer", action.payload);
      state.user = action.payload;
      state.loading = false;
    },
    [loginUser.rejected.type]: (state) => {
      state.loading = false;
    },
    [logoutUser.pending.type]: (state) => {
      state.loading = true;
    },
    [logoutUser.fulfilled.type]: (state) => {
      state.user = null;
      state.loading = false;
    },
    [logoutUser.rejected.type]: (state) => {
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(registerUser.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(logoutUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.loading = false;
    });
    builder.addCase(logoutUser.rejected, (state) => {
      state.loading = false;
    });
  },

});



// export const { userExist, userNotExist } = userReducer.actions;
export default userReducer.reducer; 
