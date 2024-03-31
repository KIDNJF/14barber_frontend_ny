import React from "react";

const Client = ({ RowData, isTablet }) => {
  return (
    <div
      className={`tab-pane fade active show overflow-y-auto ${
        isTablet ? "h-[50vh]" : "h-[75vh]"
      }  scrollbar-hide`}
      id="details"
    >
      <br />
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12">
          <h2 className="text-black font-w600">Detailed Information</h2>
          <br />
          <div className="basic-form">
            <div className=" custom-card">
              <div className="card-header">
                <h4 className="card-title">Basic Info</h4>
              </div>
              <div className="card-body">
                <div className="list-group-flush ">
                  <div className="list-group-item bg-transparent d-flex justify-content-between px-0 py-1 font-weight-semi-bold border-top-0">
                    <p className="mb-0 ml-4">
                      <strong>Firstname</strong>
                    </p>
                    <p className="mb-0 mr-4">{RowData?.firstname}</p>
                  </div>
                  <div className="list-group-item bg-transparent d-flex justify-content-between px-0 py-1">
                    <p className="mb-0 ml-4">
                      <strong>Lastname</strong>
                    </p>
                    <p className="mb-0 mr-4">{RowData?.lastname}</p>
                  </div>
                  <div className="list-group-item bg-transparent d-flex justify-content-between px-0 py-1">
                    <p className="mb-0 ml-4">
                      <strong>Phone Number</strong>
                    </p>
                    <p className="mb-0 mr-4">{RowData?.telephone}</p>
                  </div>
                  <div className="list-group-item bg-transparent d-flex justify-content-between px-0 py-1 ">
                    <p className="mb-0 ml-4">
                      <strong>Email</strong>
                    </p>
                    <p className="mb-0 mr-4">{RowData?.email}</p>
                  </div>
                  <div className="list-group-item bg-transparent d-flex justify-content-between px-0 py-1">
                    <p className="mb-0 ml-4">
                      <strong>Gender</strong>
                    </p>
                    <p className="mb-0 mr-4">{RowData?.gender?.name}</p>
                  </div>
                  <div className="list-group-item bg-transparent d-flex justify-content-between px-0 py-1">
                    <p className="mb-0 ml-4">
                      <strong>Role</strong>
                    </p>
                    <p className="mb-0 mr-4">
                      {RowData?.type === "ADMIN_A"
                        ? "ADMIN"
                        : RowData?.type === "MANAGER_M"
                        ? "MANAGER"
                        : RowData?.type === "CASHIER_C"
                        ? "CASHIER"
                        : RowData?.type === "BARBER_B"
                        ? "BABER"
                        : "USER"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className=" custom-card">
              <div className="card-header">
                <h4 className="card-title">Address Info</h4>
              </div>
              <div className="card-body">
                <div className="list-group-flush ">
                  <div className="list-group-item bg-transparent d-flex justify-content-between px-0 py-1 font-weight-semi-bold border-top-0">
                    <p className="mb-0 ml-4">
                      <strong>Country</strong>
                    </p>
                    <p className="mb-0 mr-4">{RowData?.country}</p>
                  </div>
                  <div className="list-group-item bg-transparent d-flex justify-content-between px-0 py-1">
                    <p className="mb-0 ml-4">
                      <strong>City</strong>
                    </p>
                    <p className="mb-0 mr-4">{RowData?.city}</p>
                  </div>
                  <div className="list-group-item bg-transparent d-flex justify-content-between px-0 py-1">
                    <p className="mb-0 ml-4">
                      <strong>Street</strong>
                    </p>
                    <p className="mb-0 mr-4">{RowData?.street}</p>
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

export default Client;
