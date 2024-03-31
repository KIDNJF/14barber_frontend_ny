import React from "react";
import Image2 from "../assets/images/No.svg";

const Nodata = () => {
  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <div className="text-center mb-3 mt-4">
        <div className="profile-photo flex justify-center mx-auto">
          <img src={Image2} width="150" className="img-fluid" alt="" />
        </div>
        <h3 className="mt-4 mb-1 text-black">No result yet!</h3>
        <br />
      </div>
    </>
  );
};

export default Nodata;
