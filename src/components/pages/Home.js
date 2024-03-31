import React, { useState, useEffect } from "react";
import Dashboard from "../Dashboard";
import Flip from "react-reveal/Flip";
import TopEmployeeForm from "../homeComponents/TopEmployeeForm";
import TopServiceForm from "../homeComponents/TopServiceForm";
import AppointmentList from "../homeComponents/AppointmentList";
import AppointmentSummary from "../homeComponents/AppointmentSummary";
import AppointmentStatus from "../homeComponents/AppointmentStatus";
import Graph from "../homeComponents/Graph";
import { axiosRequest } from "../../api";
import { getUser } from "../utils/common";
import { useMediaQuery } from "@mui/material";

const Appointment_URL = "appointment";
const AppointPending_URL = "appointment/pending";
const AppointCompleted_URL = "appointment/completed";
const AppointCancelled_URL = "appointment/cancelled";
const Sales_URL = "sales";

const Home = () => {
  const [mAppointment, setMAppointment] = useState(false);
  const [tAppointment, setTAppointment] = useState(true);
  const [Data, setData] = useState([]);
  const [pending, setPending] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [cancelled, setCancelled] = useState([]);
  const [salesData, setSalesData] = useState([]);

  const isTablet = useMediaQuery("(max-width: 960px)");

  const user = getUser();
  const findRole = user[0]?.roles[0]?.permissions;
  const permissions = [];
  findRole?.map((item) => permissions.push(item.permissions));

  const handlerTAppointment = () => {
    setTAppointment(true);
    setMAppointment(false);
  };

  const handlerMAppointment = () => {
    setTAppointment(false);
    setMAppointment(true);
  };

  const chartData = [];
  salesData.forEach((item) => {
    chartData.push({
      amount: item.total,
      date: item.createdAt.split("T")[0],
      id: item._id,
    });
  });

  const getSales = () => {
    axiosRequest
      .get(Sales_URL)
      .then((res) => {
        const response = res.data.data;
        const result = response.filter(
          (element) => element.status === "COMPLETED"
        );
        setSalesData(result);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const getAppointment = () => {
    axiosRequest
      .get(Appointment_URL)
      .then((response) => {
        const result = response.data.data;
        setData(result);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const getAppointCompleted = () => {
    axiosRequest
      .get(AppointCompleted_URL)
      .then((response) => {
        const result = response.data;
        setCompleted(result);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const getAppointPending = () => {
    axiosRequest
      .get(AppointPending_URL)
      .then((response) => {
        const result = response.data;
        setPending(result);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const getAppointCancelled = () => {
    axiosRequest
      .get(AppointCancelled_URL)
      .then((response) => {
        const result = response.data;
        setCancelled(result);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    getAppointment();
    getAppointCompleted();
    getAppointPending();
    getAppointCancelled();
    getSales();
  }, []);

  return (
    <Dashboard>
      <div className={`content-body mt-[2rem] ${!isTablet && "ml-52"}`}>
        <div className="container-fluid">
        {tAppointment && (
                  <AppointmentStatus
                    onclick={handlerTAppointment}
                    onclicked={handlerMAppointment}
                    appointLength={Data.length}
                    completed={completed.Length}
                    pending={pending.Length}
                    cancelled={cancelled.Length}
                    completedPercent={completed.percentage}
                    pendingPercent={pending.percentage}
                    cancelledPercent={cancelled.percentage}
                  />
                )}
          <div className="row mt-8">
         <Graph chartData={chartData} isTablet={isTablet} />
          </div>
          <div className="row">
            <TopEmployeeForm salesData={salesData} isTablet={isTablet} />
            <TopServiceForm salesData={salesData} isTablet={isTablet} />
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default Home;
