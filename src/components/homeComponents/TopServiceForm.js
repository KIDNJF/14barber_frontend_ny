import React from "react";
import groupBy from "lodash/groupBy";
import sumBy from "lodash/sumBy";

const TopServiceForm = ({ salesData, isTablet }) => {
  const topServices = [];
  salesData.forEach((element) => {
    if (element.service !== "") {
      topServices.push({
        id: element._id,
        amount: element.totalbt2,
        services: element.service,
      });
    }
  });

  const groups = groupBy(topServices, (entry) => {
    return entry.services;
  });

  const topEmployees = Object.entries(groups).map((entry) => {
    const [key, values] = entry;

    return {
      name: key,
      total: sumBy(values, "amount"),
    };
  });
  const sorttedData = topEmployees.sort((a, b) => b.total - a.total);

  return (
    <div className="col-xl-6 col-xxl-6 col-lg-12 col-md-12">
      <div id="user-activity" className="card" style={{ border: '1px solid #d1d1d1' }}>
        <div className="card-header border-0 pb-0 d-sm-flex d-block">
          <div>
            <h4 className="card-title mb-1">Top services</h4>
          </div>
        </div>
        <div className="card-body">
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="user"
              role="tabpanel"
            >
              <table className="table xtable-responsive-md">
                <thead>
                  <tr>
                    {!isTablet && (
                      <th className="w-[80px]">
                        <strong>#</strong>
                      </th>
                    )}
                    <th>
                      <strong>SERVICE</strong>
                    </th>
                    <th>
                      <strong>GENERATED</strong>
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {sorttedData.map((item, index) => (
                    <tr key={index}>
                      {!isTablet && (
                        <td>
                          <strong>{index + 1}</strong>
                        </td>
                      )}
                      <td>{item.name}</td>
                      <td>{item.total}</td>

                      {/* <td>
                      <div className="dropdown">
                        <button
                          type="button"
                          className="btn btn-success light sharp shadow-none"
                        >
                          <i className="ti-eye"></i>
                        </button>
                      </div>
                    </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopServiceForm;
