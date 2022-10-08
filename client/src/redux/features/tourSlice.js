import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api.js";

const initialState = {
  tours: [],
  tour: {},
  userTours: [],
  error: "",
  loading: "",
};

export const createTour = createAsyncThunk(
  "tour/createTour",
  async ({ tourData, navigate, toast }, { rejectWithValue }) => {
    try {
      console.log(tourData);
      const response = await api.createTour(tourData);
      toast.success("Tour added Successfully");
      navigate("/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const tourSlice = createSlice({
  name: "tour",
  initialState,
  reducers: {
    setTour: (state, action) => {
      state.tour = action.payload;
    },
  },
  extraReducers: {
    [createTour.pending]: (state, action) => {
      state.loading = true;
    },
    [createTour.fulfilled]: (state, action) => {
      state.loading = false;
      state.tours = state.tours.push({ ...action.payload });
      state.user = action.payload;
    },
    [createTour.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const { setTour } = tourSlice.actions;
export default tourSlice.reducer;
