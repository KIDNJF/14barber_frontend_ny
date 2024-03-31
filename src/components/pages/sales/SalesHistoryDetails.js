import React, { useEffect } from "react";
import { Fade } from "react-reveal";
import ReactToPrint from "react-to-print";
import Header from "./invoicePreview/Header";
import ClientDetails from "./invoicePreview/InvoiceDetailsBody";
import Table from "./invoicePreview/Table";
import Footer from "./invoicePreview/Footer";
import { useMediaQuery } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { getOneCartRequestActions } from "../../../store/cart/actions";
import { useDispatch, useSelector } from "react-redux";
import Dashboard from "../../Dashboard";

const SalesHistoryDetails = () => {
  const { cart } = useSelector((state) => state);
  const isTablet = useMediaQuery("(max-width: 960px)");
  const navogate = useNavigate();
  const { histId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    getOneCartRequestActions(histId)(dispatch);
  }, [dispatch, histId]);

  console.log("selllll", cart?.selected?.data);
  return (
    <Dashboard>
      <Fade right>
        <div className="h-screen w-ful bg-opacity-30 backdrop-blur-sm lg:mt-0 fixed flex items-center justify-center z-10">
          <div className="bg-gray-50 w-screen shadow-2xl rounded-lg p-4 pb-8 h-screen mt-10 flex items-center justify-center mx-auto">
            {/* <div className="flex justify-end pr-10 -mt-6">
              <button
                type="button"
                className=""
                data-dismiss="modal"
                onClick={navogate(-1)}
              >
                <span>&times;</span>
              </button>
            </div> */}
            <div className="row">
              {/* <div
                className={`col-md-4 active show overflow-y-auto ${
                  isTablet ? "h-[10vh]" : "h-[75vh]"
                } flex items-center justify-center`}
              >
                <div className="text-center mb-3">
                  <ReactToPrint
                    trigger={() => (
                      <button className="bg-warning hover:bg-primaryHover hover:text-white btn btn-success btn-s mr-3 shadow-none">
                        Print Invoice
                      </button>
                    )}
                  />
                </div>
              </div> */}
              <div className="col-md-12 ">
                <div className="tab-content ">
                  <div
                    className={`tab-pane fade active show overflow-y-auto ${
                      isTablet ? "h-[80vh]" : "h-[89vh]"
                    } scrollbar-hide`}
                  >
                    <main
                      className={`${
                        !isTablet && "px-5"
                      } xl:grid grid-cols-1 gap-10`}
                    >
                      <div
                        className={`bg-white ${!isTablet && "px-5"} rounded`}
                      >
                        <div className={`${!isTablet && "px-5"}`}>
                          <Header />
                          <ClientDetails />
                          <Table />
                          <Footer />
                        </div>
                      </div>
                    </main>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </Dashboard>
  );
};

export default SalesHistoryDetails;
