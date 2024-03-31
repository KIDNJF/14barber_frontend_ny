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
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { FaFileExport } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { useMediaQuery } from "@mui/material";

const Service_URL = "service";
const Category_URL = "serviceCategory";

const Service = () => {
  const [createNewDataModel, setCreateNewDataModel] = useState(false);
  const [deleteDataModel, setDeleteDataModel] = useState(false);
  const [addNewCategoryModel, setAddNewCategoryModel] = useState(false);
  const [updateDataModel, setUpdateDataModel] = useState(false);
  const [RowData, SetRowData] = useState([]);
  const [Data, setData] = useState([]);
  const [id, setId] = useState("");
  const [Category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentpage] = useState(1);
  const [postsPerPage] = useState(10);
  const isTablet = useMediaQuery("(max-width: 960px)");

  const [open, setOpen] = useState(false);
  const handleDropDown = () => setOpen(!open);

  const user = getUser();
  const findRole = user[0]?.roles[0]?.permissions;
  const permissions = [];
  findRole?.map((item) => permissions.push(item.permissions));

  const [formData, setFormData] = useState({
    servicename: "",
    category_id: "",
    service_description: "",
    aftercare_description: "",
    service_gender: "",
    name: "",
    duration: "",
    amount: "",
    booking_status: "",
    commission_status: true,
    status: "",
  });

  const [catFormData, setCatFormData] = useState({
    categoryname: "",
    category_Description: "",
  });

  const removeModel = () => {
    let newState = !createNewDataModel;
    setCreateNewDataModel(newState);
  };

  const categoryModel = () => {
    let newState = !addNewCategoryModel;
    setAddNewCategoryModel(newState);
  };

  const deleteModel = () => {
    let newState = !deleteDataModel;
    setDeleteDataModel(newState);
  };

  const updateModel = () => {
    let newState = !updateDataModel;
    setUpdateDataModel(newState);
  };

  const getServices = () => {
    setLoading(true);
    axiosRequest
      .get(Service_URL)
      .then((response) => {
        setLoading(false);
        const result = response.data.data;
        setData(result);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const getServiceCategories = () => {
    axiosRequest
      .get(Category_URL)
      .then((response) => {
        const result = response.data.data;
        setCategory(result);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const url = "service";
    setLoading(true);
    await axiosRequest
      .post(url, formData)
      .then((res) => {
        setFormData({
          servicename: "",
          category_id: "",
          service_description: "",
          aftercare_description: "",
          service_gender: "",
          name: "",
          duration: "",
          amount: "",
          booking_status: "",
          commission_status: "",
          status: "",
        });
        setLoading(false);
        const result = res.data;
        const { message } = result;
        toast.success(message);
        setCreateNewDataModel(false);
        setTimeout(() => {
          refreshPage();
          getServices();
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

  const handlerCatSubmit = async (e) => {
    e.preventDefault();
    const url = "serviceCategory";
    setLoading(true);
    await axiosRequest
      .post(url, catFormData)
      .then((res) => {
        setCatFormData({
          categoryname: "",
          category_Description: "",
        });
        setLoading(false);
        const result = res.data;
        const { message } = result;
        getServices();
        getServiceCategories();
        setAddNewCategoryModel(false);
        toast.success(message);
      })
      .catch((error) => {
        if (error.code === "ERR_BAD_REQUEST") {
          toast.error(error.response.data.message);
        } else {
          toast.info(error.message);
          setTimeout(() => {
            setLoading(false);
            refreshPage();
          }, 2000);
        }
      });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const url = `service/${id}`;
    setLoading(true);
    axiosRequest
      .put(url, { isDeleted: "true" })
      .then((response) => {
        setLoading(false);
        getServices();
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
    const url = `service/${id}`;
    setLoading(true);
    axiosRequest
      .put(url, formData)
      .then((response) => {
        setFormData({
          servicename: "",
          category_id: "",
          service_description: "",
          aftercare_description: "",
          service_gender: "",
          name: "",
          duration: "",
          amount: "",
          booking_status: "",
          commission_status: "",
          status: "",
        });
        setLoading(false);
        const result = response.data;
        const { message } = result;
        getServices();
        toast.success(message);
        setUpdateDataModel(false);
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
    getServices();
    getServiceCategories();
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    const lowercaseValue = value.toLowerCase();
    setSearch(lowercaseValue);
  };

  // console.log("Data", Data);

  return (
    <>
      <ToastContainer />
      <Dashboard>
        {/* ===============Start:: NewCategoryModel ================ */}
        <Fade top>
          <div
            className={`h-screen w-full bg-opacity-30 backdrop-blur-sm lg:mt-0 fixed flex items-center justify-center z-50 ${
              addNewCategoryModel === true ? "block" : "hidden"
            }`}
          >
            <div className="bg-white w-screen shadow-2xl rounded-lg p-4 pb-8">
              <div className="w-full ">
                <div className="modal-content">
                  {!isTablet && (
                    <div className="modal-header justify-content-center">
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        onClick={(e) => categoryModel(e.preventDefault())}
                      >
                        <span>&times;</span>
                      </button>
                      <h2 className="modal-title text-black font-w600">
                        Add new Category
                      </h2>
                    </div>
                  )}
                  <div className="modal-body">
                    <div className="row justify-center items-center active show overflow-y-auto h-[65vh]">
                      <div className="col-lg-6">
                        <div className="basic-form">
                          <form>
                            <div className="custom-card">
                              <div className="card-body">
                                <div className="form-row">
                                  <div className="form-group col-md-12">
                                    <label className="text-black font-w600">
                                      Category Name
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={catFormData.categoryname}
                                      onChange={(e) =>
                                        setCatFormData({
                                          ...catFormData,
                                          categoryname: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="form-group col-md-12">
                                    <label className="text-black font-w600">
                                      Description
                                    </label>
                                    <textarea
                                      className="form-control"
                                      rows="4"
                                      name="category_Description"
                                      id="comment"
                                      placeholder="Descriptions"
                                      value={catFormData.category_Description}
                                      onChange={(e) =>
                                        setCatFormData({
                                          ...catFormData,
                                          category_Description: e.target.value,
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
                        onClick={(e) => categoryModel(e.preventDefault())}
                      >
                        Close
                      </button>
                      {loading ? (
                        <LoadingButton />
                      ) : (
                        <button
                          type="button"
                          className="bg-[#1b1a17] hover:bg-[#cf7500] p-2.5 text-white font-semibold rounded"
                          onClick={handlerCatSubmit}
                        >
                          Save
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fade>
        {/* ===============End:: NewCategoryModel ================ */}

        {/* ===============Start:: NewServiceModel ================ */}
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
                        Add new Service
                      </h2>
                    </div>
                  )}
                  <form onSubmit={handlerSubmit}>
                    <div className="modal-body">
                      <div className="row justify-center items-center active show overflow-y-auto h-[65vh] scrollbar-hide">
                        <div className="col-lg-6">
                          <div className="basic-form">
                            <div className="custom-card">
                              <div className="card-header">
                                <h4 className="card-title">
                                  Service Basic Info
                                </h4>
                              </div>
                              <div className="card-body">
                                <div className="form-row">
                                  <div className="form-group col-md-12">
                                    <label className="text-black font-w600">
                                      Service Name
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder=""
                                      defaultValue={formData.servicename}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          servicename: e.target.value,
                                        })
                                      }
                                      required
                                    />
                                  </div>
                                  <div className="form-group col-md-12">
                                    <label className="text-black font-w600">
                                      Description
                                    </label>
                                    <textarea
                                      className="form-control"
                                      rows="4"
                                      name="service_Description"
                                      id="comment"
                                      placeholder="Descriptions"
                                      value={formData.service_description}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          service_description: e.target.value,
                                        })
                                      }
                                    ></textarea>
                                  </div>
                                  <div className="form-group col-md-6">
                                    <label className="text-black font-w600">
                                      Category
                                    </label>
                                    <select
                                      id="inputState"
                                      className="form-control"
                                      defaultValue={formData.category_id}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          category_id: e.target.value,
                                        })
                                      }
                                      required
                                    >
                                      <option value="">Choose...</option>
                                      {Category.map((category) => (
                                        <option
                                          key={category._id}
                                          value={category._id}
                                        >
                                          {category.categoryname}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="custom-card">
                              <div className="card-header">
                                <h4 className="card-title">Pricing Info</h4>
                              </div>
                              <div className="card-body">
                                <div className="form-row">
                                  <div className="form-group col-md-6">
                                    <label className="text-black font-w600">
                                      Service price
                                    </label>
                                    <input
                                      type="number"
                                      className="form-control"
                                      defaultValue={formData.amount}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          amount: e.target.value,
                                        })
                                      }
                                      required
                                    />
                                  </div>

                                  <div className="form-group col-md-6">
                                    <label className="text-black font-w600">
                                      Duration
                                    </label>

                                    <select
                                      id="inputState"
                                      className="form-control"
                                      defaultValue={formData.duration}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          duration: e.target.value,
                                        })
                                      }
                                      required
                                    >
                                      <option value="">Choose...</option>
                                      <option value="5">5 mins</option>
                                      <option value="10">10 mins</option>
                                      <option value="20">20 mins</option>
                                      <option value="25">25 mins</option>
                                      <option value="30">30 mins</option>
                                      <option value="40">40 mins</option>
                                      <option value="50">50 mins</option>
                                      <option value="60">1h</option>
                                      <option value="90">1h:30</option>
                                      <option value="120">2h</option>
                                    </select>
                                  </div>
                                  <div className="form-group col-md-12">
                                    <div className="form-check">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        values={formData.commission_status}
                                        checked={formData.commission_status}
                                        onChange={(e) =>
                                          setFormData({
                                            ...formData,
                                            commission_status:
                                              !formData.commission_status,
                                          })
                                        }
                                      />
                                      <label className="form-check-label">
                                        Enable Service commission
                                      </label>
                                    </div>
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
                            className="bg-[#1b1a17] hover:bg-[#cf7500] p-2.5 text-white font-semibold rounded"
                          >
                            Add Service
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
        {/* ===============End:: NewServiceModel ================ */}

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
                        Update Services
                      </h2>
                    </div>
                  )}
                  <div className="modal-body">
                    <div className="row justify-center items-center active show overflow-y-auto h-[65vh] scrollbar-hide">
                      <div className="col-lg-6">
                        <div className="basic-form">
                          <form>
                            <div className="custom-card">
                              <div className="card-header">
                                <h4 className="card-title">
                                  Service Basic Info
                                </h4>
                              </div>
                              <div className="card-body">
                                <div className="form-row">
                                  <div className="form-group col-md-12">
                                    <label className="text-black font-w600">
                                      Service Name
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder=""
                                      defaultValue={formData.servicename}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          servicename: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="form-group col-md-12">
                                    <label className="text-black font-w600">
                                      Description
                                    </label>
                                    <textarea
                                      className="form-control"
                                      rows="4"
                                      name="service_Description"
                                      id="comment"
                                      placeholder="Descriptions"
                                      value={formData.service_description}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          service_description: e.target.value,
                                        })
                                      }
                                    ></textarea>
                                  </div>
                                  <div className="form-group col-md-6">
                                    <label className="text-black font-w600">
                                      Category
                                    </label>
                                    <select
                                      id="inputState"
                                      className="form-control"
                                      defaultValue={formData.category_id}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          category_id: e.target.value,
                                        })
                                      }
                                    >
                                      <option selected>Choose...</option>
                                      {Category.map((category) => (
                                        <option
                                          key={category._id}
                                          value={category._id}
                                        >
                                          {category.categoryname}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="custom-card">
                              <div className="card-header">
                                <h4 className="card-title">Pricing Info</h4>
                              </div>
                              <div className="card-body">
                                <div className="form-row">
                                  <div className="form-group col-md-6">
                                    <label className="text-black font-w600">
                                      Service price
                                    </label>
                                    <input
                                      type="number"
                                      className="form-control"
                                      defaultValue={formData.amount}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          amount: e.target.value,
                                        })
                                      }
                                    />
                                  </div>

                                  <div className="form-group col-md-6">
                                    <label className="text-black font-w600">
                                      Duration
                                    </label>

                                    <select
                                      id="inputState"
                                      className="form-control"
                                      defaultValue={formData.duration}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          duration: e.target.value,
                                        })
                                      }
                                    >
                                      <option selected>Choose...</option>
                                      <option value="5">5 mins</option>
                                      <option value="10">10 mins</option>
                                      <option value="20">20 mins</option>
                                      <option value="25">25 mins</option>
                                      <option value="30">30 mins</option>
                                      <option value="40">40 mins</option>
                                      <option value="50">50 mins</option>
                                      <option value="60">1h</option>
                                      <option value="90">1h:30</option>
                                      <option value="120">2h</option>
                                    </select>
                                  </div>
                                  <div className="form-group col-md-12">
                                    <div className="form-check">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        values={formData.commission_status}
                                        checked={formData.commission_status}
                                        onChange={(e) =>
                                          setFormData({
                                            ...formData,
                                            commission_status:
                                              !formData.commission_status,
                                          })
                                        }
                                      />
                                      <label className="form-check-label">
                                        Enable Service commission
                                      </label>
                                    </div>
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
                          className="bg-[#1b1a17] hover:bg-[#cf7500] p-2.5 text-white font-semibold rounded"
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
                  Delete Client
                </h1>
                <hr className=" bg-primary border-b w-full" />
              </div>
              <div className="card-body">
                <form className=" px-8">
                  <div>
                    <h2 className="text-base m-4">
                      Do you really want permanently delete{" "}
                      <span className="italic text-black">
                        {RowData?.servicename}
                      </span>
                    </h2>
                  </div>
                  <div className="w-full flex justify-between">
                    <button
                      className="btn btn-danger light shadow-none"
                      onClick={(e) => deleteModel(e.preventDefault())}
                    >
                      Cancel
                    </button>
                    {loading ? (
                      <LoadingButton />
                    ) : (
                      <button
                        className="btn btn-outline-danger btn-s shadow-none"
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
                  <h3 className="text-black font-w500 mb-6">Services</h3>
                </div>
              )}
              <div className="dropdown custom-dropdown">
                {permissions.indexOf("add-service") !== -1 && (
                  <div
                  className="btn btn-sm btn-primary light d-flex align-items-center svg-btn shadow-none"
                  data-toggle="dropdown"
                  onClick={handleDropDown}
                  >
                    <i className="bi bi-plus-lg"></i>
                    <div className="text-left ml-3">
                      <span className="d-block fs-16">Add</span>
                      <small className="d-block fs-12">
                        Add Category or Services
                      </small>
                    </div>
                    <i className="fa fa-angle-down scale5 ml-3"></i>
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-6 -ml-4 mb-4 flex justify-center md:justify-start">
              <input
                type="text"
                name="name"
                className="form-input w-full  py-2 px-4 rounded-md border border-solid border-[#d1d1d1] focus:border-[#e3b04b] focus:ring focus:ring-[#e3b04b]"
                value={search}
                onChange={handleInputChange}
                placeholder="Search by  service Name or Category"
              />
            </div>
            <div className="row">
              {isTablet && (
                <div className="mr-auto d-lg-block mb-4">
                  {isTablet && (
                    <h2
                      className={`text-black font-w500 mb-6 ${
                        isTablet && "text-lg pl-4"
                      }`}
                    >
                      Services
                    </h2>
                  )}
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="name"
                      className="w-[40vh] py-2 px-2 rounded"
                      value={search}
                      onChange={handleInputChange}
                      placeholder="Search by Name or Category"
                    />
                  </div>
                </div>
              )}
              <div className="col-12">
                {loading && <Skeleton />}
                {!loading && (
                  <div className="table-responsive">
                    <div className="card">
                      {permissions.indexOf("export-service") !== -1 &&
                        !isTablet && (
                          <div className=" absolute right-6 items-center justify-center top-3 flex gap-2">
                            <small>Export</small>
                            <ReactHTMLTableToExcel
                              id="test-table-xls-button"
                              className="btn btn-sm btn-primary light flex items-center svg-btn shadow-none z-15"
                              table="table-to-xls"
                              filename="Barber-Service"
                              sheet="Suppliers"
                              buttonText={<FaFileExport />}
                            />
                          </div>
                        )}
                      <div className="card-body">
                        <div className="table-responsive">
                          <table id="table-to-xls" className="display w-full">
                            <thead>
                              <tr className="border-b">
                                {!isTablet && <th className="py-6 pr-2">#</th>}
                                <th className="py-6">Name</th>
                                {!isTablet && (
                                  <>
                                    <th className="py-6">Category</th>
                                    <th className="py-6">Duration</th>
                                  </>
                                )}
                                <th className="py-6">Price</th>
                                {permissions.indexOf(
                                  "edit-service",
                                  "delete-service"
                                ) !== -1 && <th className="py-6">Action</th>}
                              </tr>
                            </thead>
                            <tbody>
                              {currentPosts
                                .filter((item) => {
                                  return search.toLowerCase() === ""
                                    ? item
                                    : item.servicename
                                        .toLowerCase()
                                        .includes(search) ||
                                        item.category_id.categoryname
                                          .toLowerCase()
                                          .includes(search);
                                })
                                .map((item, index) => (
                                  <tr key={index} className="border-b">
                                    {!isTablet && (
                                      <td className="py-3 mr-3">{index + 1}</td>
                                    )}
                                    <td className="py-3">{item.servicename}</td>
                                    {!isTablet && (
                                      <>
                                        <td className="py-3">
                                          {item.category_id.categoryname}
                                        </td>
                                        <td className="py-3">
                                          {item.duration + " " + "mins"}
                                        </td>
                                      </>
                                    )}
                                    <td className="py-3">{item.amount}</td>
                                    <td className="py-3">
                                      {" "}
                                      {permissions.indexOf("edit-service") !==
                                        -1 && (
                                        <button
                                          className="bg-gray-900 hover:bg-[#cf7500] rounded shadow btn-xs sharp mr-1 bell bell-link"
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
                                          className="btn btn-danger shadow-none btn-xs sharp"
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
              <div
               className={`${
                open ? "block" : "hidden"
              } absolute right-11 -mt-24 w-[15rem] rounded-lg shadow-lg border bg-white z-50`}
              onClick={handleDropDown}
            >
                <ul className="space-y-3 p-2">
                  <li className="font-medium">
                    <button
                      className="flex w-full justify-start items-center text-[14px] text-gray-800 hover:text-white hover:bg-black p-2 rounded-md transition duration-150 ease-in-out"
                      onClick={removeModel}
                    >
                      New Service
                    </button>
                  </li>
                  <li className="font-medium">
                    <button
                      className="flex w-full justify-start items-center text-[14px] text-gray-800 hover:text-white hover:bg-black p-2 rounded-md transition duration-150 ease-in-out"
                      onClick={categoryModel}
                    >
                      Add new category
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Dashboard>
    </>
  );
};

export default Service;
