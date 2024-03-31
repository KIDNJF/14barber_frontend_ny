import React from "react";
import { useMediaQuery } from "@mui/material";
import { useEffect } from "react";
import { getAllServiceRequestAction } from "../../../../store/services/actions";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table, notification } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  addToCartRequestActions,
  getOneCartRequestActions,
} from "../../../../store/cart/actions";

const Services = () => {
  const { service } = useSelector((state) => state);
  const [selectedRowKey, setSelectedRowKey] = useState(null);
  const dispatch = useDispatch();
  const isTablet = useMediaQuery("(max-width: 960px)");
  const { cartId } = useParams();

  useEffect(() => {
    getAllServiceRequestAction("?")(dispatch);
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "servicename",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Price (RWF)",
      dataIndex: "price",
    },
    {
      title: "",
      dataIndex: "action",
      render: (text, record) => (
        <Button
          onClick={() => addToCart(record)}
          disabled={selectedRowKey !== record.key}
        >
          Add to cart
        </Button>
      ),
    },
    
  ];

  const addToCart = async (record) => {
    await addToCartRequestActions(cartId, {
      servicesToAdd: [record?.key],
    })(dispatch);
    notification.success({ message: "Service added to cart" });
    await getOneCartRequestActions(cartId)(dispatch);
  };

  const handleRowSelection = (record) => {
    if (selectedRowKey === record.key) {
      setSelectedRowKey(null);
    } else {
      setSelectedRowKey(record.key);
    }
  };

  const dataToDisplay = service?.all?.data?.map((d) => {
    return {
      key: d?._id,
      servicename: d?.servicename,
      category: d?.category_id?.categoryname,
      price: parseInt(d?.amount)?.toLocaleString(),
    };
  });

  return (
    <div className="card">
      <div className="card-body">
        <div className="table-responsive">
          <Table
            columns={columns}
            dataSource={dataToDisplay}
            rowSelection={{
              selectedRowKey,
              type: "radio",
              onSelect: handleRowSelection,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Services;
