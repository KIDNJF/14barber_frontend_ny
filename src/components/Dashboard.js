import React from "react";
import DashHeader from "./DashHeader";
import Sidebar from "./sidebar/Sidebar";
import "./dashboard.css";
import { useMediaQuery } from "@mui/material";

const Dashboard = ({ children }) => {
  const isTablet = useMediaQuery("(max-width: 960px)");
  return (
    <div className="dashboard flex ">
      <DashHeader />
      {!isTablet && <Sidebar />}
      <div className="dashboard_content w-full"> {children}</div>
    </div>
  );
};

export default Dashboard;
