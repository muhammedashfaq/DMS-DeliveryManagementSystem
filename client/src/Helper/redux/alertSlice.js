import { createSlice } from "@reduxjs/toolkit";
export const alertSlice = createSlice({
  name: "alerts",
  initialState: {
    loading: false,
  },
  reducers: {
    showloading: (state) => {
      state.loading = true;
    },
    hideloading: (state) => {
      state.loading = false;
    },
  },
});

export const { showloading, hideloading } = alertSlice.actions;
