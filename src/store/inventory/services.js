import { SERVER_URL } from "../../utils/constants";
import HttpRequest from "../../utils/HttpRequest";

export const createInventoryService = async (data) => {
  return await HttpRequest.post(`${SERVER_URL}/newWay/inventory`, data);
};

export const getAllInventoryService = async (query) => {
  return HttpRequest.get(`${SERVER_URL}/newWay/inventory${query}`);
};

export const getInvBySupplierService = async (itemId) => {
  return await HttpRequest.get(`${SERVER_URL}/newWay/inventory/${itemId}`);
};
