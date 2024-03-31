/* eslint-disable no-useless-concat */
import React from "react";

const Appointment = ({ getAppByMemberIdData, isTablet }) => {
  return (
    <div
      className={`tab-pane fade active show overflow-y-auto ${
        isTablet ? "h-[50vh]" : "h-[75vh]"
      } scrollbar-hide`}
    >
      <br />
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12">
          <h2 className="text-black font-w600">Appointmnents</h2>
          <br />
          <div className="basic-form">
            <div className=" custom-card">
              <div className="card-body">
                <div
                  id="DZ_W_Todo1"
                  className="table-responsive dz-scroll h-[370px]"
                >
                  <table className="table items-table">
                    <tr>
                      <th className="mt-0 w-2/5 text-black mb-4">
                        Time and Service
                      </th>
                      <th className="mt-0 w-[20%] text-black mb-4">Clients</th>
                      <th className="mt-0 w-[20%] text-black mb-4">
                        Amount(RWF)
                      </th>
                      <th className="mt-0 w-[20%] text-black mb-4">Status</th>
                    </tr>
                    {getAppByMemberIdData?.map((item) => (
                      <tr key={item._id}>
                        <td>
                          <div className="media">
                            <div className="media-body">
                              <small className="mt-0 mb-1 text-primary font-w500">
                                {item?.start_time}
                              </small>
                              <h4 className="mt-0 mb-2 text-black ">
                                {item?.service_id?.servicename}
                              </h4>
                              <h5 className="mt-0 mb-2 text-black ">
                                {"by" + " " + item?.teammember?.firstname}
                              </h5>
                            </div>
                          </div>
                        </td>
                        <td>
                          <h4 className="my-0 text-secondary font-w600">
                            {item?.telephone?.firstname}
                          </h4>
                        </td>
                        <td>
                          <h4 className="my-0 text-secondary font-w600">
                            {item?.service_id?.amount?.toLocaleString()}
                          </h4>
                        </td>
                        <td>
                          <span className="badge badge-primary">
                            {item?.appointment_status}{" "}
                            <span
                              className={`${
                                item?.appointment_status === "DONE"
                                  ? "ml-1 fa fa-check"
                                  : item.appointment_status === "CANCELLED"
                                  ? "ml-1 fa fa-ban"
                                  : ""
                              }`}
                            ></span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
