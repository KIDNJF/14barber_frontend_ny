import { SERVER_URL } from "../../utils/constants";
import HttpRequest from "../../utils/HttpRequest";

export const completeAppointmentService = async (itemId, data) => {
  return await HttpRequest.update(
    `${SERVER_URL}/appointment/done/${itemId}`,
    data
  );
};
