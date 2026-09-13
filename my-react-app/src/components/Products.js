import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        fetch("http://localhost:5000/api/products", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                if (response.status === 401 || response.status === 403) {
                    localStorage.removeItem("token");
                    navigate("/login");
                    return null;
                }
                return response.json();
            })
            .then((data) => {
                setProducts(data);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);
    if (loading) {
        return <p>Loading products...</p>;
    }
    if (error) {
        return <p>{error}</p>;
    }
    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">
                Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="border rounded-lg p-4 shadow"
                    >
                        <h3 className="text-xl font-bold">
                            {product.name}
                        </h3>
                        <p className="text-green-600 font-semibold">
                            {product.price} Baht
                        </p>
                        <Link
                            to={`/products/${product.id}`}
                            className="text-blue-500"
                        >
                            View Detail
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}