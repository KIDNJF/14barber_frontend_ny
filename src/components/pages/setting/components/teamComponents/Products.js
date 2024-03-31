import React from "react";
import Nodata from '../../../../Nodata'

const Products = () => {
  return (
    <div className="tab-pane fade active show overflow-y-auto h-[75vh] scrollbar-hide">
      <br />
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12">
          <h2 className="text-black font-w600 ml-3 mt-2">Products</h2>

          <div id="" className="basic-form">
            <div className="card-body">
              <Nodata/>
              {/* <div className="custom-card card-border pt-4 pb-4 pl-4 pr-4">
                <div className="media  items-list-2">
                  <div className="media-body ">
                    <h5 className="mt-0 mb-1 text-black">Heads and Shoulder</h5>
                    <small className="text-primary font-w500 mb-3">
                      SHAMPOO
                    </small>
                    <span className="text-secondary mr-2 fo"></span>
                    <ul className="fs-14 list-inline">
                      <li>29 July 2020 - 02:26 PM</li>
                    </ul>
                  </div>
                  <div className="media-footer align-self-center ml-auto d-block align-items-center d-sm-flex">
                    <h3 className="mb-0 font-w600 text-secondary">$12.56</h3>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
