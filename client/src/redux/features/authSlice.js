import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api.js";

const initialState = {
  user: null,
  error: "",
  loading: "",
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ values, navigate, toast }) => {
    try {
      const response = await api.signIn(values);
      toast.success("Login Successfully");
      navigate("/");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    [login.pending]: (state, action) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payöload.message;
    },
  },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
