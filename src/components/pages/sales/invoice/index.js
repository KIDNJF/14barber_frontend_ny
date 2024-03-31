/* eslint-disable no-useless-concat */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from "react";
import { Fade } from "react-reveal";
import { toast, ToastContainer } from "react-toastify";
import { axiosRequest, refreshPage } from "../../../../api";
import { getUser } from "../../../utils/common";
import LoadingButton from "../../../LoadingButton";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCartRequestActions,
  getOneCartRequestActions,
  removeToCartRequestActions,
} from "../../../../store/cart/actions";
import { completeAppointmentActions } from "../../../../store/appointment/actions";
import { calculateTotalAmount } from "../../../../utils/helper";
import ConfirmModel from "../../../model/confirmModel";
import { Select, notification } from "antd";
const Client_URL = "client";
const Team_URL = "team";

const { Option } = Select;

const Invoice = ({ isTablet }) => {
  const { cart } = useSelector((state) => state);
  const { cartId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [removeProductModel, setRemoveProductModel] = useState(false);
  const [removeServiceModel, setRemoveServiceModel] = useState(false);
  const [productId, setProductId] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [Data, setData] = useState([]);

  const [deleDataModel, setDeleteDataModel] = useState(false);
  const [clients, setClients] = useState([]);
  const [appointment, setAppointment] = useState([]);
  const [loading, setLoading] = useState(true);
  const id = appointment[0]?._id;
  const [open, setOpen] = useState(false);
  const handleDropDown = () => setOpen(!open);

  const user = getUser();
  const findRole = user[0]?.roles[0]?.permissions;
  const permissions = [];
  findRole?.map((item) => permissions.push(item.permissions));

  const deleteModel = () => {
    let newState = !deleDataModel;
    setDeleteDataModel(newState);
  };
  const getTeamMember = () => {
    setLoading(true);
    axiosRequest
      .get(Team_URL)
      .then((response) => {
        setLoading(false);
        const result = response.data.data;
        console.log("teammember........",result);

        setData(result);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const getClients = () => {
    setLoading(true);
    axiosRequest
      .get(Client_URL)
      .then((response) => {
        setLoading(false);
        const result = response.data.data;
        setClients(result);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleRejectStatus = () => {
    const url = `appointment/cancel/${id}`;
    axiosRequest
      .put(url)
      .then((response) => {
        const result = response.data;
        const { status, message } = result;
        toast.success("Appointment rejected");
        setTimeout(() => {
          refreshPage();
        }, 500);
      })
      .catch((error) => {
        console.log(error);
        setTimeout(() => {
          refreshPage();
        }, 2000);
      });
  };

  useEffect(() => {
    getClients();
    getTeamMember();

  }, []);

  const isEmptyCart =
    cart?.selected?.data?.products?.length === 0 &&
    cart?.selected?.data?.listOfService?.length === 0;

  const totalAmount = calculateTotalAmount(cart?.selected?.data ?? {});

  const showProductModal = (value) => {
    setRemoveProductModel(true);
    setProductId(value);
  };

  const hideProductModal = () => {
    setRemoveProductModel(false);
    setProductId("");
  };

  const showServiceModal = (value) => {
    setRemoveServiceModel(true);
    setServiceId(value);
  };
  const hideServiceModal = () => {
    setRemoveServiceModel(false);
  };

  const handleRemoveProduct = async () => {
    await removeToCartRequestActions(
      {
        productIdsToRemove: [productId],
      },
      cartId
    )(dispatch);
    notification.success({ message: "Remove from the cart" });
    await getOneCartRequestActions(cartId)(dispatch);
    setProductId("");
    setRemoveProductModel(false);
  };

  const handleRemoveService = async () => {
    await removeToCartRequestActions(
      {
        serviceIdsToRemove: [serviceId],
      },
      cartId
    )(dispatch);
    notification.success({ message: "Remove from the cart" });
    await getOneCartRequestActions(cartId)(dispatch);
    setServiceId("");
    setRemoveServiceModel(false);
  };

  const onChangeClient = async (value) => {
    await addToCartRequestActions(cartId, {
      client: value,
    })(dispatch);
    notification.success({ message: "Client added Successfully" });
    await getOneCartRequestActions(cartId)(dispatch);
  };

  const onChangePaymentMethod = async (value) => {
    await addToCartRequestActions(cartId, {
      paymentMethod: value,
    })(dispatch);
    notification.success({ message: "Payment Method added Successfully" });
    await getOneCartRequestActions(cartId)(dispatch);
  };

  const productToSell = cart?.selected?.data?.products?.map((d) => {
    return {
      productId: d?.productId?._id,
      quantity: d?.quantity,
    };
  });

  const handleCartPayment = async () => {
    await addToCartRequestActions(cartId, {
      amoutPaid: totalAmount,
      status: "paid",
      productsToAdd: productToSell,
    })(dispatch);
    if (cart?.selected?.data?.hasAppointment?.length > 0) {
      await completeAppointmentActions(
        cart?.selected?.data?.hasAppointment[0]?.appointmentId,
        {}
      )(dispatch);
    }
    await navigate("/sale");
    console.log("hellllioooooooonnmmnnn",cart?.selected?.data);
  };
  console.log("hellllioooooooonnnnn",cart?.selected?.data);
  return (
    <>
      <ToastContainer />
      {/* ====================== Start::  deleteDataModel =============================== */}
      <Fade right>
        <div
          className={`min-h-full -mt-[27rem] -ml-[70%] w-screen z-50 bg-opacity-30 backdrop-blur-sm fixed flex items-center justify-center px-4 ${
            deleDataModel === true ? "block" : "hidden"
          }`}
        >
          <div className="bg-white w-1/2 shadow-2xl rounded-lg p-4">
            <div className="card-title w-full flex  flex-wrap justify-center items-center  ">
              <h1 className="font-bold text-sm text-center w-11/12">
                Reject Appointment
              </h1>
              <hr className=" bg-primary border-b w-full" />
            </div>
            <div className="card-body">
              <form className=" px-8">
                <div>
                  <h2 className="text-base pb-4 text-center">
                    Do you really want to Reject this Appointment??
                  </h2>
                </div>
                <div className="w-full flex justify-between">
                  <button
                    className="btn btn-danger light shadow-none"
                    onClick={(e) => deleteModel(e.preventDefault())}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-outline-danger btn-s shadow-none"
                    onClick={handleRejectStatus}
                  >
                    Reject
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Fade>
      {/* =========================== End::  deleteDataModel =============================== */}

      <Fragment>
        <div className="card">
          <div className="card-body">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">Cart</span>
            </h4>
            <br />
            {!isEmptyCart && (
              <ul className="list-group mb-3">
                {cart?.selected?.data?.products?.length > 0 &&
                  cart?.selected?.data?.products?.map((d) => (
                    <>
                      <li className="list-group-item d-flex justify-content-between lh-condensed">
                        <div>
                          <h6 className="my-0">{d?.productId?.productname}</h6>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-muted">
                            {`${
                              d?.quantity
                            } x ${d?.productId?.amount?.toLocaleString()} RWF`}
                          </span>
                          <spa
                            onClick={() => showProductModal(d?.productId?._id)}
                          >
                            <i className="fa fa-trash-o text-red-500"></i>
                          </spa>
                        </div>
                      </li>
                      {removeProductModel && (
                        <ConfirmModel
                          name={d?.productId?.productName}
                          open={removeProductModel}
                          hideModal={hideProductModal}
                          onOk={handleRemoveProduct}
                        />
                      )}
                    </>
                  ))}

                {cart?.selected?.data?.hasAppointment &&
                  cart?.selected?.data?.hasAppointment?.length > 0 &&
                  cart?.selected?.data?.hasAppointment?.map((d) => (
                    <>
                      <li className="list-group-item d-flex justify-content-between lh-condensed">
                        <div>
                        {/* <h6 className="my-0">{d?.serviceId.servicename}</h6> */}
                        <span className="text-muted">{d?.serviceId.servicename}</span>
                        </div>
                        <div> <div className="flex items-center space-x-4">
                          <span className="text-muted">{d?.teammemberId?.firstname}</span>

                          
                        </div>
                      </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-muted">{`${parseInt(
                            d?.serviceId.amount
                          )?.toLocaleString()} Rwf`}</span>

                          <span onClick={() => showServiceModal(d?._id)}>
                            <i className="fa fa-trash-o text-red-500"></i>
                          </span>
                        </div>
                      </li>
                      {removeServiceModel && (
                        <ConfirmModel
                          name={"Service"}
                          open={removeServiceModel}
                          hideModal={hideServiceModal}
                          onOk={handleRemoveService}
                        />
                      )}
                    </>
                  ))}

                {(cart?.selected?.data?.listOfService?.length > 0 ||
                  cart?.selected?.data?.products?.length > 0) && (
                  <li className="list-group-item d-flex justify-content-between">
                    <span className="font-semibold">Amount To Pay</span>
                    <strong>{`${totalAmount?.toLocaleString()} RWF`}</strong>
                  </li>
                )}
              </ul>
            )}
            {isEmptyCart && <div className="w-full h-10 bg-red-50"></div>}
            {/* <form> */}
              <hr />
              <div className="row">
                <div className="col-md-6">
                  <label className=" text-black font-w500 text-sm">
                    Client
                  </label>
                  <Select
                    className="form-control"
                    id="automatic-selection"
                    value={cart?.selected?.data?.client?.firstname ?? ""}
                    onChange={onChangeClient}
                    required
                  >
                    {clients?.map((el, index) => (
                      <Option
                        value={el?._id}
                        key={index}
                        className="capitalize"
                      >
                        {el?.firstname && el?.lastname
                          ? `${el?.firstname} ${el?.lastname}`
                          : el?.firstname || el?.lastname}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div className="col-md-6">
                  <label className=" text-black font-w500 text-sm">
                    Payment Method
                  </label>
                  <Select
                    className="form-control"
                    id="automatic-selection"
                    value={cart?.selected?.data?.paymentMethod ?? ""}
                    onChange={onChangePaymentMethod}
                    required
                  >
                    {["Cash", "Momo", "Card"].map((el, index) => (
                      <Option value={el} key={index} className="capitalize">
                        {el}
                      </Option>
                    ))}
                  </Select>
                </div>
              </div>
              <br />

              <hr className="mb-4" />
              <div className="row">
                <div className="col-md-3 text-sm">
                  {permissions.indexOf("approve-sales") !== -1 && (
                    <button
                      className="badge-success p-[9px] rounded border-2 text-sm "
                      type="button"
                      onClick={handleDropDown}
                    >
                      <svg
                        width="20px"
                        height="20px"
                        viewBox="0 0 24 24"
                        version="1.1"
                      >
                        <g
                          stroke="none"
                          strokeWidth="1"
                          fill="none"
                          fillRule="evenodd"
                        >
                          <rect x="0" y="0" width="24" height="24"></rect>
                          <circle fill="#000000" cx="5" cy="12" r="2"></circle>
                          <circle fill="#000000" cx="12" cy="12" r="2"></circle>
                          <circle fill="#000000" cx="19" cy="12" r="2"></circle>
                        </g>
                      </svg>
                    </button>
                  )}
                </div>

                {permissions.indexOf("approve-sales") !== -1 && (
                  <div className="col-md-9 text-sm">
                    {loading ? (
                      <LoadingButton />
                    ) : (
                      <button
                        className={`btn btn-primary text-sm btn-block ${
                          (!cart?.selected?.data?.paymentMethod ||
                            !cart?.selected?.data?.client) &&
                          "cursor-not-allowed"
                        }`}
                        disabled={
                          !cart?.selected?.data?.paymentMethod ||
                          !cart?.selected?.data?.client
                        }
                        onClick={handleCartPayment}
                      >
                        Approve Sales
                      </button>
                    )}
                  </div>
                )}
              </div>
            {/* </form> */}
          </div>
          {!isTablet && (
            <div
              className={
                !open
                  ? "hidden"
                  : "w-40 rounded-lg border bg-red-500 justify-end buttom-0"
              }
              onClick={handleDropDown}
            >
              <ul className="space-y-3 p-2">
                <li className="font-medium">
                  <button
                    className="flex cursor-pointer text-white items-center transform transition-colors duration-200 border-transparent"
                    onClick={() => {
                      deleteModel();
                    }}
                  >
                    Reject Appointment
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </Fragment>
    </>
  );
};

export default Invoice;
