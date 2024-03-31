import React from "react";
import ProductComp from "./ProductComp";
import ServiceComp from "./ServiceComp";
import moment from "moment-timezone";

const ReportTable = ({ data }) => {
  const originalDate = data.updatedAt;
  const rwandaTimezone = "Africa/Kigali";
  const convertedDate = moment(originalDate)
    .tz(rwandaTimezone)
    .add(0, "hour")
    .format();

    console.log("kidd",data?.amoutPaid);

  return (
    <>
      <tr className="border-b dark:border-neutral-500">
        <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
          {convertedDate?.slice(11, 16)}
        </td>
        <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
          {data?.hasAppointment[0]?.teammemberId.firstname ?? "N/A"}
          
        </td>
        <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
          {data?.amoutPaid?.toLocaleString()}
        </td>
        <ProductComp product={data.products} />
        <ServiceComp service={data.listOfService} />
        <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
          {data?.paymentMethod?.toLowerCase() === "momo" &&
            data?.amoutPaid?.toLocaleString()}
        </td>
        <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
          {data?.paymentMethod?.toLowerCase() === "card" &&
            data?.amoutPaid?.toLocaleString()}
        </td>
        <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
          {data?.paymentMethod?.toLowerCase() === "cash" &&
            data?.amoutPaid?.toLocaleString()}
        </td>
      </tr>
    </>
  );
};

export default ReportTable;
