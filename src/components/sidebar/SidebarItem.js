// Importing React, NavLink, and necessary hooks
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { getUser } from "../utils/common";
import { useMediaQuery } from "@mui/material";

const SidebarItem = ({ item }) => {
  const [open, setOpen] = useState(false);
  const isTablet = useMediaQuery("(max-width: 960px)"); // Use this for conditional rendering or classes
  const user = getUser();
  const findType = user[0]?.type;

  let dataChild = [];
  item.childrens?.forEach(child => {
    if (child.role.includes(findType)) {
      dataChild.push(child);
    }
  });

  return (
    <div className={`my-1 ${isTablet ? 'bg-black' : ''}`}> {/* Conditionally applies background color */}
      {item.childrens ? (
        <div>
          <div
            className="flex items-center justify-between px-4 py-2 text-sm text-white cursor-pointer hover:bg-[#f5f1da] hover:text-[#e3b04b]"
            onClick={() => setOpen(!open)}
          >
            <div className="flex flex-grow items-center">
              {item.icon && <i className={`${item.icon} text-sm mr-2`}></i>}
              <span className="flex-grow">{item.title}</span>
            </div>
            <i className={`bi bi-chevron-right transition-transform duration-300 text-sm ${open ? 'rotate-90' : ''}`}></i>
          </div>
          <div className={`pl-4 overflow-hidden transition-max-height duration-700 ease-in-out text-sm ${open ? 'max-h-40' : 'max-h-0'}`}>
            {dataChild.map((child, index) => (
              <NavLink
                key={index}
                to={child.path || "#"}
                className={({ isActive }) =>
                  `block px-4 py-2 text-sm text-white hover:bg-[#f5f1da] hover:text-[#e3b04b]!important ${isActive ? "bg-[#f5f1da] text-[#e3b04b]" : ""}`
                }
              >
                {child.icon && <i className={`${child.icon} text-sm mr-2`}></i>}
                {child.title}
              </NavLink>
            ))}
          </div>
        </div>
      ) : (
        <NavLink
          to={item.path || "#"}
          className={({ isActive }) =>
            `block px-4 py-2 text-sm text-white hover:bg-[#f5f1da] hover:text-[#e3b04b] ${isActive ? "bg-[#f5f1da] text-[#e3b04b]" : ""}`
          }
        >
          {item.icon && <i className={`${item.icon} text-sm mr-2`}></i>}
          {item.title}
        </NavLink>
      )}
    </div>
  );
};

export default SidebarItem;
