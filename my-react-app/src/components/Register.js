import React, { useState } from "react";
import api from "../api";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setFullname] = useState("");
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password || !fullname) {
            setIsError(true);
            setMessage("กรุณากรอกข้อมูลให้ครบทุกช่อง");
            return;
        }

        try {
            const res = await api.post("/api/users/register", {
                username,
                password,
                fullname
            });

            setIsError(false);
            setMessage(res.data.message || "Register success");
            setUsername("");
            setPassword("");
            setFullname("");
        } catch (err) {
            setIsError(true);
            setMessage(
                err.response?.data?.message || "เกิดข้อผิดพลาดในการสมัครสมาชิก"
            );
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 px-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8 space-y-4"
            >
                <h2 className="text-2xl font-bold text-slate-800 text-center mb-6">
                    Register
                </h2>

                {message && (
                    <p className={isError ? "text-red-600" : "text-green-600"}>
                        {message}
                    </p>
                )}

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    placeholder="Fullname"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Register;