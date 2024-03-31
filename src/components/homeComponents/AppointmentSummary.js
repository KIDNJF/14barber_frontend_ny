import { useMediaQuery } from "@mui/material";
import React from "react";

const AppointmentSummary = ({
  onclick,
  onclicked,
  appointLength,
  completed,
  pending,
  cancelled,
  completedPercent,
  pendingPercent,
  cancelledPercent,
}) => {
  const isTablet = useMediaQuery("(max-width: 960px)");
  return (
    <div className="front">
      <div className="card-header border-0 pb-0 d-sm-flex d-block">
        <div>
          <h4 className="card-title mb-1">Appointment Summary</h4>
        </div>
      </div>

      <div className="card-body orders-summary">
        <div
          className={`${
            !isTablet && "flex"
          } order-manage p-2 mb-4 justify-between mx-2`}
        >
          <div
            className={`${
              isTablet ? "flex items-center justify-between pr-4 pb-4" : "block"
            } items-center text-left`}
            onClick={onclick}
          >
            <h4 className="mb-0 cursor-pointer">Total appointments</h4>
            <button className="rounded hover:text-white bg-[#eeb974] py-1 px-2 shadow-none">
              {appointLength}
            </button>
          </div>
          <span
            className={`text-primary font-w500 text-left cursor-pointer ${
              isTablet && "flex justify-between items-center pr-4"
            }`}
            onClick={onclicked}
          >
            Manage appointments <i className="ti-angle-right ml-1"></i>
          </span>
        </div>
        <div className="row">
          <div className="col-sm-4 mb-4">
            <div className="border px-3 py-3 rounded-xl">
              <h2 className="fs-32 font-w600 counter">{pending}</h2>
              <p className="fs-16 mb-0">Pending</p>
            </div>
          </div>
          <div className="col-sm-4 mb-4">
            <div className="border px-3 py-3 rounded-xl">
              <h2 className="fs-32 font-w600 counter">{completed}</h2>
              <p className="fs-16 mb-0">Delivered</p>
            </div>
          </div>
          <div className="col-sm-4 mb-4">
            <div className="border px-3 py-3 rounded-xl">
              <h2 className="fs-32 font-w600 counter">{cancelled}</h2>
              <p className="fs-16 mb-0">Canceled</p>
            </div>
          </div>
        </div>

        <div className="widget-timeline-icon">
          <div className="row align-items-center mx-0">
            <div className="col-xl-12 col-lg-8 col-xxl-8 col-sm-8 px-0">
              <div className="d-flex align-items-center mb-3">
                <p className="mb-0 fs-14 mr-2 col-4 px-0">
                  Pending ({pending + "%"})
                </p>
                <div className="progress mb-0 h-[8px] w-full">
                  <div
                    className={`progress-bar bg-warning progress-animated w-[${pendingPercent}%] h-[8px]`}
                    role="progressbar"
                  >
                    <span className="sr-only">{pending}</span>
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <p className="mb-0 fs-14 mr-2 col-4 px-0">
                  Delivered ({completed + "%"})
                </p>
                <div className="progress mb-0 h-[8px] w-full">
                  <div
                    className={`progress-bar bg-success progress-animated w-[${completedPercent}%] h-[8px]`}
                    role="progressbar"
                  >
                    <span className="sr-only">{completed}</span>
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <p className="mb-0 fs-14 mr-2 col-4 px-0">
                  Canceled ({cancelled + "%"})
                </p>
                <div className="progress mb-0 h-[8px] w-full">
                  <div
                    className={`progress-bar bg-dark progress-animated w-[${cancelledPercent}%] h-[8px]`}
                    role="progressbar"
                  >
                    <span className="sr-only">{cancelled}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentSummary;
