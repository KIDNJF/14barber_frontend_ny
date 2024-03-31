/* eslint-disable no-useless-concat */
import React from "react";

const PermissionControl = ({ RowData, handlecheckbox, fname }) => {
  console.log("fname", fname?.firstname);
  return (
    <div
      className="tab-pane fade active show overflow-y-auto h-[75vh] scrollbar-hide"
      id="details"
    >
      <br />
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12">
          <h2 className="text-black font-w600">
            {fname.firstname + "'s" + " " + "Permissions"}
          </h2>
          <br />
          <div className="basic-form">
            <div className=" custom-card">
              <div className="card-header">
                <h4 className="card-title">Permissions</h4>
              </div>
              <div className="card-body">
                <div className="list-group-flush ">
                  {RowData.map((item, index) => (
                    <div
                      key={index}
                      className="list-group-item bg-transparent d-flex justify-content-between px-0 py-1 "
                    >
                      <p className="mb-0 ml-4">
                        <input
                          type="checkbox"
                          value={item._id}
                          checked={item.isChecked}
                          onChange={(e) => handlecheckbox(e)}
                          className="mr-4"
                        />

                        <strong>{item.permissions}</strong>
                        {","}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermissionControl;
