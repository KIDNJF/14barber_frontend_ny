/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Dashboard from "../../Dashboard";
import "../sales/index.css";
import Fade from "react-reveal/Fade";
import { axiosRequest, refreshPage } from "../../../api/index";
import Image from "../../../assets/images/profile/avatar-barber.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nodata from "../../Nodata";
import Skeleton from "../../Skeleton";
import LoadingButton from "../../LoadingButton";
import ClientProduct from "./clientComp/ClientProduct";
import ClientDetails from "./clientComp/ClientDetails";
import ClientAppointment from "./clientComp/ClientAppointment";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { FaFileExport } from "react-icons/fa";
import ClientService from "./clientComp/ClientService";
import { getUser } from "../../utils/common";
import ReactPaginate from "react-paginate";
import { useMediaQuery } from "@mui/material";

const Client_URL = "client";
const Gender_URL = "gender";

const ClientList = () => {
  const [createClientModel, setCreateClientModel] = useState(false);
  const [updateClientModel, setUpdateClientModel] = useState(false);
  const [deleDataModel, setDeleteDataModel] = useState(false);
  const [updateDataModel, setUpdateDataModel] = useState(false);
  const [clientSales, setClientSales] = useState(false);
  const [clientProduct, setClientProduct] = useState(false);
  const [clientAp, setClientAp] = useState(false);
  const [RowData, SetRowData] = useState([]);
  const [Data, setData] = useState([]);
  const [genderData, setGenderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState("");
  const [getAppByClientIdData, setGetAppByClientIdData] = useState([]);
  const [clientDetals, setClientDetals] = useState(true);
  const [getSAlesByClientId, setGetSAlesByClientId] = useState([]);
  const [search, setSearch] = useState("");
  const [find, setFind] = useState("");
  const [currentPage, setCurrentpage] = useState(1);
  const [postsPerPage] = useState(10);

  const isTablet = useMediaQuery("(max-width: 960px)");

  const user = getUser();
  const findRole = user[0]?.roles[0]?.permissions;
  const permissions = [];
  findRole?.map((item) => permissions.push(item.permissions));

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    gender: "",
    telephone: "",
    country: "",
    city: "",
    street: "",
    client_info: "",
    password: "kigali123",
    email: "client@gmail.com",
  });

  const handlerClientDetals = () => {
    setClientDetals(true);
    setClientAp(false);
    setClientSales(false);
    setClientProduct(false);
  };
  const handlerClientAp = () => {
    setClientDetals(false);
    setClientAp(true);
    setClientSales(false);
    setClientProduct(false);
  };
  const handlerClientSales = () => {
    setClientDetals(false);
    setClientAp(false);
    setClientSales(true);
    setClientProduct(false);
  };
  const handlerClientProduct = () => {
    setClientDetals(false);
    setClientAp(false);
    setClientSales(false);
    setClientProduct(true);
  };

  const removeModel = () => {
    let newState = !createClientModel;
    setCreateClientModel(newState);
  };
  const ViewAndUpdateModel = () => {
    let newState = !updateClientModel;
    setUpdateClientModel(newState);
  };
  const deleteModel = () => {
    let newState = !deleDataModel;
    setDeleteDataModel(newState);
  };
  const updateModel = () => {
    let newState = !updateDataModel;
    setUpdateDataModel(newState);
  };

  const getClients = () => {
    setLoading(true);
    axiosRequest
      .get(Client_URL)
      .then((response) => {
        setLoading(false);
        const result = response.data.data;
        setData(result);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const getGenders = () => {
    setLoading(true);
    axiosRequest
      .get(Gender_URL)
      .then((response) => {
        setLoading(false);
        const result = response.data.data;
        setGenderData(result);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const getAppByClientId = async () => {
    const url = `appointment/allAppByclient/${find}`;
    await axiosRequest
      .get(url)
      .then((response) => {
        const result = response.data.data;
        setGetAppByClientIdData(result);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // const getAppByClientId = async () => {
  //   const url = `appointment/allAppByclient/${find}`;
  //   await axiosRequest
  //     .get(url)
  //     .then((response) => {
  //       console.log("NNNN",response)
  //       const res = response.data.data;
  //       const result = res.filter(
  //         (element) => element.appointment_status === "PENDING"
  //       );
  //       setGetAppByClientIdData(result);
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //     });
  // };

  const getSalesByClientId = async () => {
    const url = `sales/client/${find}`;
    await axiosRequest
      .get(url)
      .then((response) => {
        const result = response.data.data;
        setGetSAlesByClientId(result);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const url = "client";
    setLoading(true);
    await axiosRequest
      .post(url, formData)
      .then((res) => {
        setLoading(false);
        const result = res.data;
        const { message } = result;
        getClients();
        setCreateClientModel(false);
        toast.success({ message: "Client added Successfully" });
      })
      .catch((error) => {
        console.log(">..............", error);
        if (error.code === "ERR_BAD_RESPONSE") {
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
    const url = `client/${id}`;
    setLoading(true);
    axiosRequest
      .put(url, { isDeleted: "true" })
      .then((response) => {
        setLoading(false);
        getClients();
        setDeleteDataModel(false);
        setUpdateClientModel(false);
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
    const url = `client/${id}`;
    setLoading(true);
    axiosRequest
      .put(url, formData)
      .then((response) => {
        setFormData({
          firstname: "",
          lastname: "",
          gender: "",
          telephone: "",
          country: "",
          city: "",
          street: "",
          client_info: "",
          email: ",",
        });
        setLoading(false);
        const result = response.data;
        const { message } = result;
        getClients();
        setUpdateDataModel(false);
        setUpdateClientModel(false);
        toast.success(message);
      })
      .catch((error) => {
        toast.info(error.message);
        setTimeout(() => {
          setLoading(false);
          refreshPage();
        }, 2000);
      });
  };

  const initialValue = 0;
  const totalServiceSales = getSAlesByClientId?.reduce(
    (accumulator, current) => accumulator + Number(current.totalbt2),
    initialValue
  );

  useEffect(() => {
    getClients();
    getGenders();
  }, []);

  useEffect(() => {
    getSalesByClientId();
  }, [find]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = Data.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = ({ selected }) => {
    setCurrentpage(selected + 1);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    const lowercaseValue = value.toLowerCase();
    setSearch(lowercaseValue);
  };

  return (
    <>
      <ToastContainer />
      <Dashboard>
        {/* ====================== Start::  deleteDataModel =============================== */}
        <Fade right>
          <div
            className={`min-h-full w-screen z-50 bg-opacity-30 backdrop-blur-sm fixed flex items-center justify-center px-4 ${
              deleDataModel === true ? "block" : "hidden"
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
                        {RowData?.firstname}
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

        {/* ===============Start:: createmodel ================ */}
        <Fade top>
          <div
            className={`h-screen w-full bg-opacity-30 backdrop-blur-sm lg:mt-0 fixed flex items-center justify-center z-50 ${
              createClientModel === true ? "block" : "hidden"
            }`}
          >
            <div className="bg-white w-screen shadow-2xl rounded-lg p-4 pb-8 -ml-10">
              <div className="w-full ">
                <div className="modal-content">
                  {!isTablet && (
                    <div className="modal-header justify-content-center">
                      <h2 className="modal-title text-black font-w600">
                        Add a new client
                      </h2>
                    </div>
                  )}
                  <form onSubmit={handlerSubmit}>
                    <div className="modal-body">
                      <div
                        className={`row justify-center items-center active show overflow-y-auto ${
                          isTablet ? "h-[60vh]" : "h-[65vh]"
                        } scrollbar-hide`}
                      >
                        <div className="col-xl-6 col-lg-12">
                          <div className="basic-form">
                            <div className="custom-card">
                              <div className="card-header">
                                <h4 className="card-title">
                                  Client Basic Info
                                </h4>
                              </div>
                              <div className="card-body">
                                <div className="form-row">
                                  <div className="form-group col-md-6">
                                    <label className="text-black font-w600">
                                      First Name
                                    </label>
                                    <input
                                      type="text"
                                      name="text"
                                      className="form-control"
                                      placeholder="John"
                                      defaultValue={formData.firstname}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          firstname: e.target.value,
                                        })
                                      }
                                      required
                                    />
                                  </div>
                                  <div className="form-group col-md-6">
                                    <label className="text-black font-w600">
                                      Last Name
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Doe"
                                      defaultValue={formData.lastname}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          lastname: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="form-group col-md-6">
                                    <label className="text-black font-w600">
                                      Phone Number
                                    </label>
                                    <input
                                      type="number"
                                      name="number"
                                      className="form-control"
                                      placeholder="+2507xxxxxxxx"
                                      defaultValue={formData.telephone}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          telephone: e.target.value,
                                        })
                                      }
                                      required
                                    />
                                  </div>
                                  <div className="form-group col-md-6">
                                    <label className="text-black font-w600">
                                      Email
                                    </label>
                                    <input
                                      type="email"
                                      name="email"
                                      className="form-control"
                                      placeholder="Email"
                                      defaultValue={formData.email}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          email: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="form-group col-md-6">
                                    <label className="text-black font-w600">
                                      Gender
                                    </label>
                                    <select
                                      id="inputState"
                                      name="gender"
                                      className="form-control"
                                      defaultValue={formData.gender}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          gender: e.target.value,
                                        })
                                      }
                                    >
                                      <option value="">Choose...</option>
                                      {genderData.map((d) => (
                                        <option
                                          value={d._id}
                                          className="capitalize"
                                        >
                                          {d.name}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="custom-card">
                              <div className="card-header">
                                <h4 className="card-title">
                                  Client Address Info
                                </h4>
                              </div>
                              <div className="card-body">
                                <div className="form-row">
                                  <div className="form-group col-md-4">
                                    <label className="text-black font-w600">
                                      Country
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Rwanda"
                                      defaultValue={formData.country}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          country: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="form-group col-md-4">
                                    <label className="text-black font-w600">
                                      City
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Kigali"
                                      defaultValue={formData.city}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          city: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="form-group col-md-4">
                                    <label className="text-black font-w600">
                                      Address
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="kk 1** st"
                                      defaultValue={formData.street}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          street: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="custom-card">
                              <div className="card-header">
                                <h4 className="card-title">
                                  Client Address Info
                                </h4>
                              </div>
                              <div className="card-body">
                                <div className="form-row">
                                  <div className="form-group col-md-12">
                                    <label className="text-black font-w600">
                                      Client's Info
                                    </label>
                                    <textarea
                                      className="form-control"
                                      rows="4"
                                      id="comment"
                                      placeholder="E.g. allergy to shampoos with sodium"
                                      defaultValue={formData.client_info}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          client_info: e.target.value,
                                        })
                                      }
                                    ></textarea>
                                  </div>
                                  {/* <div className="form-group col-md-4">
                                    <div className="form-check">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                      />
                                      <label className="form-check-label">
                                        Display on all bookings
                                      </label>
                                    </div>
                                  </div> */}
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
                            // onClick={handlerSubmit}
                          >
                            Add Client
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
        {/* ===============End:: createmodel ================ */}

        {/* ===============Start:: UpdateModel ================ */}
        <Fade right>
          <div
            className={`h-screen w-full bg-opacity-50 backdrop-blur-sm lg:mt-0 fixed flex items-center justify-center z-50 ${
              updateDataModel === true ? "block" : "hidden"
            }`}
          >
            <div className="bg-white w-screen shadow-2xl rounded-lg p-4 pb-8 -ml-8">
              <div className="w-full ">
                <div className="modal-content">
                  {!isTablet && (
                    <div className="modal-header justify-content-center">
                      <h2 className="modal-title text-black font-w600">
                        Update a Client info
                      </h2>
                    </div>
                  )}
                  <div className="modal-body">
                    <div
                      className={`row justify-center items-center active show overflow-y-auto ${
                        isTablet ? "h-[60vh]" : "h-[65vh]"
                      }`}
                    >
                      <div className="col-xl-6 col-lg-12">
                        <div className="basic-form">
                          <form>
                            <div className="custom-card">
                              <div className="card-header">
                                <h4 className="card-title">
                                  Client Basic Info
                                </h4>
                              </div>
                              <div className="card-body">
                                <div className="form-row">
                                  <div className="form-group col-md-6">
                                    <label className="text-black font-w600">
                                      First Name
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="John"
                                      defaultValue={formData.firstname}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          firstname: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="form-group col-md-6">
                                    <label className="text-black font-w600">
                                      Last Name
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Doe"
                                      defaultValue={formData.lastname}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          lastname: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="form-group col-md-6">
                                    <label className="text-black font-w600">
                                      Phone Number
                                    </label>
                                    <input
                                      type="number"
                                      className="form-control"
                                      placeholder="+2507xxxxxxxx"
                                      defaultValue={formData.telephone}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          telephone: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="form-group col-md-6">
                                    <label className="text-black font-w600">
                                      Email
                                    </label>
                                    <input
                                      type="email"
                                      className="form-control"
                                      placeholder="Email"
                                      defaultValue={formData.email}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          email: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="form-group col-md-12">
                                    <label className="text-black font-w600">
                                      Gender
                                    </label>
                                    <select
                                      id="inputState"
                                      className="form-control"
                                      defaultValue={formData?.gender?.name}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          gender: e.target.value,
                                        })
                                      }
                                    >
                                      <option value="">Choose...</option>
                                      {genderData.map((d) => (
                                        <option
                                          value={d._id}
                                          className="capitalize"
                                        >
                                          {d.name}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="custom-card">
                              <div className="card-header">
                                <h4 className="card-title">
                                  Client Address Info
                                </h4>
                              </div>
                              <div className="card-body">
                                <div className="form-row">
                                  <div className="form-group col-md-4">
                                    <label className="text-black font-w600">
                                      Country
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Rwanda"
                                      defaultValue={formData.country}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          country: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="form-group col-md-4">
                                    <label className="text-black font-w600">
                                      City
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Kigali"
                                      defaultValue={formData.city}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          city: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="form-group col-md-4">
                                    <label className="text-black font-w600">
                                      Address
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="kk 1** st"
                                      defaultValue={formData.street}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          street: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="custom-card">
                              <div className="card-header">
                                <h4 className="card-title">
                                  Client Address Info
                                </h4>
                              </div>
                              <div className="card-body">
                                <div className="form-row">
                                  <div className="form-group col-md-12">
                                    <label className="text-black font-w600">
                                      Client's Info
                                    </label>
                                    <textarea
                                      className="form-control"
                                      rows="4"
                                      id="comment"
                                      placeholder="E.g. allergy to shampoos with sodium"
                                      defaultValue={formData.client_info}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          client_info: e.target.value,
                                        })
                                      }
                                    ></textarea>
                                  </div>
                                  <div className="form-group col-md-4">
                                    <div className="form-check">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                      />
                                      <label className="form-check-label">
                                        Display on all bookings
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
                        className="btn btn-danger light mr-3 shadow-none"
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

        {/* ===============Start:: ViewModel ================ */}
        <Fade right>
        <div
            className={`h-screen w-full bg-opacity-30 backdrop-blur-sm fixed flex items-center justify-center z-40 ${
              updateClientModel === true ? "block" : "hidden"
            }`}
          >
             <div className="bg-white w-full lg:w-[70vw] shadow-2xl rounded-lg p-4 pb-8 h-screen lg:ml-[15rem] xl:ml-[25rem] overflow-auto">
              <div className="flex justify-end -mt-7">
                <button
                  type="button"
                  className="text-[40px]"
                  data-dismiss="modal"
                  onClick={(e) => ViewAndUpdateModel(e.preventDefault())}
                >
                  <span >&times;</span>
                </button>
              </div>
              <div className="custom-tab-1">
                <div className="row">
                  <div className="col-md-4">
                    {/* {!isTablet && (
                     
                    )} */}
                    <div className="text-center mb-3 mt-32">
                      <div className="profile-photo flex justify-center mx-auto">
                        <img
                          src={Image}
                          width="100"
                          className="img-fluid rounded-circle"
                          alt=""
                        />
                      </div>
                      <h3 className={`${!isTablet && "mt-4"} mb-1`}>
                        {RowData?.firstname + " " + RowData?.lastname}
                      </h3>
                      <div className="mt-4">
                      {permissions.indexOf("edit-client") !== -1 && (
                        <button
                          className=" hover:bg-primaryHover hover:text-white btn-black btn-s mr-3 shadow-none"
                          onClick={() =>
                            updateModel(
                              setFormData(RowData),
                              setId(RowData._id)
                            )
                          }
                        >
                          Update
                        </button>
                      )}
                      {permissions.indexOf("delete-client") !== -1 && (
                        <button
                          className="hover:bg-black hover:text-white btn-white btn-s shadow-none"
                          onClick={() => {
                            deleteModel(
                              SetRowData(RowData),
                              setId(RowData._id)
                            );
                          }}
                        >
                          Delete
                        </button>
                      )}</div>
                    </div>
                    {!isTablet && (
                      <>
                        {/* <br />
                        <div className="card mt-3">
                          <div className="card-body ml-3">
                            <div className="basic-list-group">
                              <ul className="list-group">
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                  Total sales(RWF)
                                  <span className="badge badge-primary badge-pill">
                                    {totalServiceSales}
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div> */}
                      </>
                    )}
                  </div>
                  <div className="col-md-8">
                  <ul
                      className={`nav nav-tabs ${
                        isTablet ? "h-24" : "h-16"
                      } flex items-center  px-20 bg-[#111]
  text-[#fff]`}
                    >
                      <li className="nav-item">
                        <button
                          className="nav-link"
                          data-toggle="tab"
                          onClick={handlerClientDetals}
                        >
                          Client details
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          className="nav-link"
                          data-toggle="tab"
                          onClick={() => {
                            handlerClientAp();
                            getAppByClientId();
                          }}
                        >
                          Appointments
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          className="nav-link"
                          data-toggle="tab"
                          onClick={() => {
                            handlerClientSales();
                            getSalesByClientId();
                          }}
                        >
                          Services
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          className="nav-link"
                          data-toggle="tab"
                          onClick={handlerClientProduct}
                        >
                          Products
                        </button>
                      </li>
                    </ul>
                    <div className="tab-content">
                      {clientSales && (
                        <div
                          className={`tab-pane fade active show overflow-y-auto ${
                            isTablet ? "h-[50vh]" : "h-[75vh]"
                          } scrollbar-hide`}
                        >
                          {getSAlesByClientId[0]?.service ? (
                            <ClientService
                              getSAlesByClientId={getSAlesByClientId}
                            />
                          ) : (
                            <Nodata />
                          )}
                        </div>
                      )}

                      {clientAp && (
                        <div
                          className={`tab-pane fade active show overflow-y-auto ${
                            isTablet ? "h-[50vh]" : "h-[75vh]"
                          } scrollbar-hide`}
                        >
                          <br />
                          {getAppByClientIdData[0]?.service_id?.servicename ? (
                            <ClientAppointment
                              getAppByClientIdData={getAppByClientIdData}
                            />
                          ) : (
                            <Nodata />
                          )}
                        </div>
                      )}

                      {clientDetals && (
                        <div
                          className={`tab-pane fade active show overflow-y-auto ${
                            isTablet ? "h-[50vh]" : "h-[75vh]"
                          } scrollbar-hide`}
                          id="product-details"
                        >
                          <br />
                          <ClientDetails RowData={RowData} />
                        </div>
                      )}

                      {clientProduct && (
                        <div
                          className={`tab-pane fade active show overflow-y-auto ${
                            isTablet ? "h-[50vh]" : "h-[75vh]"
                          } scrollbar-hide`}
                          id="product-details"
                        >
                          <ClientProduct />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fade>
        {/* ===============End:: ViewModel ================ */}

        <div className={`content-body mt-[3rem] ${!isTablet && "ml-52"}`}>
          <div className="container-fluid">
            <div
              className={`relative form-head mb-3 flex items-center justify-between`}
            >
              {!isTablet && (
                <div className="mr-auto d-lg-block">
                  <h3 className="text-black font-w500 mb-6">Our Clients</h3>
                  
                </div>
              )}
                <div className="dropdown custom-dropdown">
              {permissions.indexOf("add-client") !== -1 && (
                <button
                  type="button"
                  className="btn btn-sm btn-primary light d-flex align-items-center svg-btn shadow-none"
                  data-toggle="modal"
                  data-target="#new-client"
                  aria-expanded="false"
                  onClick={removeModel}
                >
                  <i className="bi bi-plus-lg"></i>
                    <div className="text-left ml-3">
                  <span className="fs-16 ">Add new client</span>
                  </div>
                </button>
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
                placeholder="Search by Client Name "
              />
            </div>
            <div className="row">
              <div className="col-12">
                {loading && <Skeleton />}
                {!loading && (
                  <div className="table-responsive">
                    <div className="card">
                      {permissions.indexOf("export-client") !== -1 &&
                        !isTablet && (
                          <div className=" absolute right-6 items-center justify-center top-3 flex gap-2">
                            <small>Export</small>
                            <ReactHTMLTableToExcel
                              id="test-table-xls-button"
                              className="btn btn-sm btn-primary light flex items-center svg-btn shadow-none z-15"
                              table="table-to-xls"
                              filename="Barber-Client"
                              sheet="Client List"
                              buttonText={<FaFileExport />}
                            />
                          </div>
                        )}
                      <div className="card-body">
                        <div className="table-responsive">
                          <table
                            id="table-to-xls"
                            className="display table-hover w-full"
                          >
                            <thead>
                              <tr className="border-b">
                                <th className="py-6">Client name</th>
                                <th className="py-6">Mobile number</th>
                                {!isTablet && <th className="py-6">Gender</th>}
                                {permissions.indexOf("view-client") !== -1 && (
                                  <th className="py-6">Action</th>
                                )}
                              </tr>
                            </thead>
                            <tbody>
                              {currentPosts
                                .filter((item) => {
                                  return search.toLowerCase() === ""
                                    ? item
                                    : item.firstname
                                        .toLowerCase()
                                        .includes(search) ||
                                        item.lastname
                                          .toLowerCase()
                                          .includes(search) ||
                                        item.gender.name
                                          .toLowerCase()
                                          .includes(search);
                                })
                                .map((item) => (
                                  <tr key={item._id} className="border-b">
                                    <td className="py-3 capitalize">
                                      {item?.firstname + " " + item?.lastname}
                                    </td>
                                    <td className="py-3">{item?.telephone}</td>
                                    {!isTablet && (
                                      <td className="py-3 capitalize">
                                        {item.gender.name}
                                      </td>
                                    )}
                                    <td className="py-3">
                                      {" "}
                                      {permissions.indexOf("view-client") !==
                                        -1 && (
                                        <button
                                          className="bg-gray-900 hover:bg-[#cf7500] rounded shadow btn-xs sharp mr-1 bell bell-link"
                                          onClick={() => {
                                            ViewAndUpdateModel(
                                              SetRowData(item),
                                              setFind(item._id)
                                            );
                                          }}
                                        >
                                          <i className="fa fa-eye text-white"></i>
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

export default ClientList;
