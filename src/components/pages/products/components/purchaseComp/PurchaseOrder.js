import React from "react";

const PurchaseOrder = ({ RowData, isTablet }) => {
  return (
    <div className="col-md-8">
      
                      
      <div className="tab-content">
        <div
          className={`tab-pane fade active show overflow-y-auto ${
            isTablet ? "h-[50vh]" : "h-[95vh]"
          } scrollbar-hide`}
          id="details"
        >
          <br />
          <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-12">
              <h2 className="text-black font-w600  mb-3">
                Purchase order details
              </h2>
              <br />
              <div className="basic-form">
                <div className="custom-card">
                  <div className="card-header">
                    <h4 className="card-title">Purchase order summary</h4>
                  </div>
                  <div className="card-body">
                    <div className="list-group-flush">
                      {/* <div className="list-group-item bg-transparent d-flex justify-content-between px-0 py-1 font-weight-semi-bold border-top-0 ">
                        <p className="mb-0 ml-4">
                          <strong>Processed by</strong>
                        </p>
                        <p className="mb-0 mr-4">Airi Satou</p>
                      </div> */}
                      <div className="list-group-item bg-transparent d-flex justify-content-between px-0 py-1 ">
                        <p className="mb-0 ml-4">
                          <strong>Total quantity</strong>
                        </p>
                        <p className="mb-0 mr-4">{RowData?.total_quantity}</p>
                      </div>
                      <div className="list-group-item bg-transparent d-flex justify-content-between px-0 py-1 ">
                        <p className="mb-0 ml-4">
                          <strong>Total cost</strong>
                        </p>
                        <p className="mb-0 mr-4">
                          {"RWF" + " " + RowData?.total_amount}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="custom-card">
                  <div className="card-header">
                    <h4 className="card-title">Supplier Info</h4>
                  </div>
                  <div className="card-body">
                    <div className="list-group-flush">
                      <div className="list-group-item bg-transparent d-flex justify-content-between px-0 py-1 font-weight-semi-bold border-top-0 ">
                        <p className="mb-0 ml-4">
                          <strong>Name</strong>
                        </p>
                        <p className="mb-0 mr-4">
                          {RowData?.supplierId?.firstname +
                            " " +
                            RowData?.supplierId?.lastname}
                        </p>
                      </div>
                      <div className="list-group-item bg-transparent d-flex justify-content-between px-0 py-1 ">
                        <p className="mb-0 ml-4">
                          <strong>Phone Number</strong>
                        </p>
                        <p className="mb-0 mr-4">
                          {RowData?.supplierId?.phone}
                        </p>
                      </div>
                      <div className="list-group-item bg-transparent d-flex justify-content-between px-0 py-1 ">
                        <p className="mb-0 ml-4">
                          <strong>Email</strong>
                        </p>
                        <p className="mb-0 mr-4">{RowData?.supplierId?.email}</p>
                      </div>
                      <div className="list-group-item bg-transparent d-flex justify-content-between px-0 py-1 ">
                        <p className="mb-0 ml-4">
                          <strong>Website</strong>
                        </p>
                        <p className="mb-0 mr-4">
                          {RowData?.supplier_id?.website}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div className="custom-card">
                  <div className="card-header">
                    <h4 className="card-title">Product Info</h4>
                  </div>
                  <div className="card-body">
                    <div className="list-group-flush">
                      <div className="list-group-item bg-transparent d-flex justify-content-between px-0 py-1 font-weight-semi-bold border-top-0 ">
                        <p className="mb-0 ml-4">
                          <strong>Product name</strong>
                        </p>
                        <p className="mb-0 mr-4">
                          {RowData?.product_id?.productname}
                        </p>
                      </div>
                      <div className="list-group-item bg-transparent d-flex justify-content-between px-0 py-1 ">
                        <p className="mb-0 ml-4">
                          <strong>Ordered quantity</strong>
                        </p>
                        <p className="mb-0 mr-4">{RowData?.quantity}</p>
                      </div>
                      <div className="list-group-item bg-transparent d-flex justify-content-between px-0 py-1 ">
                        <p className="mb-0 ml-4">
                          <strong>price</strong>
                        </p>
                        <p className="mb-0 mr-4">
                          {"RWF" + " " + RowData?.price}
                        </p>
                      </div>
                      <div className="list-group-item bg-transparent d-flex justify-content-between px-0 py-1 ">
                        <p className="mb-0 ml-4">
                          <strong>Total cost</strong>
                        </p>
                        <p className="mb-0 mr-4">
                          {"RWF" + " " + RowData?.total}
                        </p>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrder;
