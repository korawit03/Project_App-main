import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
function Login({ setToken }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch(
            "http://localhost:5000/api/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password
                })
            }
        );
        const result = await response.json();
        if (result.success) {
            localStorage.setItem("token", result.token);
            setToken(result.token);

            navigate("/products");
        }
        if (result.role === 'admin') {
            window.location.href = '/admin';   // Redirect ไปหน้า admin 
        } else {
            window.location.href = '/welcome'; // user ปกติ
        };
    }
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 px-4">
                <form onSubmit={handleLogin} className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8 space-y-4">
                    <h2 className="text-2xl font-bold text-slate-800 text-center mb-6">Login</h2>
                    <input
                        type="text"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition"
                    >
                        Login
                    </button>
                </form>
            </div>
        );
    }

    export default Login;