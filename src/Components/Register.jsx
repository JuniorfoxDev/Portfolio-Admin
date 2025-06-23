import React, { useState } from "react";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const handleRegister = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://portfolio-server-vaibhav.vercel.app/register', {
        name,
        email,
        password,
      });
      toast.success("Registered Success !", {
        position: 'top-right'
      })
      setTimeout(() => {
        window.location.href = '/'
      }, 1000)
    } catch (error) {
      console.log(error)
      toast.error("Registered Failed !", {
        position: 'top-right'
      })
    }
  }
  const handleLogin = () => {
    window.location.href = '/'
  }
  return (
    <div className="bg-gradient-to-br from-sky-500 to-sky-800 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-xl p-8 md:py-4 px-6  w-full max-w-md transform transition-all duration-700 hover:scale-95">
        <div className="text-center mb-4">
          <h1 className="text-4xl font-bold text-gray-800">
            Admin <span className="text-sky-500">Registration</span>
          </h1>
          <p className="text-gray-600 mt-2">Create a new administrator account</p>
        </div>

        <form className="space-y-6" onSubmit={handleRegister}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="fullname">
              Full Name
            </label>
            <div className="relative">
              <span className="material-icons-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                person
              </span>
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter full name"
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 text-sm transition duration-150 ease-in-out"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
              Admin Email
            </label>
            <div className="relative">
              <span className="material-icons-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                email
              </span>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter admin email"
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
                lock_outline
              </span>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 text-sm transition duration-150 ease-in-out"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-sky-500"
              >
                <span className="material-icons-outlined">
                  {showPassword ? "visibility" : "visibility_off"}
                </span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <div className="relative">
              <span className="material-icons-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                lock
              </span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 text-sm transition duration-150 ease-in-out"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-sky-500"
              >
                <span className="material-icons-outlined">
                  {showConfirmPassword ? "visibility" : "visibility_off"}
                </span>
              </button>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-sky-500 hover:bg-sky-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50 transition duration-150 ease-in-out transform hover:-translate-y-0.5"
            >
              Register
            </button>
          </div>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          Already have an admin account?{" "}
          <button onClick={handleLogin} className="font-medium text-sky-500 hover:text-sky-700">
            Login Here
          </button>
        </p>
      </div>
      <ToastContainer
        position='top-right'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
        transition={Bounce}
      />
    </div>
  );
};

export default Register;
