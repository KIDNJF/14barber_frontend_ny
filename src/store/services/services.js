import { SERVER_URL } from "../../utils/constants";
import HttpRequest from "../../utils/HttpRequest";

export const getAllService = async (query) => {
  return HttpRequest.get(`${SERVER_URL}/service${query}`);
};
