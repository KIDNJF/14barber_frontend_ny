import React from "react";

const Skeleton = () => {
  return (
    <div role="status" className="animate-pulse space-y-2.5 mt-20 ml-10">
      <div className="flex items-center space-x-14 mb-10">
        <div className="h-3 w-12 rounded-full bg-gray-700"></div>
        <div className="h-3 w-32 rounded-full bg-gray-700"></div>
        <div className="h-3 w-24 rounded-full bg-gray-600"></div>
        <div className="h-3 w-24 rounded-full bg-gray-600"></div>
        <div className="h-3 w-24 rounded-full bg-gray-600"></div>
        <div className="h-3 w-24 rounded-full bg-gray-600"></div>
        <div className="h-3 w-24 rounded-full bg-gray-600"></div>
      </div>
      <div className="flex items-center space-x-14">
        <div className="h-2 w-12 rounded-full bg-gray-600"></div>
        <div className="h-2 w-32 rounded-full bg-gray-600"></div>
        <div className="h-2 w-32 rounded-full bg-gray-600"></div>
        <div className="h-2 w-32 rounded-full bg-gray-600"></div>
        <div className="h-2 w-32 rounded-full bg-gray-600"></div>
        <div className="h-5 w-6 rounded-full bg-gray-600"></div>
        <div className="h-5 w-6 rounded-full bg-gray-600"></div>
      </div>
      <div className="flex items-center space-x-14">
        <div className="h-2 w-12 rounded-full bg-gray-600"></div>
        <div className="h-2 w-32 rounded-full bg-gray-600"></div>
        <div className="h-2 w-32 rounded-full bg-gray-600"></div>
        <div className="h-2 w-32 rounded-full bg-gray-600"></div>
        <div className="h-2 w-32 rounded-full bg-gray-600"></div>
        <div className="h-5 w-6 rounded-full bg-gray-600"></div>
        <div className="h-5 w-6 rounded-full bg-gray-600"></div>
      </div>
      <div className="flex items-center space-x-14">
        <div className="h-2 w-12 rounded-full bg-gray-600"></div>
        <div className="h-2 w-32 rounded-full bg-gray-600"></div>
        <div className="h-2 w-32 rounded-full bg-gray-600"></div>
        <div className="h-2 w-32 rounded-full bg-gray-600"></div>
        <div className="h-2 w-32 rounded-full bg-gray-600"></div>
        <div className="h-5 w-6 rounded-full bg-gray-600"></div>
        <div className="h-5 w-6 rounded-full bg-gray-600"></div>
      </div>
      <div className="flex items-center space-x-14">
        <div className="h-2 w-12 rounded-full bg-gray-600"></div>
        <div className="h-2 w-32 rounded-full bg-gray-600"></div>
        <div className="h-2 w-32 rounded-full bg-gray-600"></div>
        <div className="h-2 w-32 rounded-full bg-gray-600"></div>
        <div className="h-2 w-32 rounded-full bg-gray-600"></div>
        <div className="h-5 w-6 rounded-full bg-gray-600"></div>
        <div className="h-5 w-6 rounded-full bg-gray-600"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Skeleton;
