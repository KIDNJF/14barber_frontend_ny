import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart";
import inventoryReducer from "./inventory";
import serviceReducer from "./services";
import statisticsReducer from "./statistics";
import appointmentReducer from "./appointment";
import purchaseorderReducer from "./purchaseorder"
const store = configureStore({
  reducer: {
    cart: cartReducer,
    inventory: inventoryReducer,
    service: serviceReducer,
    statistic: statisticsReducer,
    appointment: appointmentReducer,
    purchaseorder: purchaseorderReducer,

  },
});

export default store;
