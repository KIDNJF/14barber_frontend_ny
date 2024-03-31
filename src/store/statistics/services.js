import { SERVER_URL } from "../../utils/constants";
import HttpRequest from "../../utils/HttpRequest";

export const getAllStasticsService = async (query) => {
  return HttpRequest.get(`${SERVER_URL}/newWay/cart/data/statistic`);
};
