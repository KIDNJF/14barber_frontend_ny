/* eslint-disable no-useless-concat */
import React, { useEffect, useState } from "react";
import Dashboard from "../../Dashboard";
import "../sales/index.css";
import Fade from "react-reveal/Fade";
import { axiosRequest, refreshPage } from "../../../api/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Skeleton from "../../Skeleton";
import LoadingButton from "../../LoadingButton";
import { getUser } from "../../utils/common";
import ReactPaginate from "react-paginate";
import { Button, DatePicker } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import { useMediaQuery } from "@mui/material";

const Expance_URL = "expance";

const Expances = () => {
  const [createNewDataModel, setCreateNewDataModel] = useState(false);
  const [deleteDataModel, setDeleteDataModel] = useState(false);
  const [updateDataModel, setUpdateDataModel] = useState(false);

  const formattedDate = new Date().toISOString().slice(0, 10);
  const [search, setSearch] = useState(formattedDate);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isActiveWeek, setIsActiveWeek] = useState(false);
  const [isActiveMonth, setIsActiveMonth] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);

  const [RowData, SetRowData] = useState([]);
  const [Data, setData] = useState([]);
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentpage] = useState(1);
  const [postsPerPage] = useState(10);
  const isTablet = useMediaQuery("(max-width: 960px)");

  const user = getUser();
  const findRole = user[0]?.roles[0]?.permissions;
  const permissions = [];
  findRole?.map((item) => permissions.push(item.permissions));

  const [formData, setFormData] = useState({
    name: "",
    cost: "",
    reason: "",
  });

  const handleInputChange = (date, dateString) => {
    setSearch(dateString);
    setSelectedMonth(null);
    setSelectedOption(null);
    setIsActiveWeek(false);
    setIsActiveMonth(false);
  };

  const handleButtonClick = () => {
    setSelectedOption(1);
    setIsActiveWeek(true);
    setIsActiveMonth(false);
    setSelectedMonth(null);
    setSearch("");
  };
  const handleMonthButton = () => {
    setSelectedMonth(1);
    setSelectedOption(null);
    setSearch("");
    setIsActiveWeek(false);
    setIsActiveMonth(true);
  };
  const removeModel = () => {
    let newState = !createNewDataModel;
    setCreateNewDataModel(newState);
  };

  const deleteModel = () => {
    let newState = !deleteDataModel;
    setDeleteDataModel(newState);
  };

  const updateModel = () => {
    let newState = !updateDataModel;
    setUpdateDataModel(newState);
  };

  const getExpances = () => {
    if (search) {
      setLoading(true);
      axiosRequest
        .get(`${Expance_URL}?date=${search}`)
        .then((response) => {
          setLoading(false);
          const result = response.data.data;
          setData(result);
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else if (selectedOption) {
      setLoading(true);
      axiosRequest
        .get(`${Expance_URL}?week=${selectedOption}`)
        .then((response) => {
          setLoading(false);
          const result = response.data.data;
          setData(result);
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else if (selectedMonth) {
      setLoading(true);
      axiosRequest
        .get(`${Expance_URL}?month=${selectedMonth}`)
        .then((response) => {
          setLoading(false);
          const result = response.data.data;
          setData(result);
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      setLoading(true);
      axiosRequest
        .get(Expance_URL)
        .then((response) => {
          setLoading(false);
          const result = response.data.data;
          setData(result);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const url = "expance";
    setLoading(true);
    await axiosRequest
      .post(url, { ...formData, createdBy: user[0]?._id })
      .then((res) => {
        setFormData({});
        setLoading(false);
        const result = res.data;
        const { message } = result;
        toast.success(message);
        setCreateNewDataModel(false);
        setTimeout(() => {
          refreshPage();
          getExpances();
        }, 1000);
      })
      .catch((error) => {
        toast.info(error.message);
        setTimeout(() => {
          setLoading(false);
          refreshPage();
        }, 2000);
      });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const url = `expance/${id}`;
    setLoading(true);
    axiosRequest
      .put(url, { isDeleted: "true" })
      .then((response) => {
        setLoading(false);
        getExpances();
        setDeleteDataModel(false);
        toast.success("Deleted succefully");
      })
      .catch((error) => {
        toast.info(error.message);
        setTimeout(() => {
          setLoading(false);
          refreshPage();
        }, 2000);
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const url = `expance/${id}`;
    setLoading(true);
    axiosRequest
      .put(url, formData)
      .then((response) => {
        setFormData({});
        setLoading(false);
        const result = response.data;
        const { message } = result;
        toast.success(message);
        setUpdateDataModel(false);
        setTimeout(() => {
          refreshPage();
          getExpances();
        }, 1000);
      })
      .catch((error) => {
        toast.info(error.message);
        setTimeout(() => {
          setLoading(false);
          refreshPage();
        }, 2000);
      });
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = Data.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = ({ selected }) => {
    setCurrentpage(selected + 1);
  };

  useEffect(() => {
    getExpances();
  }, [search, selectedOption, selectedMonth]);

  const disabledDate = (current) => {
    if (current && current > moment().endOf("day")) {
      return true;
    }
    return false;
  };

  return (
    <>
      <ToastContainer />
      <Dashboard>
        {/* ===============Start:: NewSModel ================ */}
        <Fade top>
          <div
            className={`h-screen w-full bg-opacity-30 backdrop-blur-sm lg:mt-0 fixed flex items-center justify-center z-50 ${
              createNewDataModel === true ? "block" : "hidden"
            }`}
          >
            <div className="bg-white w-screen shadow-2xl rounded-lg p-4 pb-8 -ml-8">
              <div className="w-full ">
                <div className="modal-content">
                  {!isTablet && (
                    <div className="modal-header justify-content-center">
                      <h2 className="modal-title text-black font-w600">
                        Add Expenses
                      </h2>
                    </div>
                  )}
                  <form onSubmit={handlerSubmit}>
                    <div className="modal-body">
                      <div className="row justify-center items-center active show overflow-y-auto h-[65vh] scrollbar-hide">
                        <div className="col-lg-6">
                          <div className="basic-form">
                            <div className="custom-card">
                              <div className="card-body">
                                <div className="form-row">
                                  <div className="form-group col-md-8">
                                    <label className="text-black font-w600">
                                      Name
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder=""
                                      defaultValue={formData.name}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          name: e.target.value,
                                        })
                                      }
                                      required
                                    />
                                  </div>
                                  <div className="form-group col-md-4">
                                    <label className="text-black font-w600">
                                      Cost/Amount
                                    </label>
                                    <input
                                      type="number"
                                      className="form-control"
                                      placeholder=""
                                      defaultValue={formData.cost}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          cost: e.target.value,
                                        })
                                      }
                                      required
                                    />
                                  </div>
                                  <div className="form-group col-md-12">
                                    <label className="text-black font-w600">
                                      Reason
                                    </label>
                                    <textarea
                                      className="form-control"
                                      rows="4"
                                      name="service_Description"
                                      id="comment"
                                      placeholder="Descriptions"
                                      value={formData.reason}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          reason: e.target.value,
                                        })
                                      }
                                    ></textarea>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <div>
                        <button
                          type="button"
                          className="bg-[#e3b04b] light mr-3 p-2.5 text-white font-semibold rounded"
                          data-dismiss="modal"
                          onClick={(e) => removeModel(e.preventDefault())}
                        >
                          Close
                        </button>
                        {loading ? (
                          <LoadingButton />
                        ) : (
                          <button
                            type="submit"
                            className="bg-[#1b1a17] hover:bg-[#e3b04b] p-2.5 text-white font-semibold rounded"
                          >
                            Add Expenses
                          </button>
                        )}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Fade>
        {/* ===============End:: NewModel ================ */}

        {/* ===============Start:: UpdateModel ================ */}
        <Fade right>
          <div
            className={`h-screen w-full bg-opacity-30 backdrop-blur-sm lg:mt-0 fixed flex items-center justify-center z-50 ${
              updateDataModel === true ? "block" : "hidden"
            }`}
          >
            <div className="bg-white w-screen shadow-2xl rounded-lg p-4 pb-8 -ml-8">
              <div className="w-full ">
                <div className="modal-content">
                  {!isTablet && (
                    <div className="modal-header justify-content-center">
                      <h2 className="modal-title text-black font-w600">
                        Update Information
                      </h2>
                    </div>
                  )}
                  <div className="modal-body">
                    <div className="row justify-center items-center active show overflow-y-auto h-[65vh] scrollbar-hide">
                      <div className="col-lg-6">
                        <div className="basic-form">
                          <form>
                            <div className="custom-card">
                              <div className="card-body">
                                <div className="form-row">
                                  <div className="form-group col-md-8">
                                    <label className="text-black font-w600">
                                      Name
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder=""
                                      defaultValue={formData.name}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          name: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="form-group col-md-4">
                                    <label className="text-black font-w600">
                                      Cost/Amount
                                    </label>
                                    <input
                                      type="number"
                                      className="form-control"
                                      placeholder=""
                                      defaultValue={formData.cost}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          cost: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="form-group col-md-12">
                                    <label className="text-black font-w600">
                                      Reason
                                    </label>
                                    <textarea
                                      className="form-control"
                                      rows="4"
                                      name="service_Description"
                                      id="comment"
                                      placeholder="Descriptions"
                                      value={formData.reason}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          reason: e.target.value,
                                        })
                                      }
                                    ></textarea>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <div>
                      <button
                        type="button"
                        className="bg-[#e3b04b] light mr-3 p-2.5 text-white font-semibold rounded"
                        data-dismiss="modal"
                        onClick={(e) => updateModel(e.preventDefault())}
                      >
                        Close
                      </button>
                      {loading ? (
                        <LoadingButton />
                      ) : (
                        <button
                          type="button"
                          className="bg-[#1b1a17] hover:bg-[#e3b04b] p-2.5 text-white font-semibold rounded"
                          onClick={handleUpdate}
                        >
                          Save changes
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fade>
        {/* ===============End:: UpdateModel ================ */}

        {/* ====================== Start::  deleteDataModel =============================== */}
        <Fade right>
          <div
            className={`min-h-full w-screen z-50 bg-opacity-30 backdrop-blur-sm fixed flex items-center justify-center px-4 -ml-6 ${
              deleteDataModel === true ? "block" : "hidden"
            }`}
          >
            <div
              className={`bg-white ${
                isTablet ? "w-full" : "w-1/2"
              } shadow-2xl rounded-lg p-4 pb-8`}
            >
              <div className="card-title w-full flex  flex-wrap justify-center items-center  ">
                <h1 className="font-bold text-sm text-center w-11/12">
                  Remove Expenses
                </h1>
                <hr className=" bg-primary border-b w-full" />
              </div>
              <div className="card-body">
                <form className=" px-8">
                  <div>
                    <h2 className="text-base m-4">
                      Do you really want permanently Remove This Expances{" "}
                      <span className="italic text-black">
                        {RowData?.servicename}
                      </span>
                    </h2>
                  </div>
                  <div className="w-full flex justify-between">
                    <button
                      className="btn btn-[#e3b04b] light shadow-none"
                      onClick={(e) => deleteModel(e.preventDefault())}
                    >
                      Cancel
                    </button>
                    {loading ? (
                      <LoadingButton />
                    ) : (
                      <button
                        className="btn btn-outline-[#e3b04b] btn-s shadow-none"
                        onClick={handleDelete}
                      >
                        remove
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Fade>
        {/* =========================== End::  deleteDataModel =============================== */}

        <div className={`content-body mt-[3rem] ${!isTablet && "ml-52"}`}>
          <div className="container-fluid">
            <div
              className={`relative form-head mb-3 flex items-center justify-between`}
            >
              {!isTablet && (
                <div className="mr-auto d-lg-block">
                  <h3 className={`text-black font-w500 mb-6`}>Expenses</h3>
                </div>
              )}
              <div className="dropdown custom-dropdown">
                {permissions.indexOf("add-service") !== -1 && (
                  <div
                    className="btn btn-sm btn-primary light d-flex align-items-center svg-btn shadow-none"
                    onClick={removeModel}
                  >
                    <i className="bi bi-plus-lg"></i>
                    <div className="text-left ml-3">
                      <span className="d-block fs-16">Add Expenses</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="row">
              <div className="mr-auto d-lg-block">
              <div className={`${!isTablet ? "flex items-center space-x-8" : "block space-y-2"} ml-3 mb-4`}>
                <DatePicker
                  onChange={handleInputChange}
                  placeholder="Search by Date"
                  className="w-[30vh] py-2 px-2 rounded"
                  defaultValue={dayjs()}
                  disabledDate={disabledDate}
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
                      backgroundColor: isActiveMonth ? "black" : "white",
                      color: isActiveMonth ? "white" : "black",
                    }}
                  >
                    Monthly
                  </Button>
                </div>
              </div>
             </div>
              <div className="col-12">
                {loading && <Skeleton />}
                {!loading && (
                  <div className="table-responsive">
                    <div className="card">
                      <div className="card-body">
                        <div className="table-responsive">
                          <table id="table-to-xls" className="display w-full">
                            <thead>
                              <tr className="border-b">
                                <th className="py-6 pr-2">Date</th>
                                <th className="py-6">Name</th>
                                {!isTablet && <th className="py-6">reason</th>}
                                <th className="py-6">Cost</th>
                                {!isTablet && <th className="py-6">Done By</th>}
                                <th className="py-6">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {currentPosts.map((item, index) => (
                                <tr key={index} className="border-b">
                                  <td className="py-3 mr-3">
                                    {item?.createdAt?.slice(0, 10)}
                                  </td>
                                  <td className="py-3">{item.name}</td>
                                  {!isTablet && (
                                    <td className="py-3">{item.reason}</td>
                                  )}
                                  <td className="py-3">{item.cost}</td>
                                  {!isTablet && (
                                    <td className="py-3">
                                      {item.createdBy?.firstname +
                                        item.createdBy?.lastname}
                                    </td>
                                  )}
                                  <td className="py-3">
                                    {" "}
                                    {permissions.indexOf("edit-service") !==
                                      -1 && (
                                      <button
                                        className="bg-gray-900 hover:bg-[#e3b04b] rounded shadow btn-xs sharp mr-1 bell bell-link"
                                        data-toggle="modal"
                                        data-target="#new-supplier-modal"
                                        onClick={() =>
                                          updateModel(
                                            setFormData(item),
                                            setId(item._id)
                                          )
                                        }
                                      >
                                        <i className="fa fa-pencil text-white"></i>
                                      </button>
                                    )}
                                    {permissions.indexOf("delete-service") !==
                                      -1 && (
                                      <button
                                        className="btn btn-[#e3b04b] shadow-none btn-xs sharp"
                                        onClick={() => {
                                          deleteModel(
                                            SetRowData(item),
                                            setId(item._id)
                                          );
                                        }}
                                      >
                                        <i className="fa fa-trash-o"></i>
                                      </button>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <ReactPaginate
                        onPageChange={paginate}
                        pageCount={Math.ceil(Data.length / postsPerPage)}
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
                )}
              </div>
            </div>
          </div>
        </div>
      </Dashboard>
    </>
  );
};

export default Expances;
