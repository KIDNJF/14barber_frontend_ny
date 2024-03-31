import { notification } from "antd";
import { myPurchaseorderActions } from ".";
import {
    createPurchaseOrdersService,
    getAllPurchaseOrdersService,
    getPurchaseorderByIdService,
    updatePurchaseOrderService
} from "./services";

export const createPurchaseorderRequestAction = (data) => {
  return async (dispatch) => {
    try {
      dispatch(myPurchaseorderActions.setIsFetching(true));
      const res = await createPurchaseOrdersService(data);
      dispatch(myPurchaseorderActions.setNew(res));
      dispatch(myPurchaseorderActions.setIsFetching(false));
      if (res?.response?.status === 500) {
        notification.success({
          message: "Something Went Wrong, Please Try Again",
        });
      }
      dispatch(myPurchaseorderActions.setIsFetching(false));
    } catch (err) {
      console.log(err);
    }
  };
};

export const getAllPurchaseorderRequestAction = () => {
  return async (dispatch) => {
    try {
      dispatch(myPurchaseorderActions.setIsFetching(true));
      const res = await getAllPurchaseOrdersService();
      dispatch(myPurchaseorderActions.setAll(res.data));
      dispatch(myPurchaseorderActions.setIsFetching(false));
      dispatch(myPurchaseorderActions.setIsFetching(false));
      //console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
};
export const updatePurchaseorderRequestAction = (id, data) => {
  return async (dispatch) => {
    try {
      dispatch(myPurchaseorderActions.setIsFetching(true));
      const res = await updatePurchaseOrderService(id, data);
      dispatch(myPurchaseorderActions.setAll(res.data));
      dispatch(myPurchaseorderActions.setIsFetching(false));
      dispatch(myPurchaseorderActions.setIsFetching(false));
      //console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
};

// export const getInvBySuoRequestActions = (itemId) => {
//   return async (dispatch) => {
//     try {
//       dispatch(myInventoryActions.setIsFetching(true));
//       const res = await getInvBySupplierService(itemId);

//       console.log("res.....>>>", res.response?.data?.message);
//       if (res.response?.data?.status === 0) {
//         notification.error({ message: res.response?.data?.message });
//       }
//       dispatch(myInventoryActions.setSelectedSupplier(res));
//       dispatch(myInventoryActions.setIsFetching(false));
//     } catch (err) {
//       console.log(err);
//     }
//   };
// };
