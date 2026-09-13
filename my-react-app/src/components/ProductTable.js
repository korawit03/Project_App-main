import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api";

function ProductTable() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  function loadProducts() {
    const token = localStorage.getItem("token");
    api.get("/api/products", {
      headers: { Authorization: "Bearer " + token }
    }).then((res) => {
      setItems(res.data);
      setLoading(false);
    }).catch((err) => {
      const msg = err?.response?.data?.error || "โหลดรายการสินค้าไม่สำเร็จ";
      setMessage(msg);
      setLoading(false);
    });
  }

  useEffect(() => {
    loadProducts();
  }, []);

  function handleDelete(id) {
    const ok = window.confirm("ต้องการลบสินค้ารายการนี้หรือไม่?");
    if (!ok) return;

    const token = localStorage.getItem("token");
    api.delete("/api/products/" + id, {
      headers: { Authorization: "Bearer " + token }
    }).then((res) => {
      loadProducts();
      alert("ลบสินค้าสำเร็จ (ID: " + res.data.product.id + ")");
    }).catch((err) => {
      const msg = err?.response?.data?.error || "ลบไม่สำเร็จ";
      alert(msg);
    });
  }

  if (loading) return <p>Loading products...</p>;
  if (message) return <p style={{ color: "red" }}>{message}</p>;

  return (
    <div>
      <h3>Products</h3>
      <table border="1" cellPadding="6" cellSpacing="0">
        <thead>
          <tr>
            <th style={{textAlign:"left"}}>ID</th>
            <th style={{textAlign:"left"}}>Name</th>
            <th style={{textAlign:"left"}}>Category</th>
            <th style={{textAlign:"right"}}>Price</th>
            <th style={{textAlign:"right"}}>Stock</th>
            <th style={{textAlign:"center"}}>Action</th>
          </tr>
        </thead>
        <tbody>
          {items && items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td style={{textAlign:"right"}}>{Number(item.price).toFixed(2)}</td>
              <td style={{textAlign:"right"}}>{item.stock}</td>
              <td style={{textAlign:"center"}}>
                <Link to={"/admin/products/" + item.id + "/edit"}>
                  <button>Edit</button>
                </Link>
              </td>
              <td style={{textAlign:"center"}}>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
          {(!items || items.length === 0) && (
            <tr>
              <td colSpan="7">ยังไม่มีสินค้า</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;