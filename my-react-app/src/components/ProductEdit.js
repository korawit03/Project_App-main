import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

function ProductEdit() {
    const { id: productId } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState(0);
    const [image_url, setImageUrl] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        api.get("/api/products/" + productId, {
            headers: { Authorization: "Bearer " + token }
        }).then((res) => {
            const p = res.data;
            setName(p.name || "");
            setCategory(p.category || "");
            setDescription(p.description || "");
            setPrice(p.price || "");
            setStock(p.stock || 0);
            setImageUrl(p.image_url || "");
            setLoading(false);
        }).catch(() => {
            setMessage("โหลดข้อมูลไม่สำเร็จ");
            setLoading(false);
        });
    }, [productId]);

    function handleSubmit(e) {
        e.preventDefault();
        if (!name || !category || price === "") {
            setMessage("กรุณากรอก name, category และ price");
            return;
        }
        const token = localStorage.getItem("token");
        api.put("/api/products/" + productId,
            { name, category, description, price, stock, image_url },
            { headers: { Authorization: "Bearer " + token } }
        ).then((res) => {
            setMessage("อัปเดตสำเร็จ (ID: " + res.data.id + ")");
            navigate("/admin/products");
        }).catch((err) => {
            const msg = err?.response?.data?.error || "บันทึกไม่สำเร็จ";
            setMessage(msg);
        });
    }

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h3>Edit Product (ID: {productId})</h3>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" /><br />
                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" /><br />
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description"></textarea><br />
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" /><br />
                <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} placeholder="Stock" /><br />
                <input type="text" value={image_url} onChange={(e) => setImageUrl(e.target.value)} placeholder="Image URL" /><br />
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
}

export default ProductEdit;