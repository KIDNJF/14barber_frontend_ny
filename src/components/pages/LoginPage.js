import { Row, Checkbox, notification } from "antd";
import React, { useState, useEffect } from "react";
import Logo from "../../assets/images/14barber.png";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { axiosRequest } from "../../api";
import { setUserSession } from "../utils/common";
import Fade from "react-reveal/Fade";
import LoadingButton from "../LoadingButton";

import styles from "./Home.module.css";

const Login_URL = "team/login";

export default function App() {
  const [showPassword, setShowPassword] = useState(false);

  const [askAdminPermissionModel, setAskAdminPermissionModel] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const adminPermission = () => {
    let newState = !askAdminPermissionModel;
    setAskAdminPermissionModel(newState);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axiosRequest
      .post(Login_URL, {
        email: email,
        password: password,
      })
      .then((res) => {
        setLoading(false);
        const result = res.data;
        const { message } = result;
        toast.success(message);
        setUserSession(res.data.token, res.data.user);
        setTimeout(() => {
          navigate("/boards");
        }, 2000);
      })
      .catch((error) => {
        const errMsg = error.response.data.message;
        toast.error(errMsg);
      });
  };

  return (
    <>
      <ToastContainer />
      {/* ====================== Start::  AskAdminPermissionModel =============================== */}
      <Fade right>
        <div
          className={`min-h-full w-screen z-50 bg-opacity-30 backdrop-blur-sm fixed flex items-center justify-center px-4 ${
            askAdminPermissionModel === true ? "block" : "hidden"
          }`}
        >
          <div className="bg-white w-1/2 shadow-2xl rounded-lg p-4">
            <div className="card-title w-full flex  flex-wrap justify-center items-center  ">
              <h1 className="font-bold text-sm text-center w-11/12">
                Request admin permission
              </h1>
              <hr className=" bg-primary border-b w-full -mb-6" />
            </div>
            <div className="card-body">
              <form className="-mb-10 px-8">
                <div>
                  <h2 className="text-base m-4">
                    If you want to join our Team, Call Admin or Text him{" "}
                  </h2>
                </div>
                <div className="w-full flex justify-between">
                  <button
                    className="btn btn-danger light shadow-none"
                    onClick={(e) => adminPermission(e.preventDefault())}
                  >
                    Back
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Fade>
      {/* =========================== End::  AskAdminPermissionModel =============================== */}

      <div className={styles.container}>
        <div className="w-full font-exo h-full flex items-center justify-center">
          <div className="bg-white py-4 text-black mx-auto flex justify-center items-center flex-1 lg:flex-none lg:w-1/2 flex-col">
            <div className="mx-auto p-4 lg:max-w-xl flex flex-col justify-center space-y-7">
              <img src={Logo} alt="" className="w-24 h-20" />
              <section>
                <div className="font-doublebold text-4xl">
                  Hello Barber heroes, 👋🏿
                </div>
                <div className="text-gray-400 text-xl">
                  Enter the information provided to you
                </div>
              </section>
              <form
                className="space-y-4 md:space-y-6"
                action="#"
                onSubmit={handleLogin}
              >
                <div>
                  <label
                    for="email"
                    className="mb-2 block text-lg font-extrabold "
                  >
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    className="w-full border border-gray-200 bg-white rounded-lg h-10 p-2"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    for="password"
                    className="mb-2 block text-lg font-extrabold "
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="w-full border border-gray-200 bg-white rounded-lg h-10 p-2"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <Link
                      to="/forget"
                      className="text-gray-700 text-sm font-medium hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>
                {!loading ? (
                  <LoadingButton />
                ) : (
                  <button
                    type="submit"
                    className="bg-[#2a2d30] flex py-2 text-white items-center justify-center svg-btn shadow-none w-full mx-auto text-xl"
                  >
                    Sign in
                  </button>
                )}
                <p className="text-sm font-light text-gray-900">
                  Don’t have an account yet?{" "}
                  <button
                    className="text-gray-700 font-medium hover:underline"
                    onClick={adminPermission}
                  >
                    Sign up
                  </button>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
