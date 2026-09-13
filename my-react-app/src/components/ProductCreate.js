import React, { useState } from "react";

// สร้าง app object จำลองการทำงานด้วย fetch เพื่อให้โค้ดเดิมใช้งานได้โดยไม่ต้องใช้ axios
const app = {
    post: function (url, data, config) {
        return fetch("http://localhost:5000/api" + url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(config?.headers || {})
            },
            body: JSON.stringify(data)
        }).then(async function (res) {
            var resData = await res.json();
            if (!res.ok) {
                throw { response: { data: resData } };
            }
            return { data: resData };
        });
    }
};

function ProductCreate() {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState(0);
    const [image_url, setImageUrl] = useState("");
    const [message, setMessage] = useState("");

    function handleSubmit(event) {
        event.preventDefault(); // ป้องกันการ reload หน้า
        var token = localStorage.getItem("token");

        app.post("/products",
            {
                name: name,
                category: category,
                description: description,
                price: price,
                stock: stock,
                image_url: image_url
            },
            {
                headers: { Authorization: "Bearer " + token }
            }
        ).then(function (res) {
            setMessage("สร้างสินค้าสำเร็จ ID: " + res.data.id);
            setName(""); setCategory(""); setDescription("");
            setPrice(""); setStock(0); setImageUrl("");
        }).catch(function (err) {
            setMessage("เกิดข้อผิดพลาด: " + (err.response?.data?.error || "Unknown error"));
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Create Product</h3>
            {message && <p>{message}</p>}
            <input type="text" value={name} onChange={function (e) { setName(e.target.value); }} placeholder="Name" /><br />
            <input type="text" value={category} onChange={function (e) { setCategory(e.target.value); }} placeholder="Category" /><br />
            <textarea value={description} onChange={function (e) { setDescription(e.target.value); }} placeholder="Description"></textarea><br />
            <input type="number" value={price} onChange={function (e) { setPrice(e.target.value); }} placeholder="Price" /><br />
            <input type="number" value={stock} onChange={function (e) { setStock(e.target.value); }} placeholder="Stock" /><br />
            <input type="text" value={image_url} onChange={function (e) { setImageUrl(e.target.value); }} placeholder="Image URL" /><br />
            <button type="submit">Create Product</button>
        </form>
    );
}

export default ProductCreate;