import React from "react";
import Service1cashier from "./component/Service1cashier";
import Product1cashier from "./component/Product1cashier";
import moment from "moment";

const SingleCashier = ({ data }) => {
  const totalCost1 = data?.servicesStore?.reduce(
    (acc, current) => acc + current.cost,
    0
  );
  const totalCost2 = data?.appointmentStore?.reduce(
    (acc, current) => acc + current.cost,
    0
  );

  const originalDate = data.created;
  const rwandaTimezone = "Africa/Kigali";
  const convertedDate = moment(originalDate)
    .tz(rwandaTimezone)
    .add(1, "hour")
    .format();
  return (
    <>
      <tr className="border-b dark:border-neutral-500">
        <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
          {convertedDate?.slice(11, 16)}
        </td>
        <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
          {data && data?.barber}
        </td>
        <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
          {totalCost1 + totalCost2}
        </td>

        <Product1cashier product={data.productStore} />
        <Service1cashier
          service={data.servicesStore}
          appointment={data.appointmentStore}
        />
        <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
          {data?.paymentMethod === "momo" && data?.amountPaid}
        </td>

        <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
          {data?.paymentMethod === "pos" && data?.amountPaid}
        </td>
        <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
          {data?.paymentMethod === "cash" && data?.amountPaid}
        </td>
      </tr>
    </>
  );
};

export default SingleCashier;
