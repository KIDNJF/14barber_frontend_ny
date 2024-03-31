import { myStatisticsActions } from ".";
import { getAllStasticsService } from "./services";

export const getAllStastisticsAction = () => {
  return async (dispatch) => {
    try {
      dispatch(myStatisticsActions.setIsFetching(true));
      const res = await getAllStasticsService();
      console.log("::::res", res);
      dispatch(myStatisticsActions.setAll(res));
      dispatch(myStatisticsActions.setIsFetching(false));
    } catch (err) {
      console.log(err);
    }
  };
};
