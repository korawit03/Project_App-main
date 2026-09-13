import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api";

function ProductTable() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(function () {
    var token = localStorage.getItem("token");

    api.get("api/products", {
      headers: { Authorization: "Bearer " + token }
    })
    .then(function (res) {
      setItems(res.data);
      setLoading(false);
    })
    .catch(function (err) {
      var msg = "โหลดรายการสินค้าไม่สำเร็จ";
      if (err && err.response && err.response.data && err.response.data.error) {
        msg = err.response.data.error;
      }
      setMessage(msg);
      setLoading(false);
    });
  }, []); // โหลดครั้งแรกเมื่อ component mount

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (message) {
    return <p style={{ color: "red" }}>{message}</p>;
  }

  return (
    <>
      {/* JSX next slide */}
    </>
  );
}

export default ProductTable;