import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';  // Import NavLink

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/';
    }
    const navItems = [
        { icon: "dashboard", label: "Dashboard", path: "/home" },
        { icon: "article", label: "ABOUT", path: "/about" },
        { icon: "code", label: "PROJECT", path: "/add-project" },
        { icon: "workspaces", label: "MANAGE PR", path: "/preview" },
        { icon: "settings", label: "Settings", path: "/settings" },
    ];
    return (
        <>
            <button
                className="md:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="material-icons-outlined">{isOpen ? "close" : "menu"}</span>
            </button>

            <aside
                className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 p-4 flex flex-col w-64 transform transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
            >
                <div className="flex items-center gap-2 mb-6">
                    <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            clipRule="evenodd"
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
                        />
                    </svg>
                    <h1 className="text-xl font-semibold text-gray-800">Admin Panel</h1>
                </div>

                <nav className="space-y-1 flex flex-col">
                    {navItems.map((item, idx) => (
                        <NavLink
                            key={idx}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive
                                    ? "bg-blue-600 text-white hover:bg-blue-700"
                                    : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                                }`
                            }
                        >
                            <span className="material-icons-outlined text-2xl">{item.icon}</span>
                            <span className="text-sm font-medium">{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="mt-auto space-y-1">
                    <NavLink
                        to="/help"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-blue-600 transition"
                    >
                        <span className="material-icons-outlined text-2xl">help_outline</span>
                        <span className="text-sm font-medium">Help & Support</span>
                    </NavLink>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-blue-600 transition"
                    >
                        <span className="material-icons-outlined text-2xl">logout</span>
                        <span className="text-sm font-medium">Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Navbar;
