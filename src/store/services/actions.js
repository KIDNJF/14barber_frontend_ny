import { myServiceActions } from ".";
import { getAllService } from "./services";

export const getAllServiceRequestAction = (query) => {
  return async (dispatch) => {
    try {
      dispatch(myServiceActions.setIsFetching(true));
      const res = await getAllService(query);
      dispatch(myServiceActions.setAll(res));
      dispatch(myServiceActions.setIsFetching(false));
      dispatch(myServiceActions.setIsFetching(false));
    } catch (err) {
      console.log(err);
    }
  };
};
