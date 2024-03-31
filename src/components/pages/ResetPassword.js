import React, { useState } from "react";
import { FaArrowCircleLeft, FaRegEye } from "react-icons/fa";
import { FiEyeOff } from "react-icons/fi";
import { MdLockOutline } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { axiosRequest, refreshPage } from "../../api";
import LoadingButton from "../LoadingButton";

const ResetPassword = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const tooglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const userId = window.location.href.split("/")[5];
  const Token = window.location.href.split("/")[6];
  
  const handlResetPassword = (e) => {
    e.preventDefault();
    const url = `team/reset/password/${userId}/${Token}`;
    setLoading(true);
    axiosRequest
      .post(url, { password })
      .then((response) => {
        setLoading(false);
        const result = response.data;
        const { message } = result;
        toast.success(message);
        if (message === "Password has changed, login now") {
          setTimeout(() => {
            navigate("/");
          }, 1500);
        }
      })
      .catch((error) => {
        setLoading(true);
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

  return (
    <>
      <ToastContainer />
      <div className="bg-gray-20">
        <div className="container mx-auto">
          <div className="py-2 text-gray-900">
            <Link to="/" className="text-2xl text-gray-900 ">
              <FaArrowCircleLeft />
            </Link>
          </div>
          <div className="flex justify-center items-center px-6">
            <div className="w-full xl:w-3/4 lg:w-11/12 flex justify-center items-center">
              <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none shadow">
                <div className="px-8 mb-4 text-center">
                  <h3 className="pt-4 mb-2 text-2xl font-bold font-lexend">
                    Change your Password
                  </h3>
                  <p className="mb-4 text-sm font-bold text-gray-700 font-sans">
                    We're here to help you reset your password!
                  </p>
                </div>
                <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded font-bold font-josefin">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="email"
                  >
                    New Password
                  </label>
                  <div className="bg-white w-full p-2 shadow flex items-center rounded mb-2  ">
                    <MdLockOutline className="text-gray-400 mr-2 " />
                    <input
                      placeholder="Password"
                      type={passwordShown ? "text" : "password"}
                      className="bg-white outline-none  text-sm flex-1 text-gray-400"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="text-gray-400 cursor-pointer onClick= {()=> handleShowPassword}">
                      {passwordShown ? (
                        <FaRegEye onClick={tooglePassword} />
                      ) : (
                        <FiEyeOff onClick={tooglePassword} />
                      )}
                    </div>
                  </div>

                  <div className="my-6 text-center">
                    {!loading ? (
                      <LoadingButton />
                    ) : (
                      <button
                        className="w-full px-2 py-2 font-bold text-gray-900 border bg-transparent rounded-full focus:outline-none"
                        onClick={handlResetPassword}
                      >
                        Confirm
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
