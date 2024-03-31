import { SERVER_URL } from "../../utils/constants";
import HttpRequest from "../../utils/HttpRequest";

export const createCartService = async (data) => {
  return await HttpRequest.post(`${SERVER_URL}/newWay/cart`, data);
};

export const getAllCartService = async (query) => {
  return HttpRequest.get(`${SERVER_URL}/newWay/cart${query}`);
};

export const getOneCartService = async (itemId) => {
  return await HttpRequest.get(`${SERVER_URL}/newWay/cart/${itemId}`);
};

export const addToCartService = async (itemId, data) => {
  return await HttpRequest.update(`${SERVER_URL}/newWay/cart/${itemId}`, data);
};

export const removeItemService = async (data, itemId) => {
  return await HttpRequest.post(`${SERVER_URL}/newWay/cart/${itemId}`, data);
};

export const deleteCartService = async (itemId, data) => {
  return await HttpRequest.update(
    `${SERVER_URL}/newWay/cart/one/${itemId}`,
    data
  );
};
