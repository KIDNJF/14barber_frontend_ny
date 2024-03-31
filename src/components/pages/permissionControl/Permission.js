/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Fade } from "react-reveal";
import { axiosRequest, refreshPage } from "../../../api";
import Dashboard from "../../Dashboard";
import PermissionControl from "./PermissionControl";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import LoadingButton from "../../LoadingButton";
import { getUser } from "../../utils/common";
import ReactPaginate from "react-paginate";
import Skeleton from "../../Skeleton";
import { useMediaQuery } from "@mui/material";

const Team_URL = "team";
const Permission_URL = "permission";

const Permission = () => {
  const [viewDataModel, setViewDataModel] = useState(false);
  const [assignPermissionModel, setAssignPermissionModel] = useState(false);
  const [deleDataModel, setDeleteDataModel] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(null);
  const [Data, setData] = useState([]);
  const [id, setId] = useState("");
  const [findId, setFindId] = useState("");
  const [loading, setLoading] = useState(true);
  const [rowData, setRowData] = useState([]);
  const [permissionData, setPermissionData] = useState([]);
  const [isChecked, setisChecked] = useState([]);
  const [currentPage, setCurrentpage] = useState(1);
  const [postsPerPage] = useState(10);
  const isTablet = useMediaQuery("(max-width: 960px)");
  const permissions = [...isChecked];

  const user = getUser();
  const findRole = user[0]?.roles[0]?.permissions;
  const permission = [];
  findRole?.map((item) => permission.push(item.permissions));

  const viewDataModels = () => {
    let newState = !viewDataModel;
    setViewDataModel(newState);
  };
  const assignDataModel = () => {
    let newState = !assignPermissionModel;
    setAssignPermissionModel(newState);
  };
  const deleteModel = () => {
    let newState = !deleDataModel;
    setDeleteDataModel(newState);
  };

  const [formData, setFormData] = useState({
    permissions: "",
  });

  const handlecheckbox = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setisChecked([...isChecked, value]);
    } else {
      setisChecked(isChecked.filter((e) => e !== value));
    }
  };

  const arr = [];
  permissionData.forEach((item) => {
    arr.push({
      value: item?._id,
      label: item?.permissions,
    });
  });

  const ids = [];
  const setHandle = (e) => {
    setSelectedOptions(
      Array.isArray(e) ? e.map((data) => ids.push(data.value)) : []
    );
    setFormData({ permissions: ids });
  };

  const getPermissions = () => {
    axiosRequest
      .get(Permission_URL)
      .then((response) => {
        const result = response.data.data;
        setPermissionData(result);
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

  const handleAssigPermission = (e) => {
    e.preventDefault();
    const url = `roles/assign/${id}`;
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
        setViewDataModel(false);
        setAssignPermissionModel(false);
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

  const handleDismissPermission = (e) => {
    e.preventDefault();
    const url = `roles/dismiss/${findId}`;
    console.log("url", url);
    setLoading(true);
    axiosRequest
      .put(url, { permissions: permissions })
      .then((response) => {
        setisChecked("");
        setLoading(false);
        const result = response.data.message;
        toast.success(result);
        setDeleteDataModel(false);
        setViewDataModel(false);
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

  useEffect(() => {
    getTeamMember();
    getPermissions();
  }, []);

  const newData = rowData.roles;
  const arrData = [];
  const data = newData || [];
  data.forEach((elem) => {
    arrData.push(...elem.permissions);
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = Data.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = ({ selected }) => {
    setCurrentpage(selected + 1);
  };

  return (
    <>
      <ToastContainer />
      <Dashboard>
        {/* ====================== Start::  deleteDataModel =============================== */}
        <Fade top>
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
                  Remove Permission
                </h1>
                <hr className=" bg-primary border-b w-full" />
              </div>
              <div className="card-body">
                <form className=" px-8">
                  <div>
                    <h2 className="text-base m-4">
                      Do you really want permanently Remove selected
                      permissions?{" "}
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
                        onClick={handleDismissPermission}
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
        {/* ====================== Start::  AssignPermisisonModel =============================== */}
        <Fade top>
          <div
            className={`min-h-full w-screen z-50 bg-opacity-30 backdrop-blur-sm fixed flex items-center justify-center px-4 ${
              assignPermissionModel === true ? "block" : "hidden"
            }`}
          >
            <div className="modal-body -mt-16 mb-4">
              <div className="row justify-content-center  align-items-center">
                <div className="col-xl-6 col-lg-12">
                  <div className="basic-form">
                    <form>
                      <div className=" custom-card">
                        <div className="card-header">
                          <h4 className="card-title">Select Permission</h4>
                        </div>
                        <div className="card-body">
                          <div className="form-row ">
                            <div className="form-group col-md-12">
                              <label className=" text-black font-w600 ">
                                Permissions
                              </label>
                              <Select
                                options={arr}
                                onChange={setHandle}
                                isMulti
                              />
                            </div>
                          </div>
                        </div>

                        <div className="w-full card-footer">
                        <button
                          type="button"
                          className="bg-[#e3b04b] light mr-3 p-2.5 text-white font-semibold rounded"
                          onClick={() => {
                            assignDataModel();
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          className="bg-[#1b1a17] hover:bg-[#e3b04b] p-2.5 text-white font-semibold rounded"
                          onClick={handleAssigPermission}
                        >
                          Save changes
                        </button>
                      </div>
                      </div>
                     
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fade>
        {/* =========================== End::  AssignPermisisonModel =============================== */}
        {/* ===============Start:: viewDataModel ================ */}
        <Fade right>
        <div
            className={`h-screen w-full bg-opacity-30 backdrop-blur-sm fixed flex items-center justify-center z-40 ${
              viewDataModel === true ? "block" : "hidden"
            }`}
          >
             <div className="bg-white w-full lg:w-[70vw] shadow-2xl rounded-lg p-4 pb-8 h-screen lg:ml-[15rem] xl:ml-[25rem] overflow-auto">
              
              <div className="flex justify-end  -mt-6">
                <button
                  type="button"
                  className="text-[40px]"
                  data-dismiss="modal"
                  onClick={(e) => viewDataModels(e.preventDefault())}
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
                      <h3 className="mt-4 mb-8">
                        {rowData?.firstname && rowData?.lastname
                          ? `${rowData.firstname} ${rowData.lastname}`
                          : rowData?.firstname || rowData?.lastname}
                      </h3>
                      {permission.indexOf("add-role-permission") !== -1 && (
                        <button
                          className=" hover:bg-primaryHover hover:text-white btn-black  btn-s mr-3 shadow-none"
                          onClick={() =>
                            assignDataModel(setId(rowData?.roles[0]?._id))
                          }
                        >
                          Permission +
                        </button>
                      )}

                      {isChecked.length > 0 && (
                        <>
                          {permission.indexOf("remove-role-permission") !==
                            -1 && (
                            <button
                              className="btn btn-outline-danger btn-s shadow-none"
                              onClick={deleteModel}
                            >
                              Permission -
                            </button>
                          )}
                        </>
                      )}
                    </div>
                    <br />
                  </div>
                  <div className="col-md-8">
                    <div className="tab-content">
                      {PermissionControl && (
                        <PermissionControl
                          RowData={arrData}
                          handlecheckbox={handlecheckbox}
                          fname={rowData}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fade>
        {/* ===============End:: viewDataModel ================ */}

        <div className={`content-body mt-[4rem] ${!isTablet && "ml-52"}`}>
          <div className="container-fluid">
            <div
              className={`relative form-head mb-3 flex items-center justify-between`}
            >
              <div className="mr-auto d-lg-block">
                <h2
                  className={`text-black font-w500 mb-6 ${
                    isTablet && "text-lg"
                  }`}
                >
                  Manage User's Permissions
                </h2>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                {loading && <Skeleton />}
                {!loading && (
                  <div className="table-responsive">
                    <div className="card">
                      <div className="card-body">
                        <div className="table-responsive">
                          <table
                            id="example3"
                            className="display table-hover w-full"
                          >
                            <thead>
                              <tr className="border-b">
                                {!isTablet && <th className="py-6">#</th>}
                                <th className="py-6">Names</th>
                                {!isTablet && (
                                  <th className="py-6">Telephone</th>
                                )}
                                <th className="py-6">Role/Type</th>
                                {permission.indexOf(
                                  "view-role-permission",
                                  "remove-role-permission",
                                  "add-role-permission"
                                ) !== -1 && <th className="py-6">Action</th>}
                              </tr>
                            </thead>
                            <tbody>
                              {currentPosts.map((item, index) => (
                                <tr key={index} className="border-b">
                                  {!isTablet && (
                                    <td className="py-3">{index + 1}</td>
                                  )}
                                  <td className="py-3">{item.firstname}</td>
                                  {!isTablet && (
                                    <td className="py-3">{item.telephone}</td>
                                  )}
                                  <td className="py-3">
                                    {item?.type === "ADMIN_A"
                                      ? "ADMIN"
                                      : item?.type === "MANAGER_M"
                                      ? "MANAGER"
                                      : item?.type === "CASHIER_C"
                                      ? "CASHIER"
                                      : item?.type === "BARBER_B"
                                      ? "BABER"
                                      : "USER"}
                                  </td>
                                  <td className="py-3">
                                    {" "}
                                    {permission.indexOf(
                                      "view-role-permission"
                                    ) !== -1 && (
                                      <button
                                        className="bg-gray-900 hover:bg-[#cf7500] rounded shadow btn-xs sharp mr-1 bell bell-link"
                                        onClick={() => {
                                          viewDataModels(
                                            setRowData(item),
                                            setFindId(item?.roles[0]?._id)
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

export default Permission;
