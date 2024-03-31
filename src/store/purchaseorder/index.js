import { createSlice } from "@reduxjs/toolkit";

const mySlice = createSlice({
  name: "purchaseorder",
  initialState: {
    isFetching: false,
    all: null,
    new: null,
    singleCart: null,
    selectedSupplier: null,
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
    setSingleCart(state, action) {
      state.singleCart = action.payload;
    },
    setSelectedSupplier(state, action) {
      state.selectedSupplier = action.payload;
    },
  },
});

export const myPurchaseorderActions = mySlice.actions;

export default mySlice.reducer;
