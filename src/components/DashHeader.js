import React, { useState, useRef } from "react";
import SidebarItem from "./sidebar/SidebarItem";
import { Fade } from "react-reveal";
import { Link, useNavigate } from "react-router-dom";
import items from "./utils/sidebar.json";
import DashSideBar from "./sidebar/Sidebar";
import { FiEyeOff } from "react-icons/fi";
import { MdLockOutline } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { removeUserSession, getUser } from "./utils/common";
import { axiosRequest, refreshPage } from "../api";
import { toast, ToastContainer } from "react-toastify";
import LoadingButton from "./LoadingButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useMediaQuery } from "@mui/material";
import userProfile from "../assets/images/user_profile.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
const DashHeader = () => {
  const [changePassModel, setChangePassModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [menu, setMenu] = useState(false);
  const handleClick = () => setMenu(!menu);
  const [open, setOpen] = useState(false);
  const handleDropDown = () => setOpen(!open);
  const [userId, setUserId] = useState();
  const navigate = useNavigate();
  const myRef = useRef();

  const handleOpenMenu = () => setOpenMenu(!openMenu);
  const isTablet = useMediaQuery("(max-width: 960px)");

  const tooglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const user = getUser();
  const userName = user[0].firstname;
  const userEmail = user[0].email;

  const changePasswordModel = () => {
    let newState = !changePassModel;
    setChangePassModel(newState);
  };

  const handlerLogOut = () => {
    removeUserSession();
    navigate("/");
  };

  const handlerFullScreen = () => {
    const fullScreenElement =
      document.fullscreenElement || document.webkitFullscreenElement;
    if (!fullScreenElement) {
      if (myRef.current.requestFullscreen) {
        myRef.current.requestFullscreen();
      } else if (myRef.current.webkitRequestFullscreen) {
        myRef.current.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  };

  const handleChangePass = (e) => {
    e.preventDefault();
    const url = `team/change/password/${userId}`;
    setLoading(true);
    axiosRequest
      .put(url, {
        password,
        confirmPassword,
      })
      .then((response) => {
        setPassword("");
        setConfirmPassword("");
        setLoading(false);
        const result = response.data;
        const { message } = result;
        toast.success(message);
        setChangePassModel(false);
        setTimeout(() => {
          if (message === "Password Changed successful") {
            handlerLogOut();
          }
        }, 2000);
      })
      .catch((error) => {
        setLoading(false);
        if (error.code === "ERR_BAD_REQUEST") {
          toast.error(error.response.data.message);
        } else {
          toast.info(error.message);
          setTimeout(() => {
            setLoading(false);
            refreshPage();
          }, 2000);
        }
      });
  };

  const findType = user[0]?.type;

  let data = [];
  for (let i = 0; i < items.length; i++) {
    for (let j = 0; j < items[i]?.role?.length; j++) {
      if (items[i].role[j] === findType) {
        data.push(items[i]);
      }
    }
  }

  return (
    <>
      <ToastContainer />
      {/* ====================== Start::  ChangePasswordModel =============================== */}
      <Fade right>
        <div
          className={`min-h-full w-screen z-50 bg-opacity-30 backdrop-blur-sm fixed flex items-center justify-center px-4 ${
            changePassModel === true ? "block" : "hidden"
          }`}
        >
          <div
            className={`bg-white ${
              isTablet ? "w-full" : "w-1/2"
            } shadow-2xl rounded-lg p-4 pb-8`}
          >
            <div className="card-title w-full flex  flex-wrap justify-center items-center  ">
              <h1 className="font-bold text-sm text-center w-11/12">
                Do you really want to change Passward?
              </h1>
              <hr className=" bg-primary border-b w-full" />
            </div>
            <div className="card-body">
              <form>
                <div className="flex flex-wrap">
                  <div className="bg-gray-100 w-64 p-2 flex items-center rounded mb-6 mr-2">
                    <MdLockOutline className="text-gray-400 mr-2 " />
                    <input
                      placeholder="Enter New Password"
                      type={passwordShown ? "text" : "password"}
                      className="bg-gray-100 outline-none text-sm flex-1 text-gray-400"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                    <div className="text-gray-400 cursor-pointer onClick= {()=> handleShowPassword}">
                      {passwordShown ? (
                        <FaRegEye onClick={tooglePassword} />
                      ) : (
                        <FiEyeOff onClick={tooglePassword} />
                      )}
                    </div>
                  </div>
                  <div className="bg-gray-100 w-64 p-2 flex items-center rounded mb-6 ml-2">
                    <MdLockOutline className="text-gray-400 mr-2 " />
                    <input
                      placeholder="Confirm Password"
                      type={passwordShown ? "text" : "password"}
                      className="bg-gray-100 outline-none text-sm flex-1 text-gray-400"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                      }}
                    />
                    <div className="text-gray-400 cursor-pointer onClick= {()=> handleShowPassword}">
                      {passwordShown ? (
                        <FaRegEye onClick={tooglePassword} />
                      ) : (
                        <FiEyeOff onClick={tooglePassword} />
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-full flex justify-between">
                  <button
                    className="btn btn-danger light shadow-none"
                    onClick={(e) => changePasswordModel(e.preventDefault())}
                  >
                    Cancel
                  </button>
                  {loading ? (
                    <LoadingButton />
                  ) : (
                    <button
                      className="btn btn-outline-danger btn-s shadow-none"
                      onClick={handleChangePass}
                    >
                      Confirm
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </Fade>
      {/* =========================== End::  ChangePasswordModel =============================== */}

      <div className="z-20">
        <nav className="bg-white w-full px-6 py-1 fixed border-b shadow-transparent z-20">
          <div
            className={`flex ${
              isTablet ? "justify-between" : "flex-wrap justify-end"
            } items-center mx-auto max-w-screen-2xl`}
          >
            {/* <Link to="/" className="flex items-center">
              <div className="mr-2">
                <span className="bi bi-filter-right"></span>
              </div>
            </Link> */}
            {isTablet && (
              <div className="flex flex-start justify-start">
                <MenuIcon className="text-black" onClick={handleOpenMenu} />
              </div>
            )}
            <div className="flex items-center lg:order-2">
              <div className="flex flex-shrink-0 items-center my-auto space-x-4">
                <ul className="flex justify-center items-center">
                  <li className="nav-item dropdown notification_dropdown">
                    <a className="nav-link dz-fullscreen" href="#link">
                      
                    </a>
                  </li>
                  {/* <li className="nav-item dropdown notification_dropdown mr-6">
                    <a
                      className="nav-link ai-icon warning bg-[#eeb974] rounded-sm"
                      href="#link"
                      role="button"
                      data-toggle="dropdown"
                    >
                      <i className="fa-regular fa-bell"></i>
                      <div className="pulse-css"></div>
                    </a>
                  </li> */}
                </ul>
              <div className="row items-center" style={{ borderRadius:'20px', padding:'5px'}}>
                  <div style={{ padding:'5px'}}>
                   <p className="text-black " style={{ fontWeight: 'bold', fontSize: '14px' }}>Hi, {userName}</p>
                  </div>
                  <div style={{ borderWidth:1, borderRadius:'50px', borderColor:"#eeb974", marginLeft:"10px", justifyContent:'end'}}>
                 <img className='rounded-full w-8 h-8  border-2 border-[#eeb974]' src={userProfile} alt="User profile" c onClick={handleDropDown} />
                 </div>
                </div>              
              </div>
            </div>
            <div
              className={`${
                open ? "block" : "hidden"
              } absolute right-5 mt-60  w-[15rem] rounded-lg shadow-lg border bg-white z-50`}
              onClick={handleDropDown}
            >
              <ul className="space-y-3 p-2">
                <li className="font-medium">
                  <span
                    href="#link"
                    className="flex w-full justify-start items-center text-[14px] text-gray-800 hover:text-white hover:bg-black p-2 rounded-md transition duration-150 ease-in-out"
                  >
                    {userEmail}
                  </span>
                </li>
                {/* <li className="font-medium">
                  <a
                    href="#link"
                   className="flex w-full justify-start items-center text-[14px] text-gray-800 hover:text-white hover:bg-black p-2 rounded-md transition duration-150 ease-in-out"
                  >
                    <div className="mr-2">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        ></path>
                      </svg>
                    </div>
                    Update Profile
                  </a>
                </li> */}
               
                <li className="font-medium">
                  <button
                   className="flex w-full justify-start items-center text-[14px] text-gray-800 hover:text-white hover:bg-black p-2 rounded-md transition duration-150 ease-in-out"
                    onClick={() => {
                      changePasswordModel(setUserId(user[0]._id));
                    }}
                  >
                    Change Password
                  </button>
                </li>
               
                <li className="font-medium ">
                  <button
                    className="flex w-full justify-start items-center text-[14px] text-gray-800 hover:text-white hover:bg-black p-2 rounded-md transition duration-150 ease-in-out"
                    onClick={handlerLogOut}
                  >
                  
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <ul
            onClick={handleClick}
            className={!menu ? "hidden" : "bg-white cursor-pointer lg:hidden"}
          >
            <DashSideBar className="flex pt-4 h-[92%]" />
          </ul>
        </nav>
        <ul
          className={
            !openMenu
              ? "hidden"
              : "absolute bg-white w-full border-b-4 translate-x-3 justify-end px-8 mt-20 pb-4 font-poppins right-0 z-10 transition-all duration-500 ease-in lg:hidden"
          }
        >
          {data.map((item, index) => (
            <SidebarItem key={index} item={item} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default DashHeader;
