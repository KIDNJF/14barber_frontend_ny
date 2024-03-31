import { createSlice } from "@reduxjs/toolkit";

const mySlice = createSlice({
  name: "service",
  initialState: {
    isFetching: false,
    all: null,
    new: null,
  },
  reducers: {
    setAll(state, action) {
      state.all = action.payload;
    },
    setIsFetching(state, action) {
      state.isFetching = action.payload;
    },
    setNew(state, action) {
      state.new = action.payload;
    },
  },
});

export const myServiceActions = mySlice.actions;

export default mySlice.reducer;
