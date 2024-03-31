/* eslint-disable no-useless-concat */
import React from "react";

const Service = ({ RowData, handlecheckbox, isTablet }) => {
  console.log("RowData", RowData);
  return (
    <div
      className={`tab-pane fade active show overflow-y-auto ${
        isTablet ? "h-[50vh]" : "h-[75vh]"
      } scrollbar-hide`}
    >
      <br />
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12">
          <h2 className="text-black font-w600 ml-3 mt-2">Services</h2>

          <div id="" className="basic-form">
            <div className="card-body">
              {RowData &&
                RowData.map((item) => (
                  <>
                    <div className="custom-card card-border pt-4 pb-4 pl-4 pr-4">
                      <div className="media  items-list-2">
                        <input
                          type="checkbox"
                          value={item._id}
                          checked={item.isChecked}
                          onChange={(e) => handlecheckbox(e)}
                          className="mr-4"
                        />
                        <div className="media-body ">
                          <h5 className="mt-0 mb-1 text-black">
                            {item.servicename}
                          </h5>
                          <ul className="fs-14 list-inline">
                            <li>{item.duration + " " + "mins"}</li>
                          </ul>
                        </div>
                        <div className="media-footer align-self-center ml-auto d-block align-items-center d-sm-flex">
                          <h3 className="mb-0 font-w600 text-secondary">
                            {"RWF " + parseInt(item.amount)?.toLocaleString()}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
