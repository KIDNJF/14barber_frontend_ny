/* eslint-disable no-useless-concat */
import React, { useState } from "react";
import Dashboard from "../../Dashboard";
import Images from "../../../assets/images/profile/Nothing.svg";
import "../sales/index.css";
import Fade from "react-reveal/Fade";
import { useEffect } from "react";
import { axiosRequest } from "../../../api/index";
import { refreshPage } from "../../../api/index";
import { toast, ToastContainer } from "react-toastify";
import PurchaseOrderDetails from "./components/purchaseComp/PurchaseOrder";
import OrderDetailsTab from "./components/purchaseComp/OrderDetailsTab";
import ProductsTab from "./components/purchaseComp/ProductsTab";

import Skeleton from "../../Skeleton";
import LoadingButton from "../../LoadingButton";
import { getUser } from "../../utils/common";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { FaFileExport } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { useMediaQuery } from "@mui/material";
import {
  createCartRequestAction,
  getInvBySuoRequestActions,
} from "../../../store/inventory/actions";
import {
  createPurchaseorderRequestAction,
  getAllPurchaseorderRequestAction,
  updatePurchaseorderRequestAction
} from "../../../store/purchaseorder/actions";
import { useDispatch, useSelector } from "react-redux";
import { notification, Select } from "antd";
import { Sync } from "@mui/icons-material";
const { Option } = Select;

const Supplier_URL = "supplier";
const Product_URL = "product";
const Order_URL = "order";

const PurchaseOrder = () => {
  const [createPurchaseOrderModel, setCreatePurchaseOrderModel] =
    useState(false);
  const [viewClientDetailsModel, setViewClientDetailsModel] = useState(false);
  const [selectSupplier, setSelectSupplier] = useState(true);
  const [order, setOrder] = useState(false);
  const [Supplier, setSupplier] = useState([]);
  const [product, setProduct] = useState([]);
  const [RowData, SetRowData] = useState([]);
  const [Data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [foundData, setFoundData] = useState([]);
  const [supplier_id, setSupplier_id] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentpage] = useState(1);
  const [postsPerPage] = useState(10);
  const isTablet = useMediaQuery("(max-width: 960px)");
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [details, setDetails] = useState(true);
  const [products, setProducts] = useState(false);

  const { inventory } = useSelector((state) => state);
  const { purchaseorder } = useSelector((state) => state);

  const dispatch = useDispatch();

  console.log("selectedSupplier>>>", inventory?.selectedSupplier?.data);

  const user = getUser();
  const findRole = user[0]?.roles[0]?.permissions;
  const permissions = [];
  findRole?.map((item) => permissions.push(item.permissions));

  const [orderList, setOrderList] = useState([
    { product_id: "", quantity: "", price: "", total: "" },
  ]);
  const initialValue = 0;
  const total = orderList?.reduce(
    (accumulator, current) =>
      accumulator +
      Number(
        current.quantity * inventory?.selectedSupplier?.data?.supply_price
      ),
    initialValue
  );
  const totalQ = orderList?.reduce(
    (accumulator, current) =>
      accumulator +
      Number(
        current.quantity * 1
      ),
    initialValue
  );
  const handlerDetails = () => {
    setDetails(true);
    setProducts(false);
    
  };
  const handlerProdcts = () => {
    setDetails(false);
    setProducts(true);
    
  };
  const handleOrderChange = (e, index) => {
    const { name, value } = e.target;

    const list = [...orderList];
    list[index][name] = value;
    setOrderList(list);
  };

  const handleOrderRemove = (index) => {
    const list = [...orderList];
    list.splice(index, 1);
    setOrderList(list);
  };

  const handleOrderAdd = () => {
    setOrderList([
      ...orderList,
      { product_id: "", quantity: "", price: "", total: "" },
    ]);
  };

  const suId = supplier_id;
  const orderId = RowData._id;

  const removeModel = () => {
    let newState = !createPurchaseOrderModel;
    setCreatePurchaseOrderModel(newState);
  };

  const removeViewModel = () => {
    let newState = !viewClientDetailsModel;
    setViewClientDetailsModel(newState);
  };

  const getSupplier = () => {
    axiosRequest
      .get(Supplier_URL)
      .then((response) => {
        const result = response.data.data;
        setSupplier(result);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const getProduct = () => {
    axiosRequest
      .get(Product_URL)
      .then((response) => {
        const result = response.data.data;
        setProduct(result);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  useEffect(() => {
    getAllPurchaseorderRequestAction()(dispatch);

    // getOrder();
    getSupplier();
    getProduct();

  }, []);

  useEffect(() => {
    getInvBySuoRequestActions(selectedSupplier)(dispatch);
  }, [selectedSupplier, dispatch]);

  // useEffect(() => {
  // }, []);

  const getOrder = () => {
    setLoading(true);
    axiosRequest
      .get(Order_URL)
      .then((response) => {
        setLoading(false);
        const result = response.data.data;
        setData(result);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const productData = orderList?.map((d) => {
    return { productId: d?.product_id, quantity: parseInt(d?.quantity) };
  });
  const producData = orderList?.map((d) => {
    return { id: d?.product_id, quantity: parseInt(d?.quantity), unit_price:d?.price, total_price: d?.price*parseInt(d?.quantity)};
  });

  const handleAddInventory = () => {
    const payload = {
      product: productData,
      supplier: inventory?.selectedSupplier?.data?.supplier?._id,
      SKU: inventory?.selectedSupplier?.data?.SKU,
      low_level: inventory?.selectedSupplier?.data?.low_level,
      isDeleted: false,
      stock_tracking: inventory?.selectedSupplier?.data?.stock_tracking,
      markup: inventory?.selectedSupplier?.data?.markup,
      re_order_level: inventory?.selectedSupplier?.data?.re_order_level,
      supply_price: inventory?.selectedSupplier?.data?.supply_price,
      status: "stored",
    };
    if (inventory?.selectedSupplier?.data?.supplier?._id) {
      createCartRequestAction({ ...payload })(dispatch);
    } else {
      notification.error({ message: "Please select Supplier" });
    }
  };
  const handleAddOrders = () => {
    const payload = {
      supplierId: inventory?.selectedSupplier?.data?.supplier?._id,
      total_quantity: totalQ,
      total_amount:total,
      products: producData,
      status: "PENDING",
    };
    if (inventory?.selectedSupplier?.data?.supplier?._id) {
      createPurchaseorderRequestAction({ ...payload })(dispatch);
    } else {
      notification.error({ message: "Please select Supplier" });
    }
  };

  

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = Data.slice(indexOfFirstPost, indexOfLastPost);

  console.log("cureeent posts:",purchaseorder);

  const paginate = ({ selected }) => {
    setCurrentpage(selected + 1);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    const lowercaseValue = value.toLowerCase();
    setSearch(lowercaseValue);
  };

  const handleSupplierChange = (value) => {
    setSelectedSupplier(value);
  };
  const handleReceived = (id) =>{
    const data = {
      status: "RECEIVED"
    }
    updatePurchaseorderRequestAction(id,data)(dispatch);
  }
  const handleCanceled = (id) =>{
    const data = {
      status: "CANCELED"
    }
    updatePurchaseorderRequestAction(id,data)(dispatch);
  }

  return (
    <>
      <ToastContainer />
      <Dashboard>
        {/* ===============Start:: Add orderModel ================ */}
        <Fade top>
          <div
            className={`h-screen w-full bg-opacity-30 backdrop-blur-sm lg:mt-0 fixed flex items-center justify-center z-50 ${
              createPurchaseOrderModel === true ? "block" : "hidden"
            }`}
          >
            <div className="bg-white w-screen shadow-2xl rounded-lg p-4 pb-8 -ml-8 -mt-6">
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
                        Make Purchase order
                      </h2>
                    </div>
                  )}

                  {/* ================Select supplier=============== */}
                  {/* {selectSupplier && (
                      <div className="modal-body mt-[4rem] mb-4 z-20">
                        <div className="row justify-content-center  align-items-center">
                          <div className="col-xl-6 col-lg-12">
                            <div className="basic-form">
                              <form>
                                <div className=" custom-card">
                                  <div className="card-header">
                                    <h4 className="card-title">
                                      Select supplier and Product
                                    </h4>
                                  </div>
                                  <div className="card-body">
                                    <div className="form-row ">
                                      <div className="form-group col-md-12">
                                        <label className=" text-black font-w600 ">
                                          Select Supplier
                                        </label>
                                        <select
                                          className="form-control"
                                          id="single-select"
                                          defaultValue={supplier_id}
                                          onChange={(e) =>
                                            setSupplier_id(e.target.value)
                                          }
                                        >
                                          <option>Select...</option>
                                          {Supplier.map((selectSupplier) => (
                                            <option
                                              key={selectSupplier._id}
                                              value={selectSupplier._id}
                                            >
                                              {selectSupplier?.suppliername}
                                            </option>
                                          ))}
                                        </select>
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

                  {/* ================Make Order=============== */}
                  {
                    <Fade right>
                      <div className="modal-body z-40">
                        {/* <div className="py-5 text-left">
                          <h5 className="text-black font-w600 -mt-32">
                            <button onClick={handlerSupplier}>
                              <i className="fa fa-arrow-left"></i> Back
                            </button>
                          </h5>
                        </div> */}
                        <div className="row -mt-14 justify-center items-center active show overflow-y-auto scrollbar-hide h-[65vh]">
                          <div className="col-md-4 order-md-2 mb-4">
                            <ul className="list-group mb-3">
                              <li className="list-group-item d-flex justify-content-between lh-condensed">
                                <div>
                                  <h6 className="text-black my-0">
                                    Supplier name
                                  </h6>
                                </div>
                                <span className="text-muted">
                                  {inventory?.selectedSupplier?.data?.supplier
                                    ?.firstname ?? ""}
                                </span>
                              </li>
                              <li className="list-group-item d-flex justify-content-between lh-condensed">
                                <div>
                                  <h6 className="text-black my-0">Phone</h6>
                                </div>
                                <span className="text-muted">
                                  {" "}
                                  {inventory?.selectedSupplier?.data?.supplier
                                    ?.phone ?? ""}
                                </span>
                              </li>
                              <li className="list-group-item d-flex justify-content-between lh-condensed">
                                <div>
                                  <h6 className="text-black my-0">Email</h6>
                                </div>
                                <span className="text-muted">
                                  {inventory?.selectedSupplier?.data?.supplier
                                    ?.email ?? ""}
                                </span>
                              </li>

                              <li className="list-group-item d-flex justify-content-between">
                                <span>Order total</span>
                                <div>
                                  <input
                                    className="cursor-not-allowed w-[120px] fs-18 text-center"
                                    disabled
                                    placeholder={total}
                                  />
                                </div>
                              </li>
                            </ul>
                              <div className="row">
                                <div className="col-md-12">
                                  {/* {loading ? (
                                    <LoadingButton />
                                  ) : ( */}
                                    <button
                                      className="bg-[#1b1a17] hover:bg-[#cf7500] p-2.5 text-white font-semibold rounded"
                                      type="submit"
                                      onClick={handleAddOrders}
                                    >
                                      Create Order
                                    </button>
                                  {/* )} */}
                                </div>
                              </div>
                          </div>
                          <div className="col-md-8 order-md-1">
                            <div>
                              <Select
                                className="w-100 h-10"
                                name="supplier"
                                id="automatic-selection"
                                placeholder="select supplier"
                                onChange={handleSupplierChange}
                              
                              >
                                {Supplier.map((supplier) => (
                                  <Option
                                    key={supplier._id}
                                    value={supplier._id}
                                  >
                                    {supplier?.suppliername}
                                  </Option>
                                ))}
                              </Select>
                            </div>
                            <div className="table-responsive mt-10">
                              <table
                                className="table table-responsive-sm"
                                id="tab_logic"
                              >
                                <thead>
                                  <tr>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Supply price</th>
                                    <th>Total cost</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {orderList.map((item, index) => (
                                    <tr id="addr0">
                                      <td>
                                        <select
                                          className="form-control form-control-sm w-[100px]"
                                          name="product_id"
                                          id="automatic-selection"
                                          defaultValue={item.product_id}
                                          onChange={(e) =>
                                            handleOrderChange(e, index)
                                          }
                                        >
                                          <option>select Product</option>
                                          {product.map((selectedProduct) => (
                                            <option
                                              key={selectedProduct._id}
                                              value={selectedProduct._id}
                                            >
                                              {selectedProduct.productname}
                                            </option>
                                          ))}
                                        </select>
                                      </td>
                                      <td>
                                        <input
                                          className="form-control form-control-sm w-[100px]"
                                          name="quantity"
                                          type="number"
                                          defaultValue={item.quantity}
                                          onChange={(e) =>
                                            handleOrderChange(e, index)
                                          }
                                        />
                                      </td>
                                      <td>
                                        <select
                                          className="form-control form-control-sm w-[100px]"
                                          name="price"
                                          value={item.price}
                                          onChange={(e) =>
                                            handleOrderChange(e, index)
                                          }
                                        >
                                          <option selected>select price</option>
                                          <option
                                            value={
                                              inventory?.selectedSupplier?.data
                                                ?.supply_price
                                            }
                                          >
                                            {
                                              inventory?.selectedSupplier?.data
                                                ?.supply_price
                                            }
                                          </option>
                                        </select>
                                      </td>

                                      <td>
                                        <input
                                          className="form-control form-control-sm cursor-not-allowed w-[50px]"
                                          disabled
                                          placeholder={
                                            item.quantity *
                                            inventory?.selectedSupplier?.data
                                              ?.supply_price
                                          }
                                        />
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                            <button
                              id="add_row"
                              className="bg-warning hover:bg-primaryHover hover:text-white btn btn-success pull-left"
                              onClick={handleOrderAdd}
                            >
                              Add Row
                            </button>
                            {orderList.length !== 1 && (
                              <button
                                id="delete_row"
                                className="pull-right btn btn-outline-danger btn-s shadow-none"
                                onClick={handleOrderRemove}
                              >
                                Delete Row
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </Fade>
                  }
                </div>
              </div>
            </div>
          </div>
        </Fade>
        {/* ===============End:: Add orderModel ================ */}

        {/* ================Start:: Client Details ================================= */}
        <Fade right>
        <div
            className={`h-screen w-full bg-opacity-30 backdrop-blur-sm fixed flex items-center justify-center z-40 ${
              viewClientDetailsModel === true ? "block" : "hidden"
            }`}
          >
             <div className="bg-white w-full lg:w-[70vw] shadow-2xl rounded-lg p-4 pb-8 h-screen lg:ml-[15rem] xl:ml-[25rem] overflow-auto">
              
              <div className="flex justify-end pr-10 -mt-6">
                <button
                  type="button"
                  className="text-[40px]"
                  data-dismiss="modal"
                  onClick={(e) => removeViewModel(e.preventDefault())}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="custom-tab-1">
                <div className="row">
                  <div className="col-md-4">
                    {!isTablet && (
                      <>
                        <br />
                        <br />
                        <br />
                      </>
                    )}
                    <div className={`text-center mb-3 ${!isTablet && "mt-12"}`}>
                      {!isTablet && (
                        <div className="profile-photo flex justify-center mx-auto">
                          <img
                            src={Images}
                            width="100"
                            className="img-fluid rounded-circle"
                            alt=""
                          />
                        </div>
                      )}
                      <h3 className={`${!isTablet && "mt-4"} mb-1 text-black`}>
                        {RowData?.product_id?.productname}
                      </h3>
                      <p className="text-muted">
                        {Date(RowData?.createdAt).split("G")[0]}
                      </p>
                      <span
                        className={
                          RowData?.status === "RECEIVED"
                            ? "bg-[#b0e8bf] p-2 rounded-sm text-xs font-bold"
                            : RowData?.status === "CANCELLED"
                            ? "bg-[#e34965] p-2 rounded-sm text-xs font-bold"
                            : "badge light badge-success btn-s pt-2 pb-2"
                        }
                      >
                        {RowData.status}
                      </span>
                      <br />
                      <br />
                      <br />
                      <button
                          className="bg-warning text-white hover:bg-primaryHover hover:text-white btn btn-success btn-s mr-3 shadow-none"
                          onClick={() =>
                            handleReceived(RowData._id)
                          }
                        >
                          RECEIVED
                        </button>
                        <button
                          className="bg-warning text-white hover:bg-primaryHover hover:text-white btn btn-success btn-s mr-3 shadow-none"
                          onClick={() =>
                            handleCanceled(RowData._id)
                          }
                        >
                          CANCEL
                        </button>
                        

                      
                       
                    </div>
                    <br />
                  </div>
                  <div className="col-md-8">
                  <ul
                      className={`nav nav-tabs ${
                        isTablet ? "h-24" : "h-16"
                      } flex items-center justify-between px-20 bg-[#6a7988]
  text-[#fbfbfb]`}
                    >
                      <li className="nav-item">
                        <button
                          className="nav-link"
                          data-toggle="tab"
                          onClick={handlerDetails}
                        >
                          Order details
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          className="nav-link"
                          data-toggle="tab"
                          onClick={handlerProdcts}
                        >
                          Products
                        </button>
                      </li>
                      {/* <li className="nav-item">
                        <button
                          className="nav-link"
                          data-toggle="tab"
                          onClick={handlerSales}
                        >
                          Sales history
                        </button>
                      </li> */}
                    </ul>
                    <div className="tab-content">
                      
                      {details&&<OrderDetailsTab RowData={RowData} isTablet={isTablet} />}
                      {products&&<ProductsTab RowData={RowData?.products} isTablet={isTablet} />}

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fade>
        {/* ================Start:: Client Details ================================= */}

        <div className={`content-body mt-[3rem] ${!isTablet && "ml-52"}`}>
          <div className="container-fluid">
            <div
              className={`relative form-head mb-3 flex items-center justify-between`}
            >
               {!isTablet && (
                <div className="mr-auto d-lg-block">
                  <h3 className="text-black font-w500 mb-6">Purchases</h3>
                  
                </div>
              )}
               <div className="dropdown custom-dropdown">
              {permissions.indexOf("add-purchase-order") !== -1 && (
                <button
                className="btn btn-sm btn-primary light d-flex align-items-center svg-btn shadow-none"
                  data-toggle="modal"
                  data-target="#new-purchase-order"
                  onClick={removeModel}
                >
                  <i className="bi bi-plus-lg"></i>
                  <div className="text-left ml-3">
                  <span className="fs-16 ">Add new order</span>
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
                placeholder="Search by purchase order"
              />
            </div>
            <div className="row">
              
              <div className="col-12">
                {purchaseorder?.isFetching && <Skeleton />}
                {!purchaseorder?.isFetching && (
                  <div className="card">
                    {permissions.indexOf("export-purchase-order") !== -1 &&
                      !isTablet && (
                        <div className=" absolute right-6 items-center justify-center top-3 flex gap-2">
                          <small>Export</small>
                          <ReactHTMLTableToExcel
                            id="test-table-xls-button"
                            className="btn btn-sm btn-primary light flex items-center svg-btn shadow-none z-15"
                            table="table-to-xls"
                            filename="Barber/Purchase"
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
                              {!isTablet && <th className="py-6">#</th>}
                              <th className="py-6">Date</th>
                              <th className="py-6">Supplier</th>
                              <th className="py-6">Status</th>
                              <th className="py-6">Total cost</th>
                              {permissions.indexOf("view-purchase-order") !==
                                -1 && <th className="py-6">Action</th>}
                            </tr>
                          </thead>
                          <tbody>
                            
                            {purchaseorder?.all?
                            
                            purchaseorder?.all
                              .filter((item) => {
                                return search.toLowerCase() === ""
                                  ? item
                                  : item.createdAt
                                      .split("T")[0]
                                      .toLowerCase()
                                      .includes(search) ||
                                      item.supplierId?.suppliername
                                        .toLowerCase()
                                        .includes(search) ||
                                      item.status
                                        .toLowerCase()
                                        .includes(search);
                              })
                              .map((item, index) => (
                                <tr key={index} className="border-b">
                                  {!isTablet && (
                                    <td className="py-3">{index + 1}</td>
                                  )}
                                  <td className="py-3">
                                    {item.createdAt.split("T")[0]}
                                  </td>
                                  <td className="py-3">
                                    {item?.supplierId?.suppliername}
                                  </td>
                                  <td className="py-3">
                                    <span
                                      className={
                                        item?.status === "RECEIVED"
                                          ? "bg-[#b0e8bf]  p-2 rounded-sm text-xs font-bold"
                                          : item?.status === "CANCELLED"
                                          ? "bg-[#e34965] p-2 rounded-sm text-xs font-bold"
                                          : "badge light badge-success"
                                      }
                                    >
                                      {item.status}
                                    </span>
                                  </td>
                                  <td className="py-3">
                                    {"frw" + " " + item.total_amount}
                                  </td>
                                  <td className="py-3">
                                    {" "}
                                    {permissions.indexOf(
                                      "view-purchase-order"
                                    ) !== -1 && (
                                      <button
                                        onClick={() => {
                                          removeViewModel(SetRowData(item));
                                        }}
                                        className="bg-gray-900 hover:bg-[#cf7500] rounded shadow btn-xs sharp mr-1 bell bell-link"
                                      >
                                        <i className="fa fa-eye text-white"></i>
                                      </button>
                                    )}
                                  </td>
                                </tr>
                              )):null}
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
                )}
              </div>
            </div>
          </div>
        </div>
      </Dashboard>
    </>
  );
};

export default PurchaseOrder;
