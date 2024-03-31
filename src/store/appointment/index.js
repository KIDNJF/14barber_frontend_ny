import { createSlice } from "@reduxjs/toolkit";

const mySlice = createSlice({
  name: "appointment",
  initialState: {
    isFetching: false,
    all: null,
    new: null,
    selected: null,
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
    setSelected(state, action) {
      state.selected = action.payload;
    },
  },
});

export const myAppointmentActions = mySlice.actions;

export default mySlice.reducer;
