import { notification } from "antd";
import { myAppointmentActions } from ".";
import { completeAppointmentService } from "./services";

export const completeAppointmentActions = (itemId, data) => {
  return async (dispatch) => {
    try {
      dispatch(myAppointmentActions.setIsFetching(true));
      const res = await completeAppointmentService(itemId, data);
      if (res.response?.status === 400) {
        notification.error({ message: res.response?.data?.errors[0] });
        dispatch(myAppointmentActions.setIsFetching(false));
      }
      dispatch(myAppointmentActions.setIsFetching(false));
    } catch (err) {
      console.log(err);
    }
  };
};
