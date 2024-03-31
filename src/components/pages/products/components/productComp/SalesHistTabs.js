import React from "react";

const SalesHistTabs = ({ isTablet }) => {
  return (
    <div
      className={`tab-pane fade active show overflow-y-auto ${
        isTablet ? "h-[50vh]" : "h-[75vh]"
      }`}
    >
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12">
          <h2 className="text-black font-w600 ml-3 mt-2">Sales history</h2>

          <div id="" className="basic-form">
            <div className="card-body">
              <div className="custom-card card-border pt-4 pb-4 pl-4 pr-4">
                <div className="media items-list-2">
                  <div className="media-body">
                    <h3 className="mt-0 mb-1 text-black">5</h3>
                    <small className="text-primary font-w500 mb-3">
                      Created on 29 July 2020 - 02:26 PM
                    </small>
                    <span className="text-secondary mr-2 fo"></span>
                    <ul className="fs-14 list-inline">
                      <span
                        href="#link"
                        className="badge light badge-success btn-xs mt-3"
                      >
                        COMPLETED
                      </span>
                    </ul>
                  </div>
                  <div className="media-footer align-self-center ml-auto d-block align-items-center d-sm-flex">
                    <h3 className="mb-0 font-w600 text-secondary">$12.56</h3>
                  </div>
                </div>
              </div>
              <div className="custom-card card-border pt-4 pb-4 pl-4 pr-4">
                <div className="media items-list-2">
                  <div className="media-body">
                    <h3 className="mt-0 mb-1 text-black">4</h3>
                    <small className="text-primary font-w500 mb-3">
                      Created on 29 July 2020 - 02:26 PM
                    </small>
                    <span className="text-secondary mr-2 fo"></span>
                    <ul className="fs-14 list-inline">
                      <span
                        href="#link"
                        className="badge light badge-success btn-xs mt-3"
                      >
                        COMPLETED
                      </span>
                    </ul>
                  </div>
                  <div className="media-footer align-self-center ml-auto d-block align-items-center d-sm-flex">
                    <h3 className="mb-0 font-w600 text-secondary">$12.56</h3>
                  </div>
                </div>
              </div>
              <div className="custom-card card-border pt-4 pb-4 pl-4 pr-4">
                <div className="media items-list-2">
                  <div className="media-body">
                    <h3 className="mt-0 mb-1 text-black">3</h3>
                    <small className="text-primary font-w500 mb-3">
                      Created on 29 July 2020 - 02:26 PM
                    </small>
                    <span className="text-secondary mr-2 fo"></span>
                    <ul className="fs-14 list-inline">
                      <span
                        href="#link"
                        className="badge light badge-success btn-xs mt-3"
                      >
                        COMPLETED
                      </span>
                    </ul>
                  </div>
                  <div className="media-footer align-self-center ml-auto d-block align-items-center d-sm-flex">
                    <h3 className="mb-0 font-w600 text-secondary">$12.56</h3>
                  </div>
                </div>
              </div>
              <div className="custom-card card-border pt-4 pb-4 pl-4 pr-4">
                <div className="media items-list-2">
                  <div className="media-body">
                    <h3 className="mt-0 mb-1 text-black">2</h3>
                    <small className="text-primary font-w500 mb-3">
                      Created on 29 July 2020 - 02:26 PM
                    </small>
                    <span className="text-secondary mr-2 fo"></span>
                    <ul className="fs-14 list-inline">
                      <span
                        href="#link"
                        className="badge light badge-success btn-xs mt-3"
                      >
                        COMPLETED
                      </span>
                    </ul>
                  </div>
                  <div className="media-footer align-self-center ml-auto d-block align-items-center d-sm-flex">
                    <h3 className="mb-0 font-w600 text-secondary">$12.56</h3>
                  </div>
                </div>
              </div>
              <div className="custom-card card-border pt-4 pb-4 pl-4 pr-4">
                <div className="media items-list-2">
                  <div className="media-body">
                    <h3 className="mt-0 mb-1 text-black">1</h3>
                    <small className="text-primary font-w500 mb-3">
                      Created on 29 July 2020 - 02:26 PM
                    </small>
                    <span className="text-secondary mr-2 fo"></span>
                    <ul className="fs-14 list-inline">
                      <span
                        href="#link"
                        className="badge light badge-success btn-xs mt-3"
                      >
                        COMPLETED
                      </span>
                    </ul>
                  </div>
                  <div className="media-footer align-self-center ml-auto d-block align-items-center d-sm-flex">
                    <h3 className="mb-0 font-w600 text-secondary">$12.56</h3>
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

export default SalesHistTabs;
