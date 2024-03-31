/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Dashboard from "../../Dashboard";
import "../sales/index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMediaQuery } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import {
  createCartRequestAction,
  deleteCartRequestActions,
  getAllCartRequestAction,
} from "../../../store/cart/actions";
import { useDispatch, useSelector } from "react-redux";
import { Badge, Tag, notification } from "antd";
import DeleteIcon from "@mui/icons-material/Delete";
import { getUser } from "../../utils/common";
import { calculateTotalAmount } from "../../../utils/helper";
import ConfirmModel from "../../model/confirmModel";

const CartsDetails = () => {
  const { cart } = useSelector((state) => state);
  const isTablet = useMediaQuery("(max-width: 960px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [deleteModel, setDeleteModel] = useState(false);
  const [cartId, setCartId] = useState("");

  const user = getUser();
  const userId = user[0]?._id;

  const handleNewSale = async () => {
    const newCartId = await createCartRequestAction({ user: userId })(dispatch);
    navigate(`/sales/new/${newCartId}`);
  };

  useEffect(() => {
    getAllCartRequestAction("?status=pending")(dispatch);
  }, []);

  const showDeleteModal = (value) => {
    setDeleteModel(true);
    setCartId(value);
  };

  const hideDeleteModal = () => {
    setDeleteModel(false);
    setCartId("");
  };

  const handleRemoveProduct = async () => {
    await deleteCartRequestActions(cartId, {
      isDeleted: true,
    })(dispatch);
    notification.success({ message: "Removed from the cart" });
    await getAllCartRequestAction("?status=pending")(dispatch);
    setCartId("");
    setDeleteModel(false);
  };

  return (
    <>
      <ToastContainer />
      <Dashboard>
        <div className={`content-body mt-[4rem] ${!isTablet && "ml-52"}`}>
          <div className="container-fluid">
            <div
              className={`relative form-head ${
                isTablet ? "mb-16" : "mb-3"
              } flex items-center justify-between`}
            >
              <button
                type="button"
                className="absolute right-0 btn btn-sm btn-primary light d-flex align-items-center svg-btn shadow-none"
                data-toggle="modal"
                data-target="#new-client"
                aria-expanded="false"
                onClick={() => handleNewSale()}
              >
                <span className="fs-16 ">Add new Sell</span>
              </button>
            </div>
            <div className="row">
              <div className="mr-auto d-lg-block mb-4">
                <h2
                  className={`text-black font-w500 mb-6 ${
                    isTablet && "text-lg pl-4"
                  }`}
                >
                  Pending Cart
                </h2>
              </div>
            </div>
            <div className="flex flex-wrap flex-col gap-2 justify-start items-start py-2 rounded-lg">
              <div className="flex flex-wrap gap-4">
               
                {cart?.all?.data?.map((d, index) => (
                  ((d?.listOfService.length > 0) || (d?.products.length > 0))?
                  <Badge.Ribbon
                    color="green"
                    text={`${calculateTotalAmount(
                      d ?? 0
                    )?.toLocaleString()} RWF`}
                    key={index}
                  >
                    <div
                      className={`relative  ${
                        isTablet ? "w-64" : "w-96"
                      } h-fit p-2  bg-white text-black rounded-md`}
                    >
                      <Link to={`/sales/new/${d?._id}`}>
                        <div className="flex w-full pb-10 pt-10">
                          <div className="flex flex-col flex-wrap pl-2">
                            <div className=" gap-1">
                              <p className="text-xs">
                                <b className="pr-8">Products: </b>
                                {d?.products?.length}
                              </p>
                              <p className="text-xs">
                                <b className="pr-10">Service: </b>{" "}
                                {d?.listOfService?.length}
                              </p>
                              <p className="text-xs">
                                <b className="pr-14">Date: </b>
                                {d?.createdAt?.slice(0, 10)}
                              </p>
                              <p className="text-xs">
                                <b className="pr-4">Created by: </b>
                                {d?.user?.firstname ?? ""}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                      <div className="absolute bottom-1 right-2 flex justify-end items-center w-full py-2 space-x-2">
                        <div className=" capitalize">
                          <Tag
                            style={{ minWidth: "4rem", textAlign: "center" }}
                          >
                            {d?.status}
                          </Tag>
                        </div>

                        <button
                          aria-label="delete"
                          className="text-gray-400"
                          onClick={() => showDeleteModal(d?._id)}
                        >
                          <DeleteIcon fontSize="small" className="h-2" />
                        </button>
                      </div>
                    </div>
                  </Badge.Ribbon>
                  :null
                ))}
              </div>
            </div>
          </div>
        </div>
      </Dashboard>
      <ConfirmModel
        open={deleteModel}
        onCancel={hideDeleteModal}
        name={"Cart"}
        onOk={handleRemoveProduct}
      />
    </>
  );
};

export default CartsDetails;
