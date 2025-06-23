import React, { useState } from "react";
import axios from "axios";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async (e) => {
        e.preventDefault(); // ✅ Prevent page reload on form submit
        try {
            const response = await axios.post(
                "https://portfolio-server-vaibhav.vercel.app/login",
                {
                    email,
                    password,
                }
            );

            if (response.status === 200) {
                const { token } = response.data;
                localStorage.setItem("token", token);

                toast.success("Login Success!", { position: "top-right" });
                setTimeout(() => {
                    window.location.replace("/home");
                }, 2000);
            } else {
                toast.error("Login failed! Please try again.", { position: "top-right" });
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error(
                error.response?.data?.message || "Login failed! Please check credentials.",
                { position: "top-right" }
            );
        }
    };

    const handleRegister = () => {
        window.location.href = "/register";
    };

    return (
        <div className="bg-gradient-to-br from-sky-500 to-sky-800 min-h-screen flex items-center justify-center p-4">
            <div className="bg-white shadow-2xl rounded-xl p-8 md:p-12 w-full max-w-md transform transition-all duration-500 hover:scale-105">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-gray-800">
                        LogIn <span className="text-sky-500">Portal</span>
                    </h1>
                    <p className="text-gray-600 mt-2">Secure login portfolio admin</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                            Email
                        </label>
                        <div className="relative">
                            <span className="material-icons-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                admin_panel_settings
                            </span>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter email address"
                                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 text-sm transition duration-150 ease-in-out"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
                            Password
                        </label>
                        <div className="relative">
                            <span className="material-icons-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                lock
                            </span>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 text-sm transition duration-150 ease-in-out"
                                required
                            />
                            <button
                                type="button"
                                onClick={handleTogglePassword}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-sky-500"
                            >
                                <span className="material-icons-outlined">
                                    {showPassword ? "visibility" : "visibility_off"}
                                </span>
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-end">
                        <button
                            type="button"
                            className="text-sm font-medium text-sky-500 hover:text-sky-700 transition duration-150"
                            onClick={() => toast.info("Forgot password feature coming soon!", { position: "top-right" })}
                        >
                            Forgot Password?
                        </button>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full bg-sky-500 hover:bg-sky-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50 transition duration-150 transform hover:-translate-y-0.5"
                        >
                            Login
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-center text-sm text-gray-500">
                    Need to create an admin account?{" "}
                    <button
                        onClick={handleRegister}
                        className="font-medium text-sky-500 hover:text-sky-700"
                    >
                        Register New Admin
                    </button>
                </p>
            </div>

            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Bounce}
            />
        </div>
    );
};

export default Login;
