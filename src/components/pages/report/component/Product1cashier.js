import React from "react";

const ProductComp = ({ product }) => {
  return (
    <>
      <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
        <table>
          {product?.map((product, rowIndex) => (
            <tr key={rowIndex}>
              <td>{product.productName}</td>
            </tr>
          ))}
        </table>
      </td>
      <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
        <table>
          {product?.map((product, rowIndex) => (
            <tr key={rowIndex}>
              <td>{product.productQnt}</td>
            </tr>
          ))}
        </table>
      </td>
      <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
        <table>
          {product?.map((product, rowIndex) => (
            <tr key={rowIndex}>
              <td>{product.cost}</td>
            </tr>
          ))}
        </table>
      </td>
      <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
        <table>
          {product?.map((product, rowIndex) => (
            <tr key={rowIndex}>
              <td>{product?.productQnt * product?.cost}</td>
            </tr>
          ))}
        </table>
      </td>
    </>
  );
};

export default ProductComp;
