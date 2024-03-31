import React, { useEffect, useState } from "react";
import Dashboard from "../../Dashboard";
import Zoom from "react-reveal/Fade";
import { axiosRequest } from "../../../api/index";
import "./index.css";
import Invoice from "./invoice";
import Appointment from "./appointment";
import Services from "./service";
import Products from "./product";
import { useMediaQuery } from "@mui/material";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneCartRequestActions } from "../../../store/cart/actions";

const Appointment_URL = "appointment";

const NewSales = () => {
  const [openTab, setOpenTab] = useState("Checkout");
  const tabs = ["Checkout", "Products"];
  const [appointmentData, setAppointmentData] = useState([]);
  const isTablet = useMediaQuery("(max-width: 960px)");
  const dispatch = useDispatch();
  const { cartId } = useParams();

  useEffect(() => {
    getOneCartRequestActions(cartId)(dispatch);
  }, [cartId, dispatch]);

  const getAppointment = () => {
    axiosRequest
      .get(Appointment_URL)
      .then((res) => {
        const response = res.data.data;
        const result = response.filter(
          (element) => element.appointment_status === "PENDING"
        );
        setAppointmentData(result);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    getAppointment();
  }, []);

  return (
    <Dashboard>
      <div className={`content-body mt-[4rem] ${!isTablet && "ml-52"}`}>
        <div className="container-fluid">
          <div
            className={`relative form-head ${
              !isTablet && "mb-3"
            } flex items-center justify-between`}
          >
            <div className="mr-auto d-lg-block">
              <h2 className="text-black font-w600 mb-0">New Sale</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <div className="custom-tab-1">
                <ul className="nav nav-tabs">
                  {tabs.map((tab) => (
                    <li key={tab} className="nav-item">
                      <a
                        className="nav-link"
                        data-toggle="tab"
                        href="#checkout"
                        onClick={(e) => {
                          e.preventDefault();
                          setOpenTab(`${tab}`);
                        }}
                      >
                        {" "}
                        {tab}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="row">
            <div className="col-xl-7 col-xxl-7 col-lg-12 col-md-12">
              <div className="row">
                <div className="col-12">
                  <div className="tab-content">
                    <div
                      className={
                        openTab === "Checkout"
                          ? `block overflow-y-auto show active ${
                              isTablet ? "h-fit" : "h-[82vh]"
                            } tab-pane`
                          : "hidden"
                      }
                      id="checkout"
                      role="tabpanel"
                    >
                      <Appointment appointmentData={appointmentData} />
                    </div>

                    <div
                      className={
                        openTab === "Products"
                          ? `block overflow-y-auto show active ${
                              isTablet ? "h-fit" : "h-[90vh]"
                            } tab-pane`
                          : "hidden"
                      }
                      id="product"
                    >
                      <Zoom>
                        <Products />
                      </Zoom>
                    </div>

                    <div
                      className={
                        openTab === "Services"
                          ? `block overflow-y-auto show active ${
                              isTablet ? "h-fit" : "h-[82vh]"
                            } tab-pane`
                          : "hidden"
                      }
                      id="services"
                    >
                      <Zoom>
                        <Services />
                      </Zoom>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-5 col-xxl-5 col-lg-12 col-md-12">
              <div className="row">
                <div className="col-xl-12 col-lg-6 ">
                  <Invoice isTablet={isTablet} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default NewSales;
