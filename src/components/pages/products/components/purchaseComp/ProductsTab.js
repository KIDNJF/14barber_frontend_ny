import React from "react";

const ProductsTab = ({ RowData, isTablet }) => {
  return (
   
<div
      className={`tab-pane fade active show overflow-y-auto ${
        isTablet ? "h-[50vh]" : "h-[75vh]"
      }`}
    >
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12">

          <div id="" className="basic-form">
            <div className="card-body">

              {RowData.map((item)=>(
              <div className="custom-card card-border pt-4 pb-4 pl-4 pr-4">
                <div className="media items-list-2">
                  <div className="media-body">
                    <h3 className="mt-0 mb-1 text-black">{item.id.productname}</h3>
                    {/* <small className="text-primary font-w500 mb-3">
                      {item.id.productname}
                    </small> */}
                    {/* <span className="text-secondary mr-2 fo"></span> */}
                    <ul className="fs-14 list-inline">
                      <span
                        href="#link"
                        className="badge light badge-success btn-xs mt-3"
                      >
                        {item.quantity}
                      </span>
                    </ul>
                  </div>
                  <div className="media-footer align-self-center ml-auto d-block align-items-center d-sm-flex">
                    <h3 className="mb-0 font-w600 text-secondary">{item.total_price} Rwf</h3>
                  </div>
                </div>
              </div>
              ))}
              
              
            </div>
          </div>
        </div>
      </div>
    </div>     
  );
};

export default ProductsTab;
