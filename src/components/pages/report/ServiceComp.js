import React from "react";

const ServiceComp = ({ service }) => {
  const totalServiceAmount = service.reduce(
    (acc, sum) => acc + parseInt(sum?.amount),
    0
  );

  return (
    <>
      <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
        <table>
          {service.map((service, rowIndex) => (
            <tr key={rowIndex}>
              <td>{service?.servicename}</td>
            </tr>
          ))}
        </table>
      </td>
       {/* <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500"> 
        -
      </td> */}
       {/* <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">  
        <table>
          {service.map((service, rowIndex) => (
            <tr key={rowIndex}>
              <td>{parseInt(service.amount)?.toLocaleString()}</td>
            </tr>
          ))}
        </table>
      </td>*/}

      <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
        <table>
          {service.map((service, rowIndex) => (
            <tr key={rowIndex}>
              <td>{parseInt(totalServiceAmount)?.toLocaleString()}</td>
            </tr>
          ))}
        </table>
      </td>
    </>
  );
};

export default ServiceComp;
