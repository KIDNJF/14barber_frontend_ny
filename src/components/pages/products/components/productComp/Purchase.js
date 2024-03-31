import React from "react";
import Nodata from "../../../../Nodata";

const Purchase = ({ orderData, isTablet }) => {
  return (
    <div
      className={`tab-pane fade active show overflow-y-auto ${
        isTablet ? "h-[50vh]" : "h-[75vh]"
      }`}
    >
      <br />
      {orderData?.product_id ? (
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12">
            <h2 className="text-black font-w600 ml-3 mt-2">Purchase orders</h2>

            <div id="" className="basic-form">
              <div className="card-body">
                <div className="custom-card card-border pt-4 pb-4 pl-4 pr-4">
                  <div className="media items-list-2">
                    <div className="media-body">
                      <h3 className="mt-0 mb-1 text-black">
                        {orderData?.product_id?.productname}
                      </h3>
                      <small className="text-primary font-w500 mb-3">
                        {/* {orderData?.createdAt.split('T')} */}
                        {orderData?.createdAt}
                      </small>
                      <span className="text-secondary mr-2 fo"></span>
                      <ul className="fs-14 list-inline">
                        <span
                          href="#link"
                          className="badge light badge-primary btn-xs mt-3"
                        >
                          ORDERED
                        </span>
                      </ul>
                    </div>
                    <div className="media-footer align-self-center ml-auto d-block align-items-center d-sm-flex">
                      <h3 className="mb-0 font-w600 text-secondary">
                        {"$" + " " + orderData?.total}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Nodata />
      )}
    </div>
  );
};

export default Purchase;
