import React from "react";

const ClientDetails = ({RowData}) => {
  return (
    <div className="row justify-content-center">
      <div className="col-xl-10 col-lg-12">
        <h2 className="text-black font-w600">Clients details</h2>
        <br />
        <div className="basic-form">
          <div className="custom-card">
            <div className="card-header">
              <h4 className="card-title">Client Basic Info</h4>
            </div>
            <div className="card-body">
              <div className="list-group-flush">
                <div className="list-group-item bg-transparent d-flex justify-content-between px-0 py-1 font-weight-semi-bold border-top-0">
                  <p className="mb-0 ml-4">
                    <strong>First Name</strong>
                  </p>
                  <p className="mb-0 mr-4">{RowData?.firstname}</p>
                </div>
                <div className="list-group-item bg-transparent d-flex justify-content-between px-0 py-1">
                  <p className="mb-0 ml-4">
                    <strong>Last Name</strong>
                  </p>
                  <p className="mb-0 mr-4">{RowData?.lastname}</p>
                </div>
                <div className="list-group-item bg-transparent d-flex justify-content-between px-0 py-1">
                  <p className="mb-0 ml-4">
                    <strong>Phone Number</strong>
                  </p>
                  <p className="mb-0 mr-4">{RowData?.telephone}</p>
                </div>
                <div className="list-group-item bg-transparent d-flex justify-content-between px-0 py-1">
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
              </div>
            </div>
          </div>

          <div className="custom-card">
            <div className="card-header">
              <h4 className="card-title">Client Address Info</h4>
            </div>
            <div className="card-body">
              <div className="list-group-flush">
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
                    <strong>Address</strong>
                  </p>
                  <p className="mb-0 mr-4">{RowData?.street}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="custom-card">
            <div className="card-header">
              <h4 className="card-title">Client Info</h4>
            </div>
            <div className="card-body">
              <p className="ml-4 mr-4">{RowData?.client_info}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;
