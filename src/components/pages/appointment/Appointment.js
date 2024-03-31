/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-concat */
import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import daygridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
// import timeGridPlugin from "@fullcalendar/timegrid";
import "react-datepicker/dist/react-datepicker.css";
import Dashboard from "../../Dashboard";
import Fade from "react-reveal/Fade";
import { axiosRequest, refreshPage } from "../../../api/index";
import { toast, ToastContainer } from "react-toastify";
import LoadingButton from "../../LoadingButton";
import { getUser } from "../../utils/common";
import { useMediaQuery } from "@mui/material";

const Client_URL = "client";
const Service_URL = "service";
const Appointment_URL = "appointment";

const Appointment = () => {
  const [addEventModel, setAddEventModel] = useState(false);
  const [showEventModel, setShowEventModel] = useState(false);
  const [Data, setData] = useState("");
  const [client, setClient] = useState([]);
  const [service, setService] = useState([]);
  const [teamByIdData, setTeamByIdData] = useState([]);
  const [serviceByIdData, setServiceByIdData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apByMemberIdData, setApByMemberIdData] = useState([]);
  const [availableTime, setAvailableTime] = useState([]);
  const serviceDuration = serviceByIdData?.duration;

  const isTablet = useMediaQuery("(max-width: 960px)");

  const user = getUser();
  const findRole = user[0]?.roles[0]?.permissions;
  const permissions = [];
  findRole?.map((item) => permissions.push(item.permissions));

  const showData = [];
  const data = Data || [];
  data.forEach((item) => {
    item?.appointment_status === "PENDING" &&
      showData.push({
        title: item?.telephone?.firstname,
        start: item.start,
        end: item.end,
        barber: item?.teammember?.firstname,
        serviceName: item?.service_id?.servicename,
        backgroundColor: "#cf7500",
      });
  });

  const startTime = [];
  const value = apByMemberIdData || [];
  value?.forEach((item) => {
    startTime.push({
      time: item?.unvaliableTimeStart?.split(" ")[1],
      end: item?.end?.split(" ")[1],
    });
  });

  const [newEvent, setNewEvent] = useState({
    service_id: "",
    teammember: "",
    telephone: "",
    appointment_date: "",
    start_time: "",
  });

  const serviceId = newEvent.service_id;
  const teamMemberId = newEvent.teammember;

  // const [appointmentList, setAppointmentList] = useState([
  //   {
  //     appointment_date: "",
  //     service_id: "",
  //     teammember: "",
  //     duration: "",
  //     start_time: "",
  //   },
  // ]);

  // const handleOrderChange = (e, index) => {
  //   const { name, value } = e.target;
  //   const list = [...appointmentList];
  //   list[index][name] = value;
  //   setAppointmentList(list);
  // };

  // const handleOrderRemove = (index) => {
  //   const list = [...appointmentList];
  //   list.splice(index, 1);
  //   setAppointmentList(list);
  // };

  // const handleOrderAdd = () => {
  //   setAppointmentList([
  //     ...appointmentList,
  //     {
  //       appointment_date: "",
  //       service_id: "",
  //       teammember: "",
  //       duration: "",
  //       start_time: "",
  //     },
  //   ]);
  // };

  const [title, setTitle] = useState("");
  const [barber, setBarber] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [start, setStart] = useState(Date());
  const [end, setEnd] = useState(Date());

  const handleEventClick = (clickInfo) => {
    setTitle(clickInfo.event.title);
    setStart(clickInfo.event.start);
    setEnd(clickInfo.event.end);
    setBarber(clickInfo.event.extendedProps.barber);
    setServiceName(clickInfo.event.extendedProps.serviceName);
    setShowEventModel(true);
  };

  const showDataModel = () => {
    let newState = !showEventModel;
    setShowEventModel(newState);
  };

  const removeModel = (e) => {
    e.preventDefault();
    const newState = !addEventModel;
    setAddEventModel(newState);
  };

  const getClient = () => {
    axiosRequest
      .get(Client_URL)
      .then((response) => {
        const result = response.data.data;
        setClient(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAvailableTime = async () => {
    if (teamMemberId) {
      const url = `appointment/time/${teamMemberId}?appointment_date=${newEvent.appointment_date}`;
      await axiosRequest
        .get(url)
        .then((response) => {
          const result = response.data.data;
          setAvailableTime(result);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  const getTeamMemberByServiceId = async () => {
    if (serviceId) {
      const url = `team/service/${serviceId}`;
      await axiosRequest
        .get(url)
        .then((response) => {
          const result = response.data.data;
          setTeamByIdData(result);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  const getApByMemberId = async () => {
    if (teamMemberId) {
      const url = `appointment/team/${teamMemberId}`;
      await axiosRequest
        .get(url)
        .then((response) => {
          const result = response.data.data;
          setApByMemberIdData(result);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  const getServiceById = async () => {
    const url = `service/${serviceId}`;
    await axiosRequest
      .get(url)
      .then((response) => {
        const result = response.data.data;
        setServiceByIdData(result);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const getService = () => {
    axiosRequest
      .get(Service_URL)
      .then((response) => {
        const result = response.data.data;
        setService(result);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const getAppointment = (date) => {
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

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const url = "appointment";
    setLoading(true);
    await axiosRequest
      .post(url, {
        ...newEvent,
        isNotify: true,
        notification: {
          action: "Appointment",
          role: ["ADMIN_A", "MANAGER_M", "CASHIER_C"],
          message: `Appointment`,
          title: `Appointment`,
        },
      })
      .then((res) => {
        setNewEvent({
          service_id: "",
          teammember: "",
          telephone: "",
          appointment_date: "",
          start_time: "",
        });
        setLoading(false);
        const result = res.data;
        const { message } = result;
        toast.success(message);
        setTimeout(() => {
          refreshPage();
          getAppointment();
        }, 1000);
      })
      .catch((error) => {
        if (error.code === "ERR_BAD_RESPONSE") {
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

  useEffect(() => {
    getAppointment();
    getClient();
    getService();
  }, []);

  useEffect(() => {
    getServiceById();
    getTeamMemberByServiceId();
    getApByMemberId();
  }, [serviceId, teamMemberId]);

  useEffect(() => {
    getAvailableTime();
  }, [teamMemberId, newEvent.appointment_date]);

  return (
    <>
      <ToastContainer />
      <Dashboard>
        {/* =========================== Start::  ScheduleAppointmentModel =========================== */}
        <Fade top>
          <div
            className={`h-screen w-full bg-opacity-30 backdrop-blur-sm lg:mt-0 fixed flex items-center justify-center z-50 ${
              addEventModel === true ? "block" : "hidden"
            }`}
          >
            <div className="bg-white w-screen shadow-2xl rounded-lg p-4 pb-8 -ml-8">
              <div className="w-full">
                <div className="modal-content">
                  {!isTablet && (
                    <div className="modal-header justify-content-center">
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        onClick={removeModel}
                      >
                        <span>&times;</span>
                      </button>
                      <h2 className="modal-title text-black font-w600">
                        Add new Appointment
                      </h2>
                    </div>
                  )}
                  <form onSubmit={handlerSubmit}>
                    <div className="modal-body">
                      <div
                        className={`row justify-center items-center active show overflow-y-auto ${
                          isTablet ? "h-[60vh]" : "h-[65vh]"
                        } scrollbar-hide`}
                      >
                        <div className="col-xl-6 col-lg-12">
                          <div className="basic-form">
                            <div className="custom-card">
                              <div className="card-header">
                                <h4 className="card-title">Client</h4>
                              </div>
                              <div className="card-body">
                                <div className="form-row">
                                  <div className="form-group col-md-12">
                                    <label className="text-black font-w600">
                                      Clients
                                    </label>
                                    <select
                                      id="telephone"
                                      name="telephone"
                                      className="form-control"
                                      required
                                      defaultValue={newEvent.telephone}
                                      onChange={(e) =>
                                        setNewEvent({
                                          ...newEvent,
                                          telephone: e.target.value,
                                        })
                                      }
                                    >
                                      <option value="">Choose...</option>
                                      {client.map((selectedClient) => (
                                        <option
                                          key={selectedClient?._id}
                                          value={selectedClient._id}
                                        >
                                          {selectedClient?.firstname +
                                            " " +
                                            selectedClient?.lastname}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="custom-card">
                              <div className="card-header">
                                <h4 className="card-title">Schedule</h4>
                              </div>
                              <div className="card-body">
                                <div className="form-row">
                                  <div className="form-group col-md-4">
                                    <label className="text-black font-w600">
                                      Date
                                    </label>
                                    <input
                                      type="date"
                                      className="form-control"
                                      defaultValue={newEvent.appointment_date}
                                      onChange={(e) =>
                                        setNewEvent({
                                          ...newEvent,
                                          appointment_date: e.target.value,
                                        })
                                      }
                                      required
                                    />
                                  </div>
                                  <div className="form-group col-md-8">
                                    <label className="text-black font-w600">
                                      Service
                                    </label>
                                    <select
                                      id="service_id"
                                      name="service_id"
                                      className="form-control"
                                      defaultValue={newEvent.service_id}
                                      onChange={(e) =>
                                        setNewEvent({
                                          ...newEvent,
                                          service_id: e.target.value,
                                        })
                                      }
                                      required
                                    >
                                      <option value="">Choose...</option>
                                      {service.map((selectedService) => (
                                        <option
                                          key={selectedService?._id}
                                          value={selectedService._id}
                                        >
                                          {selectedService.servicename}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                  <div className="form-group col-md-12">
                                    <label className="text-black font-w600">
                                      Team member
                                    </label>
                                    <select
                                      id="inputState"
                                      className="form-control"
                                      defaultValue={newEvent.teammember}
                                      onChange={(e) =>
                                        setNewEvent({
                                          ...newEvent,
                                          teammember: e.target.value,
                                        })
                                      }
                                      required
                                    >
                                      <option value="">Choose...</option>
                                      {teamByIdData.map((selectedMember) => (
                                        <option
                                          key={selectedMember?._id}
                                          value={selectedMember._id}
                                        >
                                          {selectedMember?.firstname &&
                                          selectedMember?.lastname
                                            ? `${selectedMember?.firstname} ${selectedMember?.lastname}`
                                            : selectedMember?.firstname ||
                                              selectedMember?.lastname}
                                        </option>
                                      ))}
                                    </select>
                                  </div>

                                  <div className="form-group col-md-6">
                                    <label className="text-black font-w600">
                                      Duration
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control cursor-not-allowed"
                                      disabled
                                      placeholder={
                                        !serviceDuration
                                          ? ""
                                          : serviceDuration + " " + "mins"
                                      }
                                    />
                                  </div>
                                  <div className="form-group col-md-6">
                                    <label className="text-black font-w600">
                                      Time
                                    </label>
                                    <select
                                      id="inputState"
                                      className="form-control"
                                      defaultValue={newEvent.start_time}
                                      onChange={(e) =>
                                        setNewEvent({
                                          ...newEvent,
                                          start_time: e.target.value,
                                        })
                                      }
                                      required
                                    >
                                      <option value="">Choose...</option>
                                      {availableTime.map(
                                        (selectedTime, index) => (
                                          <option
                                            key={index}
                                            value={selectedTime}
                                          >
                                            {selectedTime}
                                          </option>
                                        )
                                      )}
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="custom-card">
                              <div className="card-header">
                                <h4 className="card-title">
                                  Appointment Notes
                                </h4>
                              </div>
                              <div className="card-body">
                                <div className="form-row">
                                  <div className="form-group col-md-12">
                                    <label className="text-black font-w600">
                                      Client Notes
                                    </label>
                                    <textarea
                                      className="form-control"
                                      rows="4"
                                      id="comment"
                                      placeholder=""
                                    ></textarea>
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
                          onClick={removeModel}
                        >
                          Close
                        </button>
                        {!loading ? (
                          <LoadingButton />
                        ) : (
                          <button
                            type="submit"
                            className="bg-[#1b1a17] hover:bg-[#cf7500] p-2.5 text-white font-semibold rounded"
                          >
                            Add Appointment
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
        {/* =========================== End::    ScheduleAppointmentModel =========================== */}

        {/* ====================== Start::  ShowEventModel =============================== */}
        <Fade right>
          <div
            className={`min-h-full w-screen z-50 bg-opacity-30 backdrop-blur-sm fixed flex items-center justify-center px-4 ${
              showEventModel === true ? "block" : "hidden"
            }`}
          >
            <div
              className={`bg-white ${
                isTablet ? "w-full" : "w-[35%]"
              } shadow-2xl rounded-lg p-4`}
            >
              <div className="card-title w-full flex flex-wrap justify-center items-center">
                <h1 className="font-bold text-sm text-center -mb-2 w-11/12">
                  Appointment Details
                </h1>
                <hr className=" bg-primary border-b w-full -mb-6" />
              </div>
              <div className="card-body">
                <form className="-mb-10">
                  <div>
                    <h1 className="text-base mb-1">
                      <strong>Barber Name : </strong>
                      {barber}{" "}
                    </h1>
                    <h2 className="text-base mb-1">
                      <strong>Client Name : </strong> {title}{" "}
                    </h2>
                    <h3 className="text-base mb-1">
                      <strong>Service : </strong> {serviceName}{" "}
                    </h3>
                    <label className="mr-2">From:</label>
                    <input
                      type="text"
                      className="rounded w-20 px-2 py-1 bg-transparent border border-gray-200 mr-5 cursor-not-allowed"
                      placeholder={start.toString().split(" ")[4]}
                      disabled
                    />
                    <label className="mr-2">To:</label>
                    <input
                      type="text"
                      className="cursor-not-allowed rounded w-20 px-2 py-1 bg-transparent border border-gray-200"
                      placeholder={end.toString().split(" ")[4]}
                      disabled
                    />
                  </div>
                  <div className="w-full flex justify-center mt-2">
                    <button
                      className="btn btn-danger light shadow-none "
                      onClick={(e) => showDataModel(e.preventDefault())}
                    >
                      Back
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Fade>
        {/* =========================== End::  ShowEventModel =============================== */}

        <div
          className={`relative pt-10  md:px-40 md:pl-80 pb-20  text-black mt-[4rem] ${
            !isTablet && "ml-52 w-4/5 px-4 min-h-screen"
          }`}
        >
          {permissions.indexOf("add-appointment") !== -1 && (
            <button
              className="absolute right-6 btn btn-sm btn-primary light d-flex align-items-center svg-btn shadow-none"
              onClick={removeModel}
            >
              <span className="fs-16 ">make Appointment</span>
            </button>
          )}

          <div className="mt-14">
            <FullCalendar
              headerToolbar={{
                start: "today prev next",
                end: isTablet
                  ? ""
                  : "dayGridMonth dayGridWeek dayGridDay listWeek",
              }}
              editable={true}
              selectable={true}
              selectMirror={true}
              events={showData}
              plugins={[daygridPlugin, interactionPlugin, listPlugin]}
              views={["dayGridMonth", "dayGridWeek", "dayGridDay"]}
              eventClick={handleEventClick}
              eventAdd={(e) => handlerSubmit(e)}
              datesSet={(date) => getAppointment(date)}
              contentHeight={"460px"}
            />
          </div>
        </div>
      </Dashboard>
    </>
  );
};

export default Appointment;
