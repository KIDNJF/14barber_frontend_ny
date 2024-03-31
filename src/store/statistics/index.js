import { createSlice } from "@reduxjs/toolkit";

const mySlice = createSlice({
  name: "statistics",
  initialState: {
    isFetching: false,
    all: null,
  },
  reducers: {
    setAll(state, action) {
      state.all = action.payload;
    },
    setIsFetching(state, action) {
      state.isFetching = action.payload;
    },
  },
});

export const myStatisticsActions = mySlice.actions;

export default mySlice.reducer;
