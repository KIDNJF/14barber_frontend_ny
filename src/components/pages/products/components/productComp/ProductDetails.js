/* eslint-disable no-useless-concat */
import React from "react";

const ProductDetails = ({ RowData, productData, isTablet }) => {
  console.log("rowData", RowData);
  console.log(" productData", productData);
  return (
    <div
      className={`tab-pane fade active show overflow-y-auto ${
        isTablet ? "h-[50vh]" : "h-[75vh]"
      }`}
      id="product-details"
    >
      <br />
      <div className="row ">
        <div className="col-xl-11 col-lg-12 ml-2">
          <br />
          <div className="basic-form">
            <div className="custom-card">
              <div className="card-header">
                <h4 className="card-title">Client Basic Info</h4>
              </div>
              <div className="card-body">
                <div className="list-group-flush">
                  <div className="list-group-item bg-transparent d-flex justify-content-between px-0 py-1 font-weight-semi-bold ">
                    <p className="mb-0 ml-4">
                      <strong>Product Name</strong>
                    </p>
                    <p className="mb-0 mr-4">{RowData.productname}</p>
                  </div>
                  <div className="list-group-item bg-transparent d-flex justify-content-between px-0 py-1 font-weight-semi-bold ">
                    <p className="mb-0 ml-4">
                      <strong>Price</strong>
                    </p>
                    <p className="mb-0 mr-4">
                      {parseInt(RowData.amount)?.toLocaleString() + " RWF"}
                    </p>
                  </div>
                  <div className="list-group-item bg-transparent d-flex justify-content-between px-0 py-1 ">
                    <p className="mb-0 ml-4">
                      <strong>Product category</strong>
                    </p>
                    <p className="mb-0 mr-4">
                      {RowData?.category_id?.categoryname}
                    </p>
                  </div>
                  <div className="list-group-item bg-transparent d-flex justify-content-between px-0 py-1 ">
                    <p className="mb-0 ml-4">
                      <strong>supplier</strong>
                    </p>
                    <p className="mb-0 mr-4">
                      {/* {productData?.supplier_id?.firstname &&
                      productData?.supplier_id?.lastname
                        ? `${productData?.supplier_id?.firstname} ${productData?.supplier_id?.lastname}`
                        : productData?.supplier_id?.firstname ||
                          productData?.supplier_id?.lastname} */}
                          {/* {productData?.supplier_id?.suppliername} */}
                          {productData?.supplier_id?.suppliername || 'No Supplier'}
                    </p>
                  </div>
                </div>
                <hr />
                <p className="mb-0 ml-4">
                  <strong>Description</strong>
                </p>
                <p className="ml-4">{RowData?.description}</p>
              </div>
            </div>

            <div className="custom-card">
              <div className="card-header">
                <h4 className="card-title">Stock Info</h4>
              </div>
              <div className="card-body">
                <div className="list-group-flush">
                  <div className="list-group-item bg-transparent d-flex justify-content-between px-0 py-1 font-weight-semi-bold border-top-0 ">
                    <p className="mb-0 ml-4">
                      <strong>Markup</strong>
                    </p>
                    <p className="mb-0 mr-4">
                      {productData?.markup &&
                        parseInt(productData?.markup)?.toLocaleString() +
                          " RWF"}
                    </p>
                  </div>
                  <div className="list-group-item bg-transparent d-flex justify-content-between px-0 py-1 font-weight-semi-bold border-top-0 ">
                    <p className="mb-0 ml-4">
                      <strong>Primary SKU</strong>
                    </p>
                    <p className="mb-0 mr-4">{productData?.SKU}</p>
                  </div>
                  <div className="list-group-item bg-transparent d-flex justify-content-between px-0 py-1 ">
                    <p className="mb-0 ml-4">
                      <strong>Supply price</strong>
                    </p>
                    <p className="mb-0 mr-4">
                      {parseInt(productData?.supply_price)?.toLocaleString() +
                        " RWF"}
                    </p>
                  </div>
                  <div className="list-group-item bg-transparent d-flex justify-content-between px-0 py-1 ">
                    <p className="mb-0 ml-4">
                      <strong>Retail price</strong>
                    </p>
                    <p className="mb-0 mr-4">
                      {parseInt(productData?.retail_price)?.toLocaleString() +
                        " RWF"}
                    </p>
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

export default ProductDetails;
