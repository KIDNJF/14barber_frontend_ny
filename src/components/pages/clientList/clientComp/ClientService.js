import React from "react";

const ClientService = ({ getSAlesByClientId }) => {
  return (
    <div className="row justify-content-center">
      <div className="col-xl-10 col-lg-12">
        <h2 className="text-black font-w600 ml-3 mt-2">Services</h2>
        <div id="" className="basic-form">
          <div className="card-body">
            {getSAlesByClientId.map((item) => (
              <div className="custom-card card-border pt-4 pb-4 pl-4 pr-4">
                <div className="media items-list-2">
                  <h5 className="mt-0 mb-1 text-black">{item.service}</h5>
                  <div className="media-footer align-self-center ml-auto d-block align-items-center d-sm-flex">
                    <h3 className="mb-0 font-w600 text-secondary">
                      {"Rwf " + item.totalbt2}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientService;
