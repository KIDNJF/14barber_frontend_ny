import React, { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";
import { Button, Input, Table, notification } from "antd";
import { getAllInventoryRequestAction } from "../../../../store/inventory/actions";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCartRequestActions,
  getOneCartRequestActions,
} from "../../../../store/cart/actions";
import { useParams } from "react-router-dom";

const Products = () => {
  const isTablet = useMediaQuery("(max-width: 960px)");
  const { inventory } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [selectedRowKey, setSelectedRowKey] = useState(null);
  const [quatity, setQuatity] = useState("");

  const { cartId } = useParams();

  const columns = [
    {
      title: "Products",
      dataIndex: "productname",
    },
    {
      title: "Unit Price (RWF)",
      dataIndex: "price",
    },
    {
      title: "Available Quantity",
      dataIndex: "qnty",
      render: (text, record) => (
        <p>{`${text} ${record?.data?.product?.unit}`}</p>
      ),
    },
    {
      title: "Quantity to be sold",
      dataIndex: "soldQnty",
      width: 100,
      render: (text, record) => (
        <Input
          type="number"
          disabled={selectedRowKey !== record.key}
          onChange={(e) => handleQuantityChange(e, record.key)}
          value={selectedRowKey === record.key && quatity}
        />
      ),
    },
    {
      title: "",
      dataIndex: "action",
      render: (text, record) => (
        <Button
          onClick={() => addToCart(record)}
          disabled={
            (quatity === "" && selectedRowKey === record.key) ||
            selectedRowKey !== record.key
          }
        >
          Add to cart
        </Button>
      ),
    },
  ];

  const handleQuantityChange = (e, key) => {
    setQuatity(e.target.value);
  };

  const addToCart = async (record) => {
    if (cartId) {
      await addToCartRequestActions(cartId, {
        productsToAdd: [{ productId: record?.key, quantity: quatity }],
      })(dispatch);
      if (true) {
        notification.success({ message: "Product added to cart" });
      }
      getOneCartRequestActions(cartId)(dispatch);
    } else {
      notification.success({ message: "Cart not found" });
    }
  };

  const handleRowSelection = (record) => {
    setQuatity("");
    if (selectedRowKey === record.key) {
      setSelectedRowKey(null);
    } else {
      setSelectedRowKey(record.key);
    }
  };

  useEffect(() => {
    getAllInventoryRequestAction("?")(dispatch);
  }, []);

  const dataToDisplay = inventory?.all?.data.map((d) => {
    return {
      key: d?.product?._id,
      productname: d?.product?.productname,
      qnty: d?.quantity,
      price: parseInt(d?.product?.amount)?.toLocaleString(),
      data: d,
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

export default Products;
