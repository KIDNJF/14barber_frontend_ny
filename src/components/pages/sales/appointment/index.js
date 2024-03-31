/* eslint-disable jsx-a11y/scope */
import { Button, notification } from "antd";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  addToCartRequestActions,
  getOneCartRequestActions,
} from "../../../../store/cart/actions";
import { useDispatch } from "react-redux";

const Appointment = ({ appointmentData }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const { cartId } = useParams();
  const dispatch = useDispatch();

  const handleCheckboxChange = (event, item) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedItem(item);
    } else if (selectedItem === item) {
      setSelectedItem(null);
    }
  };

  const addToCart = async (item) => {
    await addToCartRequestActions(cartId, {
      servicesToAdd: [item?.service_id?._id],
      hasAppointment: [
        {
          appointmentId: item?._id,
          serviceId: item?.service_id?._id,
          teammemberId: item.teammember?._id,
          isFromAppoint: true,
        },
      ],
    })(dispatch);
    notification.success({ message: "Service added to cart" });
    await getOneCartRequestActions(cartId)(dispatch);
  };

  //console.log("kiddd",item.teammember);

  return (
    <div className="appointments">
      {appointmentData.map((item) => (
        <div className="card card-border appointment">
          <div key={item._id} className="card-body relative">
            <div scope="row">
              <input
                onChange={(event) => handleCheckboxChange(event, item)}
                type="checkbox"
                checked={selectedItem === item}
                className="absolute right-3 top-2 cursor-pointer"
              />
            </div>
            <div className="row">
              <div className="col-md-3">
                <ul className="fs-14 list-inline">
                  <li>{item.appointment_date.split("T")[0]}</li>
                </ul>
                <small className="text-primary font-w500 mb-3">
                  {"Barber: " + item.teammember?.firstname}
                </small>
                <span className="text-secondary mr-2 fo"></span>
              </div>
              <span className="vertical-line"></span>
              <div className="col-md-6 client-name">
                <h5 className="mt-0 mb-1 text-black client">
                  {item?.telephone?.firstname +
                    " " +
                    item?.telephone?.firstname}
                </h5>
                <ul className="fs-14 list-inline">
                  <li>{item?.service_id?.servicename}</li>
                </ul>
              </div>
              <div className="col-md-2">
                <h4 className=" mt-3 text-black">{item?.service_id?.amount}</h4>
              </div>
              {selectedItem === item && (
                <div className="mt-4 flex">
                  <Button onClick={() => addToCart(item)}>Add to cart</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Appointment;
