import React, { useRef } from 'react';
import ReactToPrint, { useReactToPrint } from "react-to-print";

export default function Footer() {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <>
      <footer className="footer border-t-2 border-gray-300 py-3 mt-5 flex flex-col bg-white space-y-6">
        <div className="flex items-end justify-end">
          <ReactToPrint
            trigger={() => (
              <button className="bg-warning hover:bg-primaryHover hover:text-white btn btn-success btn-s shadow-none">
                Print Invoice
              </button>
            )}
          />
        </div>
        {/* <div className="flex items-center justify-center mx-auto">
          {" "}
          <ul className="flex flex-wrap ">
            <li>
              <span className="font-bold text-gray-900">@barber reserve</span>
            </li>
          </ul>
        </div> */}
      </footer>
    </>
  );
}
