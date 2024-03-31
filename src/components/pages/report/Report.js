/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Dashboard from "../../Dashboard";
import { axiosRequest } from "../../../api";
import { DatePicker, Button } from "antd";
import ReportTable from "./ReportTable";
import SingleCashier from "./DataFor1Cashier";
import { useMediaQuery } from "@mui/material";
import dayjs from "dayjs";
import { getUser } from "../../utils/common";
import { getAllCartRequestAction } from "../../../store/cart/actions";
import { useDispatch, useSelector } from "react-redux";
import {
  calculateTotalProductCost,
  calculateTotalServiceCost,
} from "../../../utils/helper";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { FaFileExport } from "react-icons/fa";

const Report_URL = "sales/report";
const Team_URL = "team";

const Report = () => {
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const formattedDate = new Date().toISOString().slice(0, 10);
  const [search, setSearch] = useState(formattedDate);
  const [Data, setData] = useState([]);
  const [id, setId] = useState("");
  const [getSalesByUserIdData, setGetSalesByUserIdData] = useState([]);
  const [reportData, setReportData] = useState([]);
  const isTablet = useMediaQuery("(max-width: 960px)");
  const handleDropDown = () => setOpen(!open);
  const user = getUser();
  const [selectedOption, setSelectedOption] = useState(null);
  const [isActiveWeek, setIsActiveWeek] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const findRole = user[0]?.roles[0]?.permissions;
  const permissions = [];
  findRole?.map((item) => permissions.push(item.permissions));

  const handleButtonClick = () => {
    setSelectedOption(1);
    setIsActiveWeek(true);
    setSelectedMonth(null);
    setSearch("");
  };
  const handleMonthButton = () => {
    setSelectedMonth(1);
    setSelectedOption(null);
    setSearch("");
    setIsActiveWeek(false);
  };

  const getReport = async () => {
    if (user[0]?.type !== "CASHIER_C") {
      const url = `sales/user/${user[0]?._id}`;
      await axiosRequest
        .get(url)
        .then((response) => {
          const result = response.data.data;
          setGetSalesByUserIdData(result);
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else if (search) {
      await axiosRequest
        .get(`${Report_URL}?date=${search}`)
        .then((res) => {
          const response = res.data.data;
          setReportData(response);
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else if (selectedOption) {
      await axiosRequest
        .get(`${Report_URL}?weeks=${selectedOption}`)
        .then((res) => {
          const response = res.data.data;
          setReportData(response);
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else if (selectedMonth) {
      await axiosRequest
        .get(`${Report_URL}?months=${selectedMonth}`)
        .then((res) => {
          const response = res.data.data;
          setReportData(response);
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      await axiosRequest
        .get(`${Report_URL}?`)
        .then((res) => {
          const response = res.data.data;
          setReportData(response);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  const getTeamMember = () => {
    // setLoading(true);
    axiosRequest
      .get(Team_URL)
      .then((res) => {
        // setLoading(false);
        const response = res.data.data;
        const result = response.filter(
          (element) => element.type === "CASHIER_C"
        );
        setData(result);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const getAllSalesByUserId = async () => {
    const url = `sales/user/${id}`;
    await axiosRequest
      .get(url)
      .then((response) => {
        const result = response.data.data;
        setGetSalesByUserIdData(result);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    getTeamMember();
    getReport();
  }, [search, selectedOption, selectedMonth]);

  useEffect(() => {
    id && getAllSalesByUserId();
  }, [id]);

  const singleUserPtoductTotal = getSalesByUserIdData.map((item) =>
    item.productStore.reduce((acc, obj) => acc + obj?.productQnt * obj?.cost, 0)
  );
  const singleUserGeneralProductTotal = singleUserPtoductTotal.reduce(
    (acc, cur) => acc + cur,
    0
  );

  const singleUserServiceTotal = getSalesByUserIdData.map((item) =>
    item.servicesStore.reduce((acc, obj) => acc + obj?.cost, 0)
  );
  const singleUserGeneralServiceTotal = singleUserServiceTotal.reduce(
    (acc, cur) => acc + cur,
    0
  );

  const handleInputChange = (date, dateString) => {
    setSearch(dateString);
    setSelectedMonth(null);
    setSelectedOption(null);
    setIsActiveWeek(false);
  };

  useEffect(() => {
    getAllCartRequestAction("?status=paid")(dispatch);
  }, [dispatch]);

  const overAllTotal = cart?.all?.data?.reduce(
    (acc, item) => acc + item?.amoutPaid,
    0
  );

  return (
    <Dashboard>
      <div className={`content-body mt-[3rem] ${!isTablet && "ml-52"}`}>
        <div className="container-fluid">
          <div
            className={`relative form-head mb-3 flex items-center justify-between`}
          >
            {!isTablet && (
                <div className="mr-auto d-lg-block">
                  <h2 className={`text-black font-w500 mb-6`}>Report</h2>
                </div>
              )}
              {!isTablet && (
              <>
                <div
                  className="absolute right-0 btn btn-sm btn-primary light d-flex align-items-center svg-btn shadow-none"
                  data-toggle="dropdown"
                  onClick={handleDropDown}
                >
                  <div className="text-left ml-3">
                    <span className="d-block fs-16">Filter by Cashiers</span>
                  </div>
                  <i className="fa fa-angle-down scale5 ml-3"></i>
                </div>

                <div
                  className={`${
                    open ? "block" : "hidden"
                  } absolute right-0 mt-52  w-[15rem] rounded-lg shadow-lg border bg-white z-50`}
                  onClick={handleDropDown}
                >
                  <ul className="space-y-1 p-2">
                    {Data.map((item, index) => (
                      <li key={index} className="font-medium">
                        <button
                          className="flex w-full justify-start items-center text-[14px] text-gray-800 hover:text-white hover:bg-black p-2 rounded-md transition duration-150 ease-in-out"
                          onClick={(e) => setId(item._id)}
                        >
                          {item.firstname}
                        </button>
                      </li>
                    ))}
                    <li>
                      <button
                        className="flex w-full justify-start items-center text-[14px] text-gray-800 hover:text-white hover:bg-black p-2 rounded-md transition duration-150 ease-in-out"
                        onClick={(e) => setId("")}
                      >
                        All
                      </button>
                    </li>
                  </ul>
                </div>



              </>
            )}
</div>
            
            <div className="mr-auto d-lg-block">
              <div className={`${!isTablet ? "flex items-center space-x-8" : "block space-y-2"} mb-4`}>
                <DatePicker
                  onChange={handleInputChange}
                  defaultValue={dayjs()}
                  placeholder="Search by Date"
                  className="w-[30vh] py-2 px-2 rounded"
                />
                <div className="flex space-x-4">
                  <Button
                    onClick={handleButtonClick}
                    style={{
                      height: "40px",
                      backgroundColor: isActiveWeek ? "black" : "white",
                      color: isActiveWeek ? "white" : "black",
                    }}
                  >
                    Weekly
                  </Button>
                  <Button
                    onClick={handleMonthButton}
                    style={{
                      height: "40px",
                      backgroundColor: selectedMonth ? "black" : "white",
                      color: selectedMonth ? "white" : "black",
                    }}
                  >
                    Monthly
                  </Button>
                </div>
              </div>
            </div>
            
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                {/* {permissions.indexOf("export-product") !== -1 &&
                        !isTablet && (
                          <div className=" absolute right-6 items-center justify-center top-3 flex gap-2">
                            <small>Export</small>
                            <ReactHTMLTableToExcel
                              id="test-table-xls-button"
                              className="btn btn-sm btn-primary light flex items-center svg-btn shadow-none z-15"
                              table="table-to-xls"
                              filename="Barber-Product"
                              sheet="Product List"
                              buttonText={<FaFileExport />}
                            />
                          </div>
                        )} */}
                  <table className="min-w-full border text-center text-sm font-light dark:border-neutral-500">
                    <thead className="border-b font-medium dark:border-neutral-500">
                      <tr>
                        <th
                          scope="col"
                          className="border-r px-6 py-4 dark:border-neutral-500"
                        >
                          Time Status
                        </th>
                        <th
                          scope="col"
                          colspan="2"
                          className="border-r px-6 py-4 dark:border-neutral-500"
                        >
                          Barber
                        </th>
                        <th
                          colspan="4"
                          scope="col"
                          className="border-r px-6 py-4 dark:border-neutral-500"
                        >
                          Product
                        </th>
                        <th
                          colspan="2"
                          scope="col"
                          className="border-r px-6 py-4 dark:border-neutral-500"
                        >
                          Service
                        </th>
                        <th
                          colspan="3"
                          scope="col"
                          className="border-r px-6 py-4 dark:border-neutral-500"
                        >
                          Daily Entry
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b dark:border-neutral-500">
                        <th className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                          Hours
                        </th>
                        <th className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                          Names
                        </th>
                        <th className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                          Amount(Frw)
                        </th>
                        <th className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                          Item
                        </th>
                        <th className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                          Qnty
                        </th>
                        <th className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                          P/U(Frw)
                        </th>
                        <th className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                          Total(Frw)
                        </th>
                        <th className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                          Item
                        </th>
                        {/* <th className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500"> 
                          Qntye
                        </th> */}
                         {/* <th className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500"> 
                          P/U(Frw)
                        </th> */}
                        <th className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                          Total(Frw)
                        </th>
                        <th className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                          MOMO(Frw)
                        </th>
                        <th className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                          POS(Frw)
                        </th>
                        <th className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                          CASH(Frw)
                        </th>
                      </tr>
                      {id && (
                        <tr className="border-b dark:border-neutral-500">
                          <th
                            colSpan="12"
                            className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500"
                            
                          >
                            {getSalesByUserIdData[0]?.approvedBy}
                          </th>
                        </tr>
                      )}

                      {!id &&
                        cart?.all?.data?.map((entry) => {
                          return <ReportTable data={entry} />;
                        })}

                      {id &&
                        getSalesByUserIdData.map((el) => {
                          return <SingleCashier data={el} />;
                        })}

                      {id && (
                        <tr className="border-b dark:border-neutral-500">
                          <td
                            colSpan="3"
                            className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500"
                          >
                            Total
                          </td>
                          <td
                            colSpan="4"
                            className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500"
                          >
                            {singleUserGeneralProductTotal?.toLocaleString()}
                          </td>
                          <td
                            colSpan="2"
                            className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500"
                          >
                            {singleUserGeneralServiceTotal?.toLocaleString()}
                          </td>
                          <td
                            colSpan="3"
                            className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500"
                          >
                            {(
                              singleUserGeneralProductTotal +
                              singleUserGeneralServiceTotal
                            )?.toLocaleString()}
                          </td>
                        </tr>
                      )}

                      {!id && (
                        <tr className="border-b dark:border-neutral-500">
                          <td
                            colSpan="3"
                            className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500"
                          >
                            Total
                          </td>
                          <td
                            colSpan="4"
                            className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500"
                          >
                            {calculateTotalProductCost(
                              cart?.all?.data
                            )?.toLocaleString()}
                          </td>
                          <td
                            colSpan="2"
                            className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500"
                          >
                            {calculateTotalServiceCost(
                              cart?.all?.data
                            )?.toLocaleString()}
                          </td>
                          <td
                            colSpan="3"
                            className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500"
                          >
                            {overAllTotal?.toLocaleString()}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default Report;
