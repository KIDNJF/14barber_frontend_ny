import React from "react";

const ServiceComp = ({ service, appointment }) => {
  const allData = service.concat(appointment);

  return (
    <>
      <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
        <table>
          {allData.map((service, rowIndex) => (
            <tr key={rowIndex}>
              <td>
                {service.servicesName && service.serviceName
                  ? `${service.servicesName} ${service.serviceName}`
                  : service.servicesName || service.serviceName}
              </td>
            </tr>
          ))}
        </table>
      </td>
      <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
        <table>
          {allData.map((service, rowIndex) => (
            <tr key={rowIndex}>
              <td>{service.cost}</td>
            </tr>
          ))}
        </table>
      </td>
      <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
        -
      </td>
      <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
        <table>
          {allData.map((service, rowIndex) => (
            <tr key={rowIndex}>
              <td>{service.cost}</td>
            </tr>
          ))}
        </table>
      </td>
    </>
  );
};

export default ServiceComp;
