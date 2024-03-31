import React from "react";
import SidebarItem from "./SidebarItem";
import items from "../utils/sidebar.json";
import "../dashboard.css";
import Image from "../../assets/images/14logo.jpeg";
import { Link } from "react-router-dom";
import { getUser } from "../utils/common";
import { useMediaQuery } from "@mui/material";

const Sidebar = () => {
  const user = getUser();
  const findType = user[0]?.type;

  const isTablet = useMediaQuery("(max-width: 960px)");

  let data = [];
  for (let i = 0; i < items.length; i++) {
    for (let j = 0; j < items[i]?.role?.length; j++) {
      if (items[i].role[j] === findType) {
        data.push(items[i]);
      }
    }
  }

  return (
    <div
      className={`${
        isTablet ? "w-[80px]" : "w-[200px]"
      } sidebar bg-black fixed z-20`}
    >
      <div className="flex items-left justify-left">
        <Link to="/boards" className="brand-logo">
          <img className="logo-abbr h-8 mt-6 mb-6 pl-4" src={Image} alt="" />
        </Link>
      </div>
      {data.map((item, index) => (
        <SidebarItem key={index} item={item} />
      ))}
    </div>
  );
};
export default Sidebar;
