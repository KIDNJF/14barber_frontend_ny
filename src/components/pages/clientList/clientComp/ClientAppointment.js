/* eslint-disable no-useless-concat */
import React from "react";

const ClientAppointment = ({ getAppByClientIdData }) => {
  return (
    <div className="row justify-center">
      <div className="col-xl-10 col-lg-12">
        <h2 className="text-black font-w600 ml-3 mt-2">Appointmnents</h2>

        <div id="" className="basic-form">
          <div className="card-body">
            {getAppByClientIdData &&
              getAppByClientIdData.map((item) => (
                <div
                  key={item._id}
                  className="custom-card card-border pt-4 pb-4 pl-4 pr-4 relative"
                >
                  <div className="media items-list-2">
                    <div className="media-body">
                      <h5 className="mt-0 mb-1 text-black">
                        {item.service_id.servicename}
                      </h5>
                      <ul className="fs-14 list-inline">
                        <li>{item.service_id.duration + " " + "mins"}</li>
                      </ul>
                      <small className="text-primary font-w500 mb-3">
                        {"By" +
                          " " +
                          item?.teammember_id?.firstname +
                          " " +
                          "On" +
                          " " +
                          item?.start_time}
                      </small>
                      <span className="text-secondary mr-2 fo"></span>
                    </div>
                    <div className="media-footer align-self-center ml-auto d-block align-items-center">
                      <h3 className="mb-0 font-w600 text-secondary">
                        {"$" + " " + item?.service_id?.amount}
                      </h3>
                    </div>
                  </div>
                  <span
                    className={`${
                      item?.appointment_status === "DONE"
                        ? "bg-green-500"
                        : item?.appointment_status === "PENDING"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    } border absolute right-4 text-white top-2 rounded border-gray-300 py-1 px-2 mb-0.5`}
                  >
                    {item?.appointment_status}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientAppointment;
