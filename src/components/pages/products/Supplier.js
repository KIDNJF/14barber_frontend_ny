import React, { useEffect, useState } from "react";
import { axiosRequest, refreshPage } from "../../../api/index";
import Dashboard from "../../Dashboard";
import "../sales/index.css";
import Fade from "react-reveal/Fade";
import { toast, ToastContainer } from "react-toastify";
import Skeleton from "../../Skeleton";
import LoadingButton from "../../LoadingButton";
import { getUser } from "../../utils/common";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { FaFileExport } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { useMediaQuery } from "@mui/material";

const Supplier_URL = "supplier";

const Supplier = () => {
  const [createDataModel, setCreateDataModel] = useState(false);
  const [deleDataModel, setDeleteDataModel] = useState(false);
  const [updateDataModel, setUpdateDataModel] = useState(false);
  const [RowData, SetRowData] = useState([]);
  const [Data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentpage] = useState(1);
  const [postsPerPage] = useState(10);
  const isTablet = useMediaQuery("(max-width: 960px)");

  const user = getUser();
  const findRole = user[0]?.roles[0]?.permissions;
  const permissions = [];
  findRole?.map((item) => permissions.push(item.permissions));

  const [formData, setFormData] = useState({
    suppliername: "",
    firstname: "",
    lastname: "",
    email: "supplier@gmail.com",
    phone: "",
    website: "",
    country: "",
    city: "",
    street: "",
    status: "",
  });

  const removeModel = () => {
    let newState = !createDataModel;
    setCreateDataModel(newState);
  };
  const deleteModel = () => {
    let newState = !deleDataModel;
    setDeleteDataModel(newState);
  };
  const updateModel = () => {
    let newState = !updateDataModel;
    setUpdateDataModel(newState);
  };

  const getSuppliers = () => {
    setLoading(true);
    axiosRequest
      .get(Supplier_URL)
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
    const url = "supplier";
    setLoading(true);
    await axiosRequest
      .post(url, formData)
      .then((res) => {
        setFormData({
          suppliername: "",
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          website: "",
          country: "",
          city: "",
          street: "",
          status: "",
        });
        setLoading(false);
        const result = res.data;
        const { message } = result;
        getSuppliers();
        toast.success(message);
        setCreateDataModel(false);
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
    const url = `supplier/${id}`;
    setLoading(true);
    axiosRequest
      .put(url, { isDeleted: "true" })
      .then((response) => {
        setLoading(false);
        getSuppliers();
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
    const url = `supplier/${id}`;
    setLoading(true);
    axiosRequest
      .put(url, formData)
      .then((response) => {
        setFormData({
          suppliername: "",
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          website: "",
          country: "",
          city: "",
          street: "",
          status: "",
        });
        setLoading(false);
        const result = response.data;
        const { message } = result;
        getSuppliers();
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

  useEffect(() => {
    getSuppliers();
  }, []);

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

        {/* ===============Start:: SupplierModel ================ */}
        <Fade top>
          <div
            className={`h-screen w-full bg-opacity-30 backdrop-blur-sm lg:mt-0 fixed flex items-center justify-center z-50 ${
              createDataModel === true ? "block" : "hidden"
            }`}
          >
            <div className="bg-white w-screen shadow-2xl rounded-lg p-4 pb-8 -ml-8">
              <div className="w-full ">
                <div className="modal-content">
                  {!isTablet && (
                    <div className="modal-header justify-content-center">
                      <h2 className="modal-title text-black font-w600">
                        Add a new Supplier
                      </h2>
                    </div>
                  )}
                  <form onSubmit={handlerSubmit}>
                    <div className="modal-body">
                      <div className="row justify-center items-center active show overflow-y-auto h-[65vh] scrollbar-hide">
                        <div className="col-xl-6 col-lg-12">
                          <div className="basic-form">
                            <div className="custom-card">
                              <div className="card-header">
                                <h4 className="card-title">Supplier details</h4>
                              </div>
                              <div className="card-body">
                                <div className="form-row">
                                  <div className="form-group form-group-sm col-md-12">
                                    <label className="text-black font-w600">
                                      Supplier name
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control input-sm"
                                      placeholder="John"
                                      defaultValue={formData.suppliername}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          suppliername: e.target.value,
                                        })
                                      }
                                      required
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="custom-card">
                              <div className="card-header">
                                <h4 className="card-title">Contact Info</h4>
                              </div>
                              <div className="card-body">
                                <div className="form-row">
                                  <div className="form-group col-md-6">
                                    <label className="text-black font-w600">
                                      First name
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="jean"
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
                                      Second name
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Deo"
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
                                    <label className="text-black font-w600">
                                      Phone Number
                                    </label>
                                    <input
                                      type="number"
                                      className="form-control"
                                      placeholder="+2507xxxxxxxx"
                                      defaultValue={formData.phone}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          phone: e.target.value,
                                        })
                                      }
                                      required
                                    />
                                  </div>
                                  <div className="form-group col-md-4">
                                    <label className="text-black font-w600">
                                      Email
                                    </label>
                                    <input
                                      type="email"
                                      className="form-control"
                                      placeholder="mail@example.com"
                                      defaultValue={formData.email}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          email: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="form-group col-md-4">
                                    <label className="text-black font-w600">
                                      website
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="www.14barber.com"
                                      defaultValue={formData.website}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          website: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="custom-card">
                              <div className="card-header">
                                <h4 className="card-title">Physical Address</h4>
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
                                      Street
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
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
                            Add Supplier
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
        {/* ===============End:: SupplierModel ================ */}

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
                        {id === ""
                          ? "Add a new Supplier"
                          : "Update a Supplier info"}
                      </h2>
                    </div>
                  )}
                  <div className="modal-body">
                    <div className="row justify-center items-center active show overflow-y-auto h-[65vh]">
                      <div className="col-xl-6 col-lg-12">
                        <div className="basic-form">
                          <form>
                            <div className="custom-card">
                              <div className="card-header">
                                <h4 className="card-title">Supplier details</h4>
                              </div>
                              <div className="card-body">
                                <div className="form-row">
                                  <div className="form-group col-md-12">
                                    <label className="text-black font-w600">
                                      Supplier name
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="John"
                                      defaultValue={formData.suppliername}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          suppliername: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="custom-card">
                              <div className="card-header">
                                <h4 className="card-title">Contact Info</h4>
                              </div>
                              <div className="card-body">
                                <div className="form-row">
                                  <div className="form-group col-md-6">
                                    <label className="text-black font-w600">
                                      First name
                                    </label>
                                    <input
                                      type="tel"
                                      className="form-control"
                                      placeholder="jean"
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
                                      Second name
                                    </label>
                                    <input
                                      type="email"
                                      className="form-control"
                                      placeholder="Deo"
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
                                    <label className="text-black font-w600">
                                      Phone Number
                                    </label>
                                    <input
                                      type="number"
                                      className="form-control"
                                      placeholder="+2507xxxxxxxx"
                                      defaultValue={formData.phone}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          phone: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="form-group col-md-4">
                                    <label className="text-black font-w600">
                                      Email
                                    </label>
                                    <input
                                      type="email"
                                      className="form-control"
                                      placeholder="mail@example.com"
                                      defaultValue={formData.email}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          email: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="form-group col-md-4">
                                    <label className="text-black font-w600">
                                      website
                                    </label>
                                    <input
                                      type="email"
                                      className="form-control"
                                      placeholder="www.14barber.com"
                                      defaultValue={formData.website}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          website: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="custom-card">
                              <div className="card-header">
                                <h4 className="card-title">Physical Address</h4>
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
                                      Street
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
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

        <div className={`content-body mt-[3rem] ${!isTablet && "ml-52"}`}>
          <div className="container-fluid">
            <div
              className={`relative form-head mb-3 flex items-center justify-between`}
            >
              {!isTablet && (
                <div className="mr-auto d-lg-block">
                  <h3 className={`text-black font-w500 mb-6`}>Suppliers</h3>
                </div>
              )}
              <div className="dropdown custom-dropdown">
              {permissions.indexOf("add-supplier") !== -1 && (
                <button
                  type="button"
                  className="btn btn-sm btn-primary light d-flex align-items-center svg-btn shadow-none"
                  data-toggle="modal"
                  data-target="#new-supplier-modal"
                  aria-expanded="false"
                  onClick={removeModel}
                >
                    <i className="bi bi-plus-lg"></i>
                    <div className="text-left ml-3">
                      <span className="d-block fs-16">Add New Supplier</span>
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
                placeholder="Search by supplier name"
              />
            </div>
            <div className="row">
              <div className="col-12">
                {loading && <Skeleton />}
                {!loading && (
                  <div className="table-responsive">
                    <div className="card">
                      {permissions.indexOf("export-supplier") !== -1 &&
                        !isTablet && (
                          <div className=" absolute right-6 items-center justify-center top-3 flex gap-2">
                            <small>Export</small>
                            <ReactHTMLTableToExcel
                              id="test-table-xls-button"
                              className="btn btn-sm btn-primary light flex items-center svg-btn shadow-none z-15"
                              table="table-to-xls"
                              filename="Barber-Supplier"
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
                                <th className="py-6">Name</th>
                                <th className="py-6">Telephone</th>
                                {!isTablet && (
                                  <>
                                    <th className="py-6">Web Site</th>
                                    <th className="py-6">Email</th>
                                  </>
                                )}
                                {permissions.indexOf(
                                  "edit-supplier",
                                  "delete-supplier"
                                ) !== -1 && <th className="py-6">Action</th>}
                              </tr>
                            </thead>
                            <tbody>
                              {currentPosts
                                .filter((item) => {
                                  return search.toLowerCase() === ""
                                    ? item
                                    : item.suppliername
                                        .toLowerCase()
                                        .includes(search) ||
                                        item.email
                                          .toLowerCase()
                                          .includes(search);
                                })
                                .map((item) => (
                                  <tr key={item._id} className="border-b">
                                    <td className="py-3">
                                      {item?.suppliername}
                                    </td>
                                    <td className="py-3">{item?.phone}</td>
                                    {!isTablet && (
                                      <>
                                        <td className="py-3">{item?.email}</td>
                                        <td className="py-3">
                                          {item?.website}
                                        </td>
                                      </>
                                    )}
                                    <td className="py-3">
                                      {permissions.indexOf("edit-supplier") !==
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

                                      {permissions.indexOf(
                                        "delete-supplier"
                                      ) !== -1 && (
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
            </div>
          </div>
        </div>
      </Dashboard>
    </>
  );
};

export default Supplier;
