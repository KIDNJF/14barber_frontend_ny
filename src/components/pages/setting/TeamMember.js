/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Dashboard from "../../Dashboard";
import Fade from "react-reveal/Fade";
import { axiosRequest, refreshPage } from "../../../api/index";
import Appointment from "./components/teamComponents/Appointment";
import Client from "./components/teamComponents/Client";
import Products from "./components/teamComponents/Products";
import Service from "./components/teamComponents/Service";
import { toast, ToastContainer } from "react-toastify";
import LoadingButton from "../../LoadingButton";
import Skeleton from "../../Skeleton";
import Select from "react-select";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { FaFileExport } from "react-icons/fa";
import { getUser } from "../../utils/common";
import ReactPaginate from "react-paginate";
import { useMediaQuery } from "@mui/material";

const Service_URL = "service";
const Team_URL = "team";
const Gender_URL = "gender";

const TeamMember = () => {
  const [createNewDataModel, setCreateNewDataModel] = useState(false);
  const [assignNewServiceModel, SetAssignNewServiceModel] = useState(false);
  const [viewTeamModel, setViewTeamModel] = useState(false);
  const [deleDataModel, setDeleteDataModel] = useState(false);
  const [updateDataModel, setUpdateDataModel] = useState(false);
  const [client, setClient] = useState(true);
  const [formErrors, setFormErrors] = useState({});
  const [appointmnent, setAppointmnent] = useState(false);
  const [selectSupplier, setSelectSupplier] = useState(true);
  const [order, setOrder] = useState(false);
  const [service, setService] = useState(false);
  const [product, setProduct] = useState(false);
  const [RowData, SetRowData] = useState([]);
  const [Data, setData] = useState([]);
  const [id, setId] = useState("");
  const [memberId, setMemberId] = useState("");
  const [visible, SetVisible] = useState("");
  const [loading, setLoading] = useState(true);
  const [getServiceData, setGetServiceData] = useState([]);
  const [genderData, setGenderData] = useState([]);
  const [isAvailable, setIsAvailable] = useState("");
  const [next, setNext] = useState(false);
  const [getAppByMemberIdData, setGetAppByMemberIdData] = useState([]);
  const [isChecked, setisChecked] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentpage] = useState(1);
  const [postsPerPage] = useState(10);
  const rmServices = [...isChecked];
  // console.log("rmServices", rmServices);
  const user = getUser();
  const findRole = user[0]?.roles[0]?.permissions;
  const permissions = [];
  findRole?.map((item) => permissions.push(item.permissions));

  const isTablet = useMediaQuery("(max-width: 960px)");

  const [formData, setFormData] = useState({
    isAvailable: true,
    start_date: "",
    firstname: "",
    services_id: "",
    lastname: "",
    telephone: "",
    end_date: "",
    country: "",
    street: "",
    status: "",
    gender: "",
    email: "",
    city: "",
    type: "",
  });

  const handlerClick = () => {
    if (formData.services_id !== "") {
      setNext(!next);
    }
  };

  const removeModel = () => {
    let newState = !createNewDataModel;
    setCreateNewDataModel(newState);
  };

  const assignServiceModel = () => {
    let newState = !assignNewServiceModel;
    SetAssignNewServiceModel(newState);
  };

  const deleteModel = () => {
    let newState = !deleDataModel;
    setDeleteDataModel(newState);
  };

  const updateModel = () => {
    let newState = !updateDataModel;
    setUpdateDataModel(newState);
  };

  const handlerOrder = () => {
    if (formData.services_id !== "") {
      setSelectSupplier(false);
      setOrder(true);
    }
  };

  const ViewMemberModel = () => {
    let newState = !viewTeamModel;
    setViewTeamModel(newState);
  };

  const handlerClient = () => {
    setClient(true);
    setAppointmnent(false);
    setService(false);
    setProduct(false);
  };

  const handlerAppointmnent = () => {
    setClient(false);
    setAppointmnent(true);
    setService(false);
    setProduct(false);
  };

  const handlerService = () => {
    setClient(false);
    setAppointmnent(false);
    setService(true);
    setProduct(false);
  };

  const handlerProduct = () => {
    setClient(false);
    setAppointmnent(false);
    setService(false);
    setProduct(true);
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

  const getService = () => {
    axiosRequest
      .get(Service_URL)
      .then((response) => {
        const result = response.data.data;
        setGetServiceData(result);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const getTeamMember = () => {
    setLoading(true);
    axiosRequest
      .get(Team_URL)
      .then((response) => {
        setLoading(false);
        const result = response.data.data;
        setData(result);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    let errors = {};
    if (formData.email === "") {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid Email";
    }
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      const url = "team";
      setLoading(true);
      await axiosRequest
        .post(url, formData)
        .then((res) => {
          setFormData({
            firstname: "",
            lastname: "",
            email: "",
            telephone: "",
            gender: "",
            country: "",
            city: "",
            street: "",
            start_date: "",
            isAvailable: "",
            end_date: "",
            status: "",
            type: "",
          });
          setLoading(false);
          const result = res.data;
          const { message } = result;
          toast.success(message);
          setCreateNewDataModel(false);
          setTimeout(() => {
            getTeamMember();
            refreshPage();
          }, 2000);
        })
        .catch((error) => {
          if (error.code === "ERR_BAD_REQUEST") {
            toast.error(error.response.data.message);
            setTimeout(() => {
              setLoading(false);
              refreshPage();
            }, 1000);
          } else {
            toast.info(error.message);
            setTimeout(() => {
              setLoading(false);
              refreshPage();
            }, 2000);
          }
        });
    }
  };

  const handleAssigService = (e) => {
    e.preventDefault();
    const url = `team/${id}`;
    setLoading(true);
    axiosRequest
      .put(url, formData)
      .then((response) => {
        setFormData({
          permissions: "",
        });
        setLoading(false);
        const result = response.data.message;
        toast.success(result);
        SetAssignNewServiceModel(false);
        setViewTeamModel(false);
        setTimeout(() => {
          getTeamMember();
          refreshPage();
        }, 500);
      })
      .catch((error) => {
        toast.info(error.response.data.message);
        setTimeout(() => {
          setLoading(false);
          refreshPage();
        }, 2000);
      });
  };

  const handleDismissService = (e) => {
    e.preventDefault();
    const url = `team/remove/${id}`;
    setLoading(true);
    axiosRequest
      .put(url, { services_id: rmServices })
      .then((response) => {
        setisChecked("");
        setLoading(false);
        const result = response.data.message;
        toast.success(result);
        setViewTeamModel(false);
        setTimeout(() => {
          getTeamMember();
          refreshPage();
        }, 500);
      })
      .catch((error) => {
        toast.info(error.response.data.message);
        console.log("error");
        setTimeout(() => {
          setLoading(false);
          refreshPage();
        }, 2000);
      });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const url = `team/${id}`;
    setLoading(true);
    axiosRequest
      .put(url, { isDeleted: "true" })
      .then((response) => {
        setLoading(false);
        getTeamMember();
        setDeleteDataModel(false);
        setViewTeamModel(false);
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
    const url = `team/${id}`;
    setLoading(true);
    axiosRequest
      .put(url, formData)
      .then((response) => {
        setFormData({
          services_id: "",
          firstname: "",
          lastname: "",
          email: "",
          telephone: "",
          gender: "",
          country: "",
          city: "",
          street: "",
          start_date: "",
          isAvailable: "",
          end_date: "",
          status: "",
        });
        setLoading(false);
        const result = response.data;
        const { message } = result;
        getTeamMember();
        toast.success(message);
        setViewTeamModel(false);
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

  const getAppByMemberId = async () => {
    const url = `appointment/allAppByteam/${memberId}`;
    await axiosRequest
      .get(url)
      .then((response) => {
        const result = response.data.data;
        setGetAppByMemberIdData(result);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleUpdateAvailability = () => {
    const url = `team/available/${visible}`;
    setLoading(true);
    axiosRequest
      .put(url, { isAvailable: !isAvailable })
      .then((response) => {
        const result = response.data;
        const { message } = result;
        if (visible) {
          toast.success(message);
          refreshPage();
          getTeamMember();
          setLoading(false);
        }
      })
      .catch((error) => {
        toast.info(error.message);
        setTimeout(() => {
          setLoading(false);
          refreshPage();
        }, 2000);
      });
  };

  const arr = [];
  getServiceData.forEach((item) => {
    arr.push({
      value: item?._id,
      label: item?.servicename,
    });
  });

  const ids = [];

  const setHandle = (e) => {
    setSelectedOptions(
      Array.isArray(e) ? e.map((data) => ids.push(data.value)) : []
    );
    setFormData({ services_id: ids });
  };

  useEffect(() => {
    getTeamMember();
    getService();
    getGenders();
  }, []);

  useEffect(() => {
    handleUpdateAvailability();
  }, [visible]);

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

  const handlecheckbox = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setisChecked([...isChecked, value]);
    } else {
      setisChecked(isChecked.filter((e) => e !== value));
    }
  };

  return (
    <>
      <ToastContainer />
      <Dashboard>
        {/* ===============Start:: Assign Services ================ */}
        <Fade top>
          <div
            className={`h-screen w-full bg-opacity-30 backdrop-blur-sm lg:mt-0 fixed flex items-center justify-center z-50 ${
              assignNewServiceModel === true ? "block" : "hidden"
            }`}
          >
            <div className="bg-white w-screen shadow-2xl rounded-lg p-4 pb-8 -ml-8 -mt-8">
              <div className="w-full">
                <div className="modal-content">
                  <div className="modal-header justify-content-center">
                    {!isTablet && (
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        onClick={(e) => assignServiceModel(e.preventDefault())}
                      >
                        <span>&times;</span>
                      </button>
                    )}
                    <h2 className="modal-title text-black font-w600 ">
                      Assign Servicers
                    </h2>
                  </div>

                  <div className="modal-body mt-[4rem] mb-4">
                    <div className="row justify-content-center  align-items-center">
                      <div className="col-xl-6 col-lg-12">
                        <div className="basic-form">
                          <form>
                            <div className=" custom-card">
                              <div className="card-header">
                                <h4 className="card-title">Select Service</h4>
                              </div>
                              <div className="card-body">
                                <div className="form-row ">
                                  <div className="form-group col-md-12">
                                    <label className=" text-black font-w600 ">
                                      Service
                                    </label>
                                    <Select
                                      options={arr}
                                      onChange={setHandle}
                                      isMulti
                                    />
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
                        onClick={(e) => assignServiceModel(e.preventDefault())}
                      >
                        Close
                      </button>
                      {loading ? (
                        <LoadingButton />
                      ) : (
                        <button
                          type="button"
                          className="bg-[#1b1a17] hover:bg-[#cf7500] p-2.5 text-white font-semibold rounded"
                          onClick={handleAssigService}
                        >
                          Save Changes
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fade>
        {/* ===============End:: Assign Services ================ */}

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

        {/* ===============Start:: NewTeamMemberModel ================ */}
        <Fade top>
          <div
            className={`h-screen w-full bg-opacity-30 backdrop-blur-sm lg:mt-0 fixed flex items-center justify-center z-50 ${
              createNewDataModel === true ? "block" : "hidden"
            }`}
          >
            <div className="bg-white w-screen shadow-2xl rounded-lg p-4 pb-8 -ml-8 -mt-8">
              <div className="w-full">
                <div className="modal-content">
                  {!isTablet && (
                    <div className="modal-header justify-content-center">
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        onClick={(e) => removeModel(e.preventDefault())}
                      >
                        <span>&times;</span>
                      </button>
                      <h2 className="modal-title text-black font-w600 ">
                        Add Team Member
                      </h2>
                    </div>
                  )}

                  <Fade right>
                    <div className="modal-body">
                      <div className="row justify-center items-center active show overflow-y-auto h-[65vh] scrollbar-hide">
                        <div className="col-xl-6 col-lg-12">
                          <div className="basic-form">
                            <form>
                              <div className=" custom-card">
                                <div className="card-header">
                                  <h4 className="card-title">Basic Info</h4>
                                </div>
                                <div className="card-body">
                                  <div className="form-row ">
                                    <div className="form-group col-md-4">
                                      <label className=" text-black font-w600 ">
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
                                    <div className="form-group col-md-4">
                                      <label className=" text-black font-w600 ">
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
                                    <div className="form-group col-md-4">
                                      <label className=" text-black font-w600 ">
                                        Phone Number
                                      </label>
                                      <input
                                        type="number"
                                        max={10}
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
                                    <div className="form-group col-md-4">
                                      <label className=" text-black font-w600 ">
                                        Email
                                      </label>
                                      <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={(e) =>
                                          setFormData({
                                            ...formData,
                                            email: e.target.value,
                                          })
                                        }
                                        required
                                      />
                                      {formErrors.email && (
                                        <div className="text-red-600">
                                          {formErrors.email}
                                        </div>
                                      )}
                                    </div>
                                    <div className="form-group col-md-4">
                                      <label className="text-black font-w600">
                                        Gender
                                      </label>
                                      <select
                                        id="inputState"
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
                                    <div className="form-group col-md-4">
                                      <label className="text-black font-w600">
                                        Role
                                      </label>
                                      <select
                                        id="inputState"
                                        className="form-control"
                                        defaultValue={formData.type}
                                        onChange={(e) =>
                                          setFormData({
                                            ...formData,
                                            type: e.target.value,
                                          })
                                        }
                                      >
                                        <option selected>Choose...</option>
                                        <option value="ADMIN_A">Admin</option>
                                        <option value="MANAGER_M">
                                          Manager
                                        </option>
                                        <option value="CASHIER_C">
                                          Cashier
                                        </option>
                                        <option value="BARBER_B">Barber</option>
                                        <option value="PEDICURE&MANICURE">
                                          Pedicure & Manicure
                                        </option>
                                        <option value="USER_U">User</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className=" custom-card">
                                <div className="card-header">
                                  <h4 className="card-title">
                                    Address Information
                                  </h4>
                                </div>
                                <div className="card-body">
                                  <div className="form-row">
                                    <div className="form-group col-md-4">
                                      <label className=" text-black font-w600 ">
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
                                      <label className=" text-black font-w600 ">
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
                                      <label className=" text-black font-w600 ">
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
                                    <div className="form-group col-md-12">
                                      <div className="form-check">
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          values={formData.isAvailable}
                                          checked={formData.isAvailable}
                                          onChange={(e) =>
                                            setFormData({
                                              ...formData,
                                              isAvailable:
                                                !formData.isAvailable,
                                            })
                                          }
                                        />
                                        <label className="form-check-label">
                                          Enable Member Availablility
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
                  </Fade>
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
                          type="button"
                          className="bg-[#1b1a17] hover:bg-[#cf7500] p-2.5 text-white font-semibold rounded"
                          onClick={handlerSubmit}
                        >
                          Add Member
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fade>
        {/* ===============End:: NewTeamMemberModel ================ */}

        {/* ===============Start:: UpdateModel ================ */}
        <Fade right>
          <div
            className={`h-screen w-full bg-opacity-30 backdrop-blur-sm lg:mt-0 fixed flex items-center justify-center z-50 ${
              updateDataModel === true ? "block" : "hidden"
            }`}
          >
            <div
              className={`bg-white w-screen shadow-2xl rounded-lg p-4 pb-8 -ml-8 ${
                isTablet ? "-mt-10" : "-mt-6"
              }`}
            >
              <div className="w-full">
                <div className="modal-content">
                  {!isTablet && (
                    <div className="modal-header justify-content-center">
                      <h2 className="modal-title text-black font-w600 ">
                        Update Member Info
                      </h2>
                    </div>
                  )}
                  {/* {selectSupplier && (
                    <div className="modal-body mt-[4rem] mb-4">
                      <div className="row justify-content-center  align-items-center">
                        <div className="col-xl-6 col-lg-12">
                          <div className="basic-form">
                            <form>
                              <div className=" custom-card">
                                <div className="card-header">
                                  <h4 className="card-title">Select Service</h4>
                                </div>
                                <div className="card-body">
                                  <div className="form-row ">
                                    <div className="form-group col-md-12">
                                      <label className=" text-black font-w600 ">
                                        Service
                                      </label>
                                      <Select
                                        options={arr}
                                        onChange={setHandle}
                                        isMulti
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  )} */}

                  {/* {order && ( */}
                  <Fade right>
                    <div className="modal-body">
                      <div className="row justify-center items-center active show overflow-y-auto h-[65vh]">
                        <div className="col-xl-6 col-lg-12">
                          <div className="basic-form">
                            <form>
                              <div className=" custom-card">
                                <div className="card-header">
                                  <h4 className="card-title">Basic Info</h4>
                                </div>
                                <div className="card-body">
                                  <div className="form-row ">
                                    <div className="form-group col-md-6">
                                      <label className=" text-black font-w600 ">
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
                                      <label className=" text-black font-w600 ">
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
                                      <label className=" text-black font-w600 ">
                                        Phone Number
                                      </label>
                                      <input
                                        type="number"
                                        max={10}
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
                                      <label className=" text-black font-w600 ">
                                        Email
                                      </label>
                                      <input
                                        type="email"
                                        name="email"
                                        className="form-control cursor-not-allowed"
                                        disabled
                                        placeholder="Email"
                                        value={formData.email}
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
                                    <div className="form-group col-md-6">
                                      <label className="text-black font-w600">
                                        Role
                                      </label>
                                      <select
                                        id="inputState"
                                        className="form-control"
                                        defaultValue={formData.type}
                                        onChange={(e) =>
                                          setFormData({
                                            ...formData,
                                            type: e.target.value,
                                          })
                                        }
                                      >
                                        <option selected>Choose...</option>
                                        <option value="ADMIN_A">Admin</option>
                                        <option value="MANAGER_M">
                                          Manager
                                        </option>
                                        <option value="CASHIER_C">
                                          Cashier
                                        </option>
                                        <option value="BARBER_B">Barber</option>
                                        <option value="USER_U">User</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className=" custom-card">
                                <div className="card-header">
                                  <h4 className="card-title">
                                    Address Information
                                  </h4>
                                </div>
                                <div className="card-body">
                                  <div className="form-row">
                                    <div className="form-group col-md-4">
                                      <label className=" text-black font-w600 ">
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
                                      <label className=" text-black font-w600 ">
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
                                      <label className=" text-black font-w600 ">
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
                                    <div className="form-group col-md-12">
                                      <div className="form-check">
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          values={formData.isAvailable}
                                          checked={formData.isAvailable}
                                          onChange={(e) =>
                                            setFormData({
                                              ...formData,
                                              isAvailable:
                                                !formData.isAvailable,
                                            })
                                          }
                                        />
                                        <label className="form-check-label">
                                          Enable Member Availablility
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
                  </Fade>
                  {/* )} */}
                  <div className="modal-footer">
                    <div>
                      <>
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
                            Save Change
                          </button>
                        )}
                      </>
                      {/* )} */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fade>
        {/* ===============End:: UpdateModel ================ */}

        {/* ===============Start:: viewMemberModel ================ */}
        <Fade right>
        <div
            className={`h-screen w-full bg-opacity-30 backdrop-blur-sm fixed flex items-center justify-center z-40 ${
              viewTeamModel === true ? "block" : "hidden"
            }`}
          >
             <div className="bg-white w-full lg:w-[70vw] shadow-2xl rounded-lg p-4 pb-8 h-screen lg:ml-[15rem] xl:ml-[25rem] overflow-auto">
              <div className="flex justify-end -mt-7">
                <button
                  type="button"
                  className="text-[40px]"
                  data-dismiss="modal"
                  onClick={(e) => ViewMemberModel(e.preventDefault())}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="custom-tab-1">
                <div className="row">
                  <div className="col-md-4 active show flex items-center justify-center">
                    <br />
                    <br />
                    <br />
                    <div className="text-center mb-3 mt-3">
                      <h3 className={`${!isTablet && "mt-4"} mb-8`}>
                        {RowData?.firstname + " " + RowData?.lastname}
                      </h3>
                      {service ? (
                        <>
                          {permissions.indexOf("edit-team-member") !== -1 && (
                            <>
                              <button
                                className="  hover:bg-black hover:text-white btn-white btn-s shadow-none"
                                onClick={() =>
                                  assignServiceModel(
                                    setFormData(RowData),
                                    setId(RowData._id)
                                  )
                                }
                              >
                                Assign Services
                              </button>

                              <>
                                {isChecked.length > 0 && (
                                  <button
                                    className=" hover:bg-primaryHover hover:text-white btn-black btn-s mr-3 shadow-none"
                                    onClick={(e) => handleDismissService(e)}
                                  >
                                    Remove Services
                                  </button>
                                )}
                              </>
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          {permissions.indexOf("edit-team-member") !== -1 && (
                            <button
                              className="hover:bg-primaryHover hover:text-white btn-black btn-s mr-3 shadow-none"
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

                          {permissions.indexOf("delete-team-member") !== -1 && (
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
                          )}
                        </>
                      )}
                    </div>
                    <br />
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
                          onClick={handlerClient}
                        >
                          Barber details
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          className="nav-link"
                          data-toggle="tab"
                          onClick={() => {
                            handlerAppointmnent();
                            getAppByMemberId();
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
                            setId(RowData._id);
                            handlerService();
                          }}
                        >
                          Services
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          className="nav-link"
                          data-toggle="tab"
                          onClick={handlerProduct}
                        >
                          Products
                        </button>
                      </li>
                    </ul>
                    <div className="tab-content">
                      {service && (
                        <Service
                          RowData={RowData.services_id}
                          handlecheckbox={handlecheckbox}
                          isTablet={isTablet}
                        />
                      )}

                      {product && <Products />}

                      {appointmnent && (
                        <Appointment
                          getAppByMemberIdData={getAppByMemberIdData}
                          isTablet={isTablet}
                        />
                      )}

                      {client && (
                        <Client RowData={RowData} isTablet={isTablet} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fade>
        {/* ===============End:: viewMemberModel ================ */}

        <div className={`content-body mt-[3rem] ${!isTablet && "ml-52"}`}>
          <div className="container-fluid">
            <div
              className={`relative form-head mb-3 flex items-center justify-between`}
            >
              {!isTablet && (
                <div className="mr-auto d-lg-block">
                  <h3 className="text-black font-w500 mb-6">Team Members</h3>
                  
                </div>
              )}
              <div className="dropdown custom-dropdown">
              {permissions.indexOf("add-team-member") !== -1 && (
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
                  <span className="fs-16">Add new Member</span>
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
                placeholder="Search by  team member Name"
              />
            </div>
            <div className="row">
              <div className="col-12">
                {loading && <Skeleton />}
                {!loading && (
                  <div className="table-responsive">
                    <div className="card">
                      {permissions.indexOf("export-team-member") !== -1 &&
                        !isTablet && (
                          <div className=" absolute right-6 items-center justify-center top-3 flex gap-2">
                            <small>Export</small>
                            <ReactHTMLTableToExcel
                              id="test-table-xls-button"
                              className="btn btn-sm btn-primary light flex items-center svg-btn shadow-none z-15"
                              table="table-to-xls"
                              filename="Barber-Team"
                              sheet="Suppliers"
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
                                {!isTablet && <th className="py-6">#</th>}
                                <th className="py-6">Names</th>
                                {!isTablet && (
                                  <th className="py-6">Telephone</th>
                                )}
                                {permissions.indexOf(
                                  "team-member-availability"
                                ) !== -1 && <th className="py-6">Available</th>}
                                {permissions.indexOf("view-team-member") !==
                                  -1 && <th className="py-6">Action</th>}
                              </tr>
                            </thead>
                            <tbody>
                              {currentPosts
                                .filter((item) => {
                                  return search?.toLowerCase() === ""
                                    ? item
                                    : item.firstname
                                        ?.toLowerCase()
                                        ?.includes(search) ||
                                        item.lastname
                                          ?.toLowerCase()
                                          ?.includes(search);
                                })
                                .map((data, index) => (
                                  <tr key={index} className="border-b">
                                    {!isTablet && (
                                      <td className="py-3">{index + 1}</td>
                                    )}
                                    <td className="py-3">
                                      {data.firstname && data.lastname
                                        ? `${data.firstname} ${data.lastname}`
                                        : data.firstname || data.lastname}
                                    </td>
                                    {!isTablet && (
                                      <td className="py-3">{data.telephone}</td>
                                    )}
                                    <td className="py-3">
                                      {permissions.indexOf(
                                        "team-member-availability"
                                      ) !== -1 && (
                                        <button
                                          className="relative inline-flex cursor-pointer items-center"
                                          onClick={() => {
                                            setIsAvailable(data?.isAvailable);
                                            SetVisible(data?._id);
                                          }}
                                        >
                                          <input
                                            type="checkbox"
                                            values={isAvailable.toString()}
                                            defaultChecked={data.isAvailable}
                                            onClick={(e) => {
                                              SetVisible(data?._id);
                                            }}
                                            className="sr-only peer"
                                          />
                                          <div
                                            className={
                                              "peer h-6 w-11 rounded-full bg-[#757575] after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-[#e0e0e0e0] after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#eeb974] peer-checked:after:translate-x-full peer-checked:after:border-white"
                                            }
                                          ></div>
                                        </button>
                                      )}
                                    </td>
                                    <td className="py-3">
                                      {" "}
                                      {permissions.indexOf(
                                        "view-team-member"
                                      ) !== -1 && (
                                        <button
                                          className="bg-gray-900 hover:bg-[#cf7500] rounded shadow btn-xs sharp mr-1 bell bell-link"
                                          onClick={() => {
                                            ViewMemberModel(
                                              SetRowData(data),
                                              setMemberId(data._id)
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

export default TeamMember;
