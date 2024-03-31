/* eslint-disable no-useless-concat */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from "react";
import Dashboard from "../../Dashboard";
import "../sales/index.css";
import Image from "../../../assets/images/profile/Hair-product.jpg";
import Fade from "react-reveal/Fade";
import { axiosRequest, refreshPage } from "../../../api/index";
import "react-quill/dist/quill.snow.css";
import { toast, ToastContainer } from "react-toastify";
import SalesHistTabs from "./components/productComp/SalesHistTabs";
import Purchase from "./components/productComp/Purchase";
import ProductDetails from "./components/productComp/ProductDetails";
import Skeleton from "../../Skeleton";
import LoadingButton from "../../LoadingButton";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { FaFileExport } from "react-icons/fa";
import { getUser } from "../../utils/common";
import ReactPaginate from "react-paginate";
import { useMediaQuery } from "@mui/material";

const Product_URL = "product";
const Category_URL = "productCategory";
const Supplier_URL = "supplier";

const ProductList = () => {
  const [createNewProductModel, setCreateNewProductModel] = useState(false);
  const [addNewCategoryModel, setAddNewCategoryModel] = useState(false);
  const [viewProductModel, setViewProductModel] = useState(false);
  const [deleDataModel, setDeleteDataModel] = useState(false);
  const [updateDataModel, setUpdateDataModel] = useState(false);
  const [product, setProduct] = useState(true);
  const [purchase, setPurchase] = useState(false);
  const [sales, setSales] = useState(false);
  const [RowData, SetRowData] = useState([]);
  const [Data, setData] = useState([]);
  const [id, setId] = useState("");
  const [Category, setCategory] = useState([]);
  const [Supplier, setSupplier] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productData, setProductData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [search, setSearch] = useState("");
  const [find, setFind] = useState("");
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentpage] = useState(1);
  const [postsPerPage] = useState(10);
  const isTablet = useMediaQuery("(max-width: 960px)");

  const handleDropDown = () => setOpen(!open);

  const user = getUser();
  const findRole = user[0]?.roles[0]?.permissions;
  const permissions = [];
  findRole?.map((item) => permissions.push(item.permissions));

  const [formData, setFormData] = useState({
    productname: "",
    quantity: "",
    unit: "",
    amount: "",
    description: "",
    category_id: "",
    retail_status: "",
    status: "",
    supplier_id: "",
    SKU: "",
    current_quantity: "",
    supply_price: "",
    retail_price: "",
    markup: "",
    stock_tracking: "",
    low_level: "",
    re_order_level: "",
  });
  // console.log("Data", formData?.retail_price);

  const [catFormData, setCatFormData] = useState({
    categoryname: "",
    category_Description: "",
  });

  const removeModel = () => {
    let newState = !createNewProductModel;
    setCreateNewProductModel(newState);
  };

  const deleteModel = () => {
    let newState = !deleDataModel;
    setDeleteDataModel(newState);
  };

  const updateModel = () => {
    let newState = !updateDataModel;
    setUpdateDataModel(newState);
  };

  const categoryModel = () => {
    let newState = !addNewCategoryModel;
    setAddNewCategoryModel(newState);
  };

  const ViewModel = () => {
    let newState = !viewProductModel;
    setViewProductModel(newState);
  };

  const handlerProduct = () => {
    setProduct(true);
    setPurchase(false);
    setSales(false);
  };

  const handlerPurchase = () => {
    setProduct(false);
    setPurchase(true);
    setSales(false);
  };

  const handlerSales = () => {
    setProduct(false);
    setPurchase(false);
    setSales(true);
  };

  const getProducts = () => {
    setLoading(true);
    axiosRequest
      .get(Product_URL)
      .then((response) => {
        setLoading(false);
        const result = response.data.data;
        setData(result);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const getProductCategories = () => {
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

  const getInventoryByProductId = async () => {
    const url = `inventory/product/${find}`;
    await axiosRequest
      .get(url)
      .then((response) => {
        const result = response.data.data;
        setProductData(result);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const getOrderByProductId = async () => {
    const url = `order/product/${find}`;
    await axiosRequest
      .get(url)
      .then((response) => {
        const result = response.data.data;
        setOrderData(result);
      })
      .catch((error) => {
        console.log(error.message);
      });
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

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const url = "product";
    setLoading(true);
    await axiosRequest
      .post(url, formData)
      .then((res) => {
        setFormData({
          current_quantity: "",
          stock_tracking: "",
          re_order_level: "",
          retail_status: "",
          productname: "",
          supply_price: "",
          retail_price: "",
          supplier_id: "",
          category_id: "",
          description: "",
          low_level: "",
          barcode: "",
          amount: "",
          status: "",
          markup: "",
          unit: "",
          SKU: "",
        });
        setLoading(false);
        const result = res.data;
        const { message } = result;
        setCreateNewProductModel(false);
        toast.success(message);
        setTimeout(() => {
          refreshPage();
          getProducts();
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
    const url = "productCategory";
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
        getProducts();
        getProductCategories();
        setAddNewCategoryModel(false);
        toast.success(message);
      })
      .catch((error) => {
        {
          error.code === "ERR_BAD_RESPONSE"
            ? toast.error(error.response.data.message)
            : error.code === "ERR_BAD_REQUEST"
            ? toast.error(error.response.data.message)
            : toast.info(error.message);
        }
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const url = `product/${id}`;
    setLoading(true);
    axiosRequest
      .put(url, formData)
      .then((response) => {
        setFormData({
          current_quantity: "",
          stock_tracking: "",
          re_order_level: "",
          retail_status: "",
          productname: "",
          supply_price: "",
          retail_price: "",
          supplier_id: "",
          category_id: "",
          description: "",
          low_level: "",
          barcode: "",
          amount: "",
          status: "",
          markup: "",
          unit: "",
          SKU: "",
        });
        setLoading(false);
        const result = response.data;
        const { message } = result;
        getProducts();
        setViewProductModel(false);
        setUpdateDataModel(false);
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

  const handleDelete = (e) => {
    e.preventDefault();
    const url = `product/${id}`;
    setLoading(true);
    axiosRequest
      .put(url, { isDeleted: "true" })
      .then((response) => {
        setLoading(false);
        getProducts();
        setDeleteDataModel(false);
        setViewProductModel(false);
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

  useEffect(() => {
    getProducts();
    getProductCategories();
    getInventoryByProductId();
    getOrderByProductId();
    getSupplier();
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
                        {RowData?.productname}
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

        {/* ===============Start:: NewCategoryModel ================ */}
        <Fade top>
          <div
            className={`h-screen w-full bg-opacity-30 backdrop-blur-sm lg:mt-0 fixed flex items-center justify-center z-50 ${
              addNewCategoryModel === true ? "block" : "hidden"
            }`}
          >
            <div className="bg-white w-screen shadow-2xl rounded-lg p-4 pb-8 -ml-8">
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
                          Save Category
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

        {/* ===============Start:: NewProductModel ================ */}
        <Fade top>
          <div
            className={`h-screen w-full bg-opacity-30 backdrop-blur-sm lg:mt-0 fixed flex items-center justify-center z-50 ${
              createNewProductModel === true ? "block" : "hidden"
            }`}
          >
            <div className="w-screen shadow-2xl rounded-lg p-4 pb-8 -ml-8">
              <div className="w-full ">
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
                      <h2 className="modal-title text-black font-w600">
                        Add new products
                      </h2>
                    </div>
                  )}
                  <form onSubmit={handlerSubmit}>
                    <div className="modal-body">
                      <div className="row justify-center items-center active show overflow-y-auto h-[65vh]">
                        <div className="col-lg-6">
                          <div className="basic-form ">
                            <div className="custom-card bg-[#fffbfb]">
                              <div className="card-header">
                                <h4 className="card-title">
                                  Product Basic Info
                                </h4>
                              </div>
                              <div className="card-body">
                                <div className="form-row">
                                  <div className="form-group col-md-6">
                                    <label className="text-black font-w600">
                                      Product Name
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder=""
                                      value={formData.productname}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          productname: e.target.value,
                                        })
                                      }
                                      required
                                    />
                                  </div>
                                  <div className="form-group col-md-6">
                                    <label className="text-black font-w600">
                                      Quantity
                                    </label>
                                    <input
                                      type="number"
                                      className="form-control"
                                      value={formData.quantity}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          quantity: e.target.value,
                                        })
                                      }
                                      required
                                    />
                                  </div>
                                  <div className="form-group col-md-6">
                                    <label className="text-black font-w600">
                                      Measurement Unit
                                    </label>
                                    <select
                                      id="inputState"
                                      className="form-control"
                                      value={formData.unit}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          unit: e.target.value,
                                        })
                                      }
                                      required
                                    >
                                      <option value="">Choose...</option>
                                      <option value="package">Package</option>
                                      <option value="box">Box</option>
                                      <option value="L">liters(L)</option>
                                      <option value="net">Net</option>
                                      <option value="number">Number</option>
                                    </select>
                                  </div>
                                  <div className="form-group col-md-6">
                                    <label className="text-black font-w600">
                                      Selling Price
                                    </label>
                                    <input
                                      type="number"
                                      className="form-control"
                                      placeholder=""
                                      value={formData.amount}
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
                                      Category
                                    </label>
                                    <select
                                      id="inputState"
                                      className="form-control"
                                      value={formData.category_id}
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
                                      value={formData.description}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          description: e.target.value,
                                        })
                                      }
                                    ></textarea>
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
                                      Supply price
                                    </label>
                                    <input
                                      type="number"
                                      className="form-control"
                                      value={formData.supply_price}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          supply_price: e.target.value,
                                        })
                                      }
                                      required
                                    />
                                  </div>

                                  <div className="form-group col-md-6">
                                    <label className="text-black font-w600">
                                      Retail price
                                    </label>
                                    <input
                                      type="number"
                                      className="form-control cursor-not-allowed"
                                      disabled
                                      value={formData.amount}
                                      required
                                    />
                                  </div>

                                  {/* <div className="form-group col-md-6">
                                    <div className="form-check">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                      />
                                      <label className="form-check-label">
                                        Enable Retail Sales
                                      </label>
                                    </div>
                                  </div> */}

                                  {/* <div className="form-group col-md-6">
                                    <div className="form-check">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                      />
                                      <label className="form-check-label">
                                        Enable Team member commission
                                      </label>
                                    </div>
                                  </div> */}
                                </div>
                              </div>
                            </div>
                            <div className="custom-card">
                              <div className="card-header">
                                <h4 className="card-title">Inventory Info</h4>
                              </div>
                              <div className="card-body">
                                <div className="form-row">
                                  <div className="form-group col-md-6">
                                    <label className="text-black font-w600">
                                      SKU
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={formData.SKU}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          SKU: e.target.value,
                                        })
                                      }
                                      required
                                    />
                                  </div>
                                  <div className="form-group col-md-6">
                                    <label className="text-black font-w600">
                                      Supplier
                                    </label>
                                    <select
                                      id="inputState"
                                      className="form-control"
                                      value={formData.supplier_id}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          supplier_id: e.target.value,
                                        })
                                      }
                                      required
                                    >
                                      <option value="">Choose...</option>
                                      {Supplier.map((supplier) => (
                                        <option
                                          key={supplier._id}
                                          value={supplier._id}
                                        >
                                          {supplier.suppliername}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                  <div className="form-group col-md-4">
                                    <label className="text-black font-w600">
                                      Current stock quantity
                                    </label>
                                    <input
                                      type="number"
                                      className="form-control"
                                      value={formData.current_quantity}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          current_quantity: e.target.value,
                                        })
                                      }
                                    />
                                  </div>

                                  {/* <div className="form-group col-md-6">
                                    <label className="text-black font-w600">
                                      Low Stock Level
                                    </label>
                                    <input
                                      type="number"
                                      className="form-control"
                                      value={formData.low_level}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          low_level: e.target.value,
                                        })
                                      }
                                    />
                                  </div> */}
                                  <div className="form-group col-md-4">
                                    <label className="text-black font-w600">
                                      Reorder Stock Level
                                    </label>
                                    <input
                                      type="number"
                                      className="form-control"
                                      value={formData.re_order_level}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          re_order_level: e.target.value,
                                        })
                                      }
                                    />
                                  </div>

                                  <div className="form-group col-md-4">
                                    <label className="text-black font-w600">
                                      Low Level
                                    </label>
                                    <input
                                      type="number"
                                      className="form-control"
                                      value={formData.low_level}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          low_level: e.target.value,
                                        })
                                      }
                                    />
                                  </div>


                                  <div className="form-group col-md-12">
                                    <div className="form-check">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                      />
                                      <label className="form-check-label">
                                        Track stock quantity
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
                            Add Product
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
        {/* ===============End:: NewProductModel ================ */}

        {/* ===============Start:: UpdatedModel ================ */}
        <Fade left>
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
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        onClick={(e) => updateModel(e.preventDefault())}
                      >
                        <span>&times;</span>
                      </button>
                      <h2 className="modal-title text-black font-w600">
                        Update products
                      </h2>
                    </div>
                  )}
                  <div className="modal-body">
                    <div className="row justify-center items-center active show overflow-y-auto h-[65vh]">
                      <div className="col-lg-6">
                        <div className="basic-form">
                          <form>
                            <div className="custom-card">
                              <div className="card-header">
                                <h4 className="card-title">
                                  Product Basic Info
                                </h4>
                              </div>
                              <div className="card-body">
                                <div className="form-row">
                                  <div className="form-group col-md-6">
                                    <label className="text-black font-w600">
                                      Product Name
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder=""
                                      defaultValue={formData.productname}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          productname: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="form-group col-md-6">
                                    <label className="text-black font-w600">
                                      Product Barcode
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder=""
                                      defaultValue={formData.barcode}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          barcode: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="form-group col-md-6">
                                    <label className="text-black font-w600">
                                      Measurement Unit
                                    </label>
                                    <select
                                      id="inputState"
                                      className="form-control"
                                      defaultValue={formData.unit}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          unit: e.target.value,
                                        })
                                      }
                                    >
                                      <option selected>Choose...</option>
                                      <option value="L">liters(L)</option>
                                      <option value="Kg">Kilogram(Kg)</option>
                                    </select>
                                  </div>
                                  <div className="form-group col-md-6">
                                    <label className="text-black font-w600">
                                      Amount
                                    </label>
                                    <input
                                      type="number"
                                      className="form-control"
                                      placeholder=""
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
                                      defaultValue={formData.description}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          description: e.target.value,
                                        })
                                      }
                                    ></textarea>
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
                                      Supply price
                                    </label>
                                    <input
                                      type="number"
                                      className="form-control"
                                      defaultValue={formData.supply_price}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          supply_price: e.target.value,
                                        })
                                      }
                                    />
                                  </div>

                                  <div className="form-group col-md-6">
                                    <label className="text-black font-w600">
                                      Retail price
                                    </label>
                                    <input
                                      type="number"
                                      className="form-control"
                                      value={formData.retail_price}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          retail_price: e.target.value,
                                        })
                                      }
                                    />
                                  </div>

                                  <div className="form-group col-md-6">
                                    <div className="form-check">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                      />
                                      <label className="form-check-label">
                                        Enable Retail Sales
                                      </label>
                                    </div>
                                  </div>

                                  <div className="form-group col-md-6">
                                    <div className="form-check">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                      />
                                      <label className="form-check-label">
                                        Enable Team member commission
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="custom-card">
                              <div className="card-header">
                                <h4 className="card-title">Inventory Info</h4>
                              </div>
                              <div className="card-body">
                                <div className="form-row">
                                  <div className="form-group col-md-6">
                                    <label className="text-black font-w600">
                                      SKU
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      defaultValue={formData.SKU}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          SKU: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="form-group col-md-6">
                                    <label className="text-black font-w600">
                                      Supplier
                                    </label>
                                    <select
                                      id="inputState"
                                      className="form-control"
                                      defaultValue={formData.supplier_id}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          supplier_id: e.target.value,
                                        })
                                      }
                                    >
                                      <option selected>Choose...</option>
                                      {Supplier.map((supplier) => (
                                        <option
                                          key={supplier._id}
                                          value={supplier._id}
                                        >
                                          {supplier.suppliername}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                  <div className="form-group col-md-6">
                                    <label className="text-black font-w600">
                                      Current stock quantity
                                    </label>
                                    <input
                                      type="number"
                                      className="form-control"
                                      defaultValue={formData.current_quantity}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          current_quantity: e.target.value,
                                        })
                                      }
                                    />
                                  </div>

                                  <div className="form-group col-md-6">
                                    <label className="text-black font-w600">
                                      Low Level
                                    </label>
                                    <input
                                      type="number"
                                      className="form-control"
                                      defaultValue={formData.low_level}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          low_level: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="form-group col-md-6">
                                    <label className="text-black font-w600">
                                      Reorder Stock Level
                                    </label>
                                    <input
                                      type="number"
                                      className="form-control"
                                      defaultValue={formData.re_order_level}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          re_order_level: e.target.value,
                                        })
                                      }
                                    />
                                  </div>

                                  <div className="form-group col-md-12">
                                    <div className="form-check">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                      />
                                      <label className="form-check-label">
                                        Track stock quantity
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
                          Update Product
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fade>
        {/* ===============End:: UpdatedModel ================ */}

        {/* ===============Start:: ViewProductModel ================ */}
        <Fade right>
          <div
            className={`h-screen w-full bg-opacity-30 backdrop-blur-sm fixed flex items-center justify-center z-40 ${
              viewProductModel === true ? "block" : "hidden"
            }`}
          >
             <div className="bg-white w-full lg:w-[70vw] shadow-2xl rounded-lg p-4 pb-8 h-screen lg:ml-[15rem] xl:ml-[25rem] overflow-auto">
              <div className="flex justify-end -mt-7">
                <button
                  type="button"
                  className="text-[40px]"
                  data-dismiss="modal"
                  onClick={(e) => ViewModel(e.preventDefault())}
                >
                  <span >&times;</span>
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
                    <div className={`text-center mb-3 ${!isTablet && "mt-3"}`}>
                      {!isTablet && (
                        <div className="profile-photo flex justify-center mx-auto">
                          <img
                            src={Image}
                            width="100"
                            className="img-fluid rounded-circle"
                            alt=""
                          />
                        </div>
                      )}
                      <h3 className="mt-4 mb-1 text-black">
                        {RowData?.category_id?.categoryname}
                      </h3>
                      {!isTablet && (
                        <>
                          <br />
                          <span
                            href="#link"
                            className="badge light badge-primary btn-xs ml-4 mr-3"
                          >
                            {RowData?.quantity + " " + "IN STOCK"}
                          </span>
                          <span
                            href="#link"
                            className="badge light badge-success btn-xs"
                          >
                            10 ORDERED
                          </span>
                          <br />
                          <br />
                        </>
                      )}
                      <div className="mt-4">
                      {permissions.indexOf("edit-product") !== -1 && (
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

                      {permissions.indexOf("delete-product") !== -1 && (
                        <button
                          className="  hover:bg-black hover:text-white btn-white btn-s shadow-none"
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
                      </div>
                    </div>
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
                          onClick={handlerProduct}
                        >
                          Product details
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          className="nav-link"
                          data-toggle="tab"
                          onClick={handlerPurchase}
                        >
                          Purchase orders
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
                      {sales && <SalesHistTabs isTablet={isTablet} />}
                      {purchase && (
                        <Purchase orderData={orderData} isTablet={isTablet} />
                      )}

                      {product && (
                        <ProductDetails
                          RowData={RowData}
                          productData={productData}
                          isTablet={isTablet}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fade>
        {/* ===============End:: ViewProductModel ================ */}

        <div className={`content-body mt-[3rem] ${!isTablet && "ml-52"}`}>
          <div className="container-fluid">
            <div
              className={`relative form-head mb-3 flex items-center justify-between`}
            >
              {!isTablet && (
                <div className="mr-auto d-lg-block">
                  <h3 className="text-black font-w500 mb-6">Products</h3>
                  
                </div>
              )}
              <div className="dropdown custom-dropdown">
                {permissions.indexOf("add-product") !== -1 && (
                  <div
                    className="btn btn-sm btn-primary light d-flex align-items-center svg-btn shadow-none"
                    data-toggle="dropdown"
                    onClick={handleDropDown}
                  >
                    <i className="bi bi-plus-lg"></i>
                    <div className="text-left ml-3">
                      <span className="d-block fs-16">Add</span>
                      <small className="d-block fs-12">
                        Add Category or product
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
                placeholder="Search by Name or Category"
              />
            </div>

            
            <div className="row">
              {isTablet && (
                <div className="mr-auto d-lg-block mb-4">
                  <h2
                    className={`text-black font-w500 mb-6 ${
                      isTablet && "text-lg pl-4"
                    }`}
                  >
                    Products
                  </h2>
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
                      {permissions.indexOf("export-product") !== -1 &&
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
                        )}
                      <div className="card-body">
                        <div className="table-responsive">
                          <table id="table-to-xls" className="display w-full">
                            <thead>
                              <tr className="border-b">
                                <th className="py-6">Name</th>
                                <th className="py-6">
                                  {!isTablet ? "Quantity" : "Qnty"}
                                </th>
                                <th className="py-6">Price(RWF)</th>
                                {!isTablet && (
                                  <th className="py-6">Category</th>
                                )}
                                {permissions.indexOf("view-product") !== -1 && (
                                  <th className="py-6">Action</th>
                                )}
                              </tr>
                            </thead>
                            <tbody>
                              {currentPosts
                                .filter((item) => {
                                  return search.toLowerCase() === ""
                                    ? item
                                    : item.productname
                                        .toLowerCase()
                                        .includes(search) ||
                                        item.category_id.categoryname
                                          .toLowerCase()
                                          .includes(search);
                                })
                                .map((item, index) => (
                                  <tr key={index} className="border-b">
                                    <td className="py-3">{item.productname}</td>
                                    <td className="py-3">{item.quantity}</td>
                                    <td className="py-3">
                                      {parseInt(item?.amount)?.toLocaleString()}
                                    </td>
                                    {!isTablet && (
                                      <td className="py-3">
                                        {item.category_id.categoryname}
                                      </td>
                                    )}
                                    <td className="py-3">
                                      {" "}
                                      {permissions.indexOf("view-product") !==
                                        -1 && (
                                        <button
                                          className="bg-gray-900 hover:bg-[#cf7500] rounded shadow btn-xs sharp mr-1 bell bell-link"
                                          onClick={() => {
                                            ViewModel(
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
                      New Product
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

export default ProductList;
