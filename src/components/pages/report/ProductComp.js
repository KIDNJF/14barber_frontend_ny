import React from "react";

const ProductComp = ({ product }) => {
  return (
    <>
      <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
        <table>
          {product?.map((product, rowIndex) => (
            <tr key={rowIndex}>
              <td>{product.productId?.productname}</td>
            </tr>
          ))}
        </table>
      </td>
      <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
        <table>
          {product?.map((product, rowIndex) => (
            <tr key={rowIndex}>
              <td>{product.quantity}</td>
            </tr>
          ))}
        </table>
      </td>
      <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
        <table>
          {product?.map((product, rowIndex) => (
            <tr key={rowIndex}>
              <td>{parseInt(product?.productId?.amount)?.toLocaleString()}</td>
            </tr>
          ))}
        </table>
      </td>
      <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
        <table>
          {product?.map((product, rowIndex) => (
            <tr key={rowIndex}>
              <td>
                {(
                  product?.quantity * parseInt(product?.productId?.amount)
                )?.toLocaleString()}
              </td>
            </tr>
          ))}
        </table>
      </td>
    </>
  );
};

export default ProductComp;
