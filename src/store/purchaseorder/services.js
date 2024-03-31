import { SERVER_URL } from "../../utils/constants";
import HttpRequest from "../../utils/HttpRequest";

export const createPurchaseOrdersService = async (data) => {
  return await HttpRequest.post(`${SERVER_URL}/purchase`, data);
};

export const getAllPurchaseOrdersService = async () => {
  return HttpRequest.get(`${SERVER_URL}/purchase`);
};

export const getPurchaseorderByIdService = async (itemId) => {
  return await HttpRequest.get(`${SERVER_URL}/purchase/${itemId}`);
};
export const updatePurchaseOrderService = async (itemId, data) => {
  return await HttpRequest.update(`${SERVER_URL}/purchase/${itemId}`, data);
};
