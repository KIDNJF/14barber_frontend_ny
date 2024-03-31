import React from "react";
import { NavLink } from "react-router-dom";
// import Navbar from "./Navbar";

const NotFound = () => {
  return (
    <div
      className="flex items-center justify-center w-full lg:h-[100vh] h-[92vh] bg-gradient-to-r from-indigo-100 to-blue-300
    "
    >
      <div className="lg:px-40 py-20 bg-white my-6 rounded-md shadow-xl">
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-primary text-9xl">404</h1>

          <h6 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
            <span className="text-red">Oops!</span> Page not found
          </h6>

          <p className="mb-8 text-center text-gray-500 md:text-lg px-4 md:px-0">
            The page you’re looking for doesn’t exist.
          </p>

          <NavLink
            to={"/"}
            className="px-6 py-2 text-sm font-bold text-gray-900 bg-transparent border-2"
          >
            Go Back
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
