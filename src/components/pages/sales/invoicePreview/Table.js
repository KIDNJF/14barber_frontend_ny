import React from "react";
import { useSelector } from "react-redux";

export default function Table() {
  const { cart } = useSelector((state) => state);
  const dataToDisplay = cart?.selected?.data;
  return (
    <>
      <table className="display table-hover w-full">
        <thead>
          <tr className="bg-gray-100 w-full">
            <td className="font-bold text-gray-900">Name</td>
            <td className="font-bold text-gray-900">Quantity</td>
            <td className="font-bold text-gray-900">Price(RWF)</td>
            <td className="font-bold text-gray-900">Amount (RWF)</td>
          </tr>
        </thead>
        <React.Fragment>
          <tbody className="">
            {dataToDisplay?.products?.length > 0 && (
              <>
                {dataToDisplay?.products?.map((d) => (
                  <tr className="h-10 w-full">
                    <td className="text-gray-900">
                      {d.productId?.productname}
                    </td>
                    <td className="text-gray-900">{d.quantity}</td>
                    <td className="text-gray-900">
                      {parseInt(d?.productId?.amount)?.toLocaleString()}
                    </td>
                    <td className="text-gray-900">
                      {(
                        d.quantity * parseInt(d?.productId?.amount)
                      )?.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </>
            )}
            {dataToDisplay?.listOfService?.length > 0 && (
              <>
                {dataToDisplay?.listOfService?.map((d) => (
                  <tr className="h-10 w-full">
                    <td className="text-gray-900">{d.servicename}</td>
                    <td className="text-gray-900">-</td>
                    <td className="text-gray-900">
                      {parseInt(d.amount)?.toLocaleString()}
                    </td>
                    <td className="text-gray-900">
                      {parseInt(d.amount)?.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </React.Fragment>
      </table>
      <div>
        <h2 className="flex items-end justify-end text-gray-800 text-lg font-bold">
          Total: Rwf {cart?.selected?.data?.amoutPaid?.toLocaleString()}
        </h2>
      </div>
    </>
  );
}
