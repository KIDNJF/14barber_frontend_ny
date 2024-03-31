import { notification } from "antd";
import { myInventoryActions } from ".";
import {
  createInventoryService,
  getAllInventoryService,
  getInvBySupplierService,
} from "./services";

export const createCartRequestAction = (data) => {
  return async (dispatch) => {
    try {
      dispatch(myInventoryActions.setIsFetching(true));
      const res = await createInventoryService(data);
      dispatch(myInventoryActions.setNew(res));
      dispatch(myInventoryActions.setIsFetching(false));
      if (res?.response?.status === 500) {
        notification.success({
          message: "Something Went Wrong, Please Try Again",
        });
      }
      dispatch(myInventoryActions.setIsFetching(false));
    } catch (err) {
      console.log(err);
    }
  };
};

export const getAllInventoryRequestAction = (query) => {
  return async (dispatch) => {
    try {
      dispatch(myInventoryActions.setIsFetching(true));
      const res = await getAllInventoryService(query);
      dispatch(myInventoryActions.setAll(res));
      dispatch(myInventoryActions.setIsFetching(false));
      dispatch(myInventoryActions.setIsFetching(false));
    } catch (err) {
      console.log(err);
    }
  };
};

export const getInvBySuoRequestActions = (itemId) => {
  return async (dispatch) => {
    try {
      dispatch(myInventoryActions.setIsFetching(true));
      const res = await getInvBySupplierService(itemId);

      console.log("res.....>>>", res.response?.data?.message);
      if (res.response?.data?.status === 0) {
        notification.error({ message: res.response?.data?.message });
      }
      dispatch(myInventoryActions.setSelectedSupplier(res));
      dispatch(myInventoryActions.setIsFetching(false));
    } catch (err) {
      console.log(err);
    }
  };
};
