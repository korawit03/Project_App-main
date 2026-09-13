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
    <div>
      <h3>Products</h3>
      <table border="1" cellPadding="6" cellSpacing="0">
        <thead>
          <tr>
            <th style={{ textAlign: "left" }}>ID</th>
            <th style={{ textAlign: "left" }}>Name</th>
            <th style={{ textAlign: "left" }}>Category</th>
            <th style={{ textAlign: "right" }}>Price</th>
            <th style={{ textAlign: "right" }}>Stock</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {items && items.map(function (item) {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td style={{ textAlign: "right" }}>{Number(item.price).toFixed(2)}</td>
                <td style={{ textAlign: "right" }}>{item.stock}</td>
                <td style={{ textAlign: "center" }}>
                  <Link to={"/admin/products/" + item.id + "/edit"}>
                    <button>Edit</button>
                  </Link>
                </td>
              </tr>
            );
          })}
          {(!items || items.length === 0) && (
            <tr>
              <td colSpan="6">ยังไม่มีสินค้า</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;