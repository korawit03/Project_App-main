import React, { useState, useEffect } from "react";

function Customers() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch("http://localhost:5000/api/customers", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                const result = await response.json();
                if (result.success) {
                    setCustomers(result.data);
                } else {
                    setError("Failed to load customers");
                }
            } catch (err) {
                setError("Error connecting to server");
            } finally {
                setLoading(false);
            }
        };

        fetchCustomers();
    }, []);

    if (loading) return <p className="text-center mt-10 text-slate-500">Loading customers...</p>;
    if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-10">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Customer List</h2>
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <table className="w-full text-left" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
                        <thead className="bg-slate-100 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wide">ID</th>
                                <th className="px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wide">Username</th>
                                <th className="px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wide">Fullname</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {customers.map((c) => (
                                <tr key={c.id} className="hover:bg-slate-50 transition">
                                    <td className="px-6 py-3 text-sm text-slate-500">{c.id}</td>
                                    <td className="px-6 py-3 text-sm font-medium text-slate-800">{c.username}</td>
                                    <td className="px-6 py-3 text-sm text-slate-600">{c.fullname}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Customers;