/* eslint-disable no-useless-concat */
import React, { useState, useEffect, useRef } from "react";
import { Fade } from "react-reveal";
import Dashboard from "../../Dashboard";
import ClientDetails from "./invoicePreview/InvoiceDetailsBody";
import Footer from "./invoicePreview/Footer";
import Header from "./invoicePreview/Header";
import Table from "./invoicePreview/Table";
import ReactToPrint from "react-to-print";
import "./index.css";
import { getUser } from "../../utils/common";
import ReactHtmlTableToExcel from "react-html-table-to-excel";
import { FaFileExport } from "react-icons/fa";
import ReactPaginate from "react-paginate";

import { useMediaQuery } from "@mui/material";
import { getAllCartRequestAction } from "../../../store/cart/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const SalesHistory = () => {
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentpage] = useState(1);
  const [postsPerPage] = useState(10);
  const isTablet = useMediaQuery("(max-width: 960px)");
  const navigate = useNavigate();
  const user = getUser();
  const findRole = user[0]?.roles[0]?.permissions;
  const permissions = [];
  findRole?.map((item) => permissions.push(item.permissions));
  useEffect(() => {
    getAllCartRequestAction("?status=paid")(dispatch);
  }, [dispatch]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = cart?.all?.data.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = ({ selected }) => {
    setCurrentpage(selected + 1);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    const lowercaseValue = value.toLowerCase();
    setSearch(lowercaseValue);
  };

  return (
    <Dashboard>
      <div className={`content-body mt-[4rem] ${!isTablet && "ml-52"}`}>
        <div className="container-fluid">
          <div
            className={`relative form-head ${
              !isTablet && "mb-3"
            } flex items-center justify-between`}
          >
            <div
              className={`mr-auto d-lg-block ${isTablet ? "w-full" : "w-2/5"}`}
            >
              <h2
                className={`text-black font-w500 mb-6 ${
                  isTablet && "text-lg pl"
                }`}
              >
                Sales History
              </h2>
            </div>
            <div className="col-md-6 flex justify-end mb-4">
              <input
                type="text"
                name="name"
                value={search}
                onChange={handleInputChange}
                className="form-input w-full  py-2 px-4 rounded-md border border-solid border-[#d1d1d1] focus:border-[#e3b04b] focus:ring focus:ring-[#e3b04b]"
                placeholder="Search by Client, Barber or date"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="card">
                {permissions?.indexOf("export-sales-history") !== -1 &&
                  !isTablet && (
                    <div className=" absolute right-6 items-center justify-center top-3 flex gap-2">
                      <small>Export</small>
                      <ReactHtmlTableToExcel
                        id="test-table-xls-button"
                        className="btn btn-sm btn-primary light flex items-center svg-btn shadow-none z-15"
                        table="table-to-xls"
                        filename="Barber-Client"
                        sheet="Sales history"
                        buttonText={<FaFileExport />}
                      />
                    </div>
                  )}
                <div className="card-body">
                  <div className="table-responsive">
                    <table id="table-to-xls" className="display w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="py-6">Date</th>
                          <th className="py-6">Barber</th>
                          <th className="py-6">Client</th>
                          {!isTablet && <th className="py-6">Status</th>}
                          <th className="py-6">Total</th>
                          {permissions.indexOf("view-sales-history") !== -1 && (
                            <th className="py-6">Action</th>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {currentPosts
                          ?.filter((item) => {
                            return search?.toLowerCase() === ""
                              ? item
                              : item?.client?.firstname
                                  ?.toLowerCase()
                                  ?.includes(search) ||
                                  item?.user?.firstname
                                    ?.toLowerCase()
                                    ?.includes(search) ||
                                  item.createdAt
                                    ?.split("T")[0]
                                    ?.toLowerCase()
                                    ?.includes(search);
                          })
                          ?.map((item, index) => (
                            <tr key={index} className="border-b">
                              <td className="py-3">
                                {item.updatedAt?.slice(0, 10)}
                              </td>
                              <td className="py-3 capitalize">
                                {item.user && item?.user?.firstname}
                              </td>
                              <td className="py-3 capitalize">
                                {item.client && item?.client?.firstname}
                              </td>
                              {!isTablet && (
                                <td className="py-3">
                                  <span className="badge light badge-success capitalize">
                                    {item.status}
                                  </span>
                                </td>
                              )}
                              <td className="py-3">{`${item?.amoutPaid?.toLocaleString()} RWF`}</td>
                              <td className="py-3">
                                <Link
                                  to={`/sales/history/details/${item?._id}`}
                                >
                                  {permissions.indexOf("view-sales-history") !==
                                    -1 && (
                                    <button className="bg-gray-900 hover:bg-[#cf7500] rounded shadow btn-xs sharp mr-1 bell bell-link">
                                      <i className="fa fa-eye text-white"></i>
                                    </button>
                                  )}
                                </Link>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <ReactPaginate
                  onPageChange={paginate}
                  pageCount={Math.ceil(cart?.all?.data?.length / postsPerPage)}
                  previousLabel={"Prev"}
                  nextLabel={"Next"}
                  containerClassName={"pagination"}
                  pageLinkClassName={"page-number"}
                  previousLinkClassName={"page-number"}
                  nextLinkClassName={"page-number"}
                  activeLinkClassName={"active"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default SalesHistory;
