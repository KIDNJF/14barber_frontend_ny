import { notification } from "antd";
import { myCartActions } from ".";
import {
  addToCartService,
  createCartService,
  deleteCartService,
  getAllCartService,
  getOneCartService,
  removeItemService,
} from "./services";

export const createCartRequestActions = (data) => {
  return async (dispatch) => {
    try {
      dispatch(myCartActions.setIsFetching(true));
      const res = await createCartService(data);
      if (res?.message === "Cart created successfully") {
        dispatch(myCartActions.setNew(res.cart));
        dispatch(myCartActions.setIsFetching(false));
      }
      dispatch(myCartActions.setIsFetching(false));
      if (res?.response?.status === 500) {
        notification.success({
          message: "Something Went Wrong, Please Try Again",
        });
      }
      dispatch(myCartActions.setIsFetching(false));
    } catch (err) {
      console.log(err);
    }
  };
};

export const createCartRequestAction = (data) => {
  return async (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        dispatch(myCartActions.setIsFetching(true));
        const res = await createCartService(data);

        if (res?.message === "Cart created successfully") {
          dispatch(myCartActions.setNew(res.cart));
          dispatch(myCartActions.setIsFetching(false));
          resolve(res.cart._id);
        } else {
          dispatch(myCartActions.setIsFetching(false));
          console.log("Error creating cart:", res?.message);
          reject("Cart creation failed");
        }
      } catch (err) {
        console.log("Error creating cart:", err);
        reject(err);
      }
    });
  };
};

export const getAllCartRequestAction = (query) => {
  return async (dispatch) => {
    try {
      dispatch(myCartActions.setIsFetching(true));
      const res = await getAllCartService(query);
      dispatch(myCartActions.setAll(res));
      dispatch(myCartActions.setIsFetching(false));
    } catch (err) {
      console.log(err);
    }
  };
};

export const getOneCartRequestActions = (itemId) => {
  return async (dispatch) => {
    try {
      dispatch(myCartActions.setIsFetching(true));
      const res = await getOneCartService(itemId);

      dispatch(myCartActions.setSelected(res));
      dispatch(myCartActions.setIsFetching(false));
    } catch (err) {
      console.log(err);
    }
  };
};

export const addToCartRequestActions = (itemId, data) => {
  return async (dispatch) => {
    try {
      dispatch(myCartActions.setIsFetching(true));
      const res = await addToCartService(itemId, data);
      if (res.response?.status === 400) {
        notification.error({ message: res.response?.data?.errors[0] });
        dispatch(myCartActions.setIsFetching(false));
      }
      dispatch(myCartActions.setIsFetching(false));
    } catch (err) {
      console.log(err);
    }
  };
};

export const removeToCartRequestActions = (itemId, data) => {
  return async (dispatch) => {
    try {
      dispatch(myCartActions.setIsFetching(true));
      const res = await removeItemService(itemId, data);
      dispatch(myCartActions.setIsFetching(false));
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteCartRequestActions = (itemId, data) => {
  return async (dispatch) => {
    try {
      dispatch(myCartActions.setIsFetching(true));
      const res = await deleteCartService(itemId, data);
      dispatch(myCartActions.setIsFetching(false));
    } catch (err) {
      console.log(err);
    }
  };
};
