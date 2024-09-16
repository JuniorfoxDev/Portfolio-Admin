import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
const Register = () => {
  const [passwordVisible,setPasswordVisible] = useState(false);
  const togglePassword = () => {
    setPasswordVisible(!passwordVisible)
  }
  const [name,setName] = useState('');
  const [password,setPassword] = useState('');
  const [email,setEmail] = useState('');
  const handleRegister = async(e) => {
    e.preventDefault();
    try{
        const response = await axios.post('http://localhost:3001/register',{
          name,
          email,
          password,
        });
        toast.success("Registered Success !",{
          position: 'top-right'
        })
        setTimeout(() => {
          window.location.href = '/'
        }, 5000)
    } catch (error){
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
    <div>
      <div className='flex items-center justify-center px-4 py-4'>
        <div className='border-gray-300 border-2 bg-white rounded-3xl px-5 py-4 md:py-3 w-fit h-fit'>
          <h2 className='font-poppins py-2 font-bold text-3xl'>Welcome <span className='text-purple-700'>!</span> </h2>
          <h5 className='font-poppins py-1 font-medium text-base text-gray-600'>Welcome Here! Please enter your details</h5>
          <div className='py-2'>
            <div className='flex flex-col gap-3 py-2'>
              <label htmlFor="" className='font-poppins font-semibold text-xl text-black/[0.9]'>Username</label>
              <input type="text" name="username" id="username" value={name} onChange={(e) => setName(e.target.value)} className='border-gray-600 border-2 py-2 outline-none px-2 text-lg rounded-lg placeholder:font-poppins placeholder:text-gray-300-100 placeholder:text-lg focus:border-blue-200' placeholder='Enter your user name' />
            </div>
            <div className='flex flex-col gap-3 py-2'>
              <label htmlFor="" className='font-poppins font-semibold text-xl text-black/[0.9]'>Email</label>
              <input type="Email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className='border-gray-600 border-2 py-2 outline-none px-2 text-lg rounded-lg placeholder:font-poppins placeholder:text-gray-300-100 placeholder:text-lg focus:border-blue-200' placeholder='Enter your email id' />
            </div>
            <div className='relative flex flex-col gap-3 py-2'>
              <label htmlFor="" className='font-poppins font-semibold text-xl text-black/[0.9]'>Password</label>
              <input type={passwordVisible ? 'text' : 'password'} name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className='border-gray-600 border-2 py-2 outline-none px-2 text-lg rounded-lg focus:border-blue-200 placeholder:font-poppins placeholder:text-gray-300-100 placeholder:text-lg ' placeholder='Enter your Password' />
              <button type='button' onClick={togglePassword} className='absolute inset-y-[4.5rem] right-0 pr-3 flex items-center text-sm leading-5'>
               {passwordVisible ? (
                 <FaEye size={28} className='text-gray-600'/>
               ) : (
                <FaEyeSlash size={28} className='text-gray-200'/>
               )}
              </button>
            </div>
            <div className=''>
              <Link to='/' className='font-poppins relative float-right py-2 text-base text-purple-700 font-medium'>Forgot Password</Link>
            </div>
            <div className='text-center bg-purple-400 mt-12 py-2 text-white rounded-full font-poppins text-xl hover:shadow-lg cursor-pointer '>              
                <button type='submit' onClick={handleRegister} >Register</button>
            </div>
            <div className='py-4'>
              <p className='text-center font-poppins text-lg'>----- Or -------</p>
              <div className='text-center bg-purple-300 mt-3 py-2 text-white rounded-full font-poppins text-xl hover:shadow-lg cursor-pointer '>
                <button  onClick={handleLogin}>Login</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    <ToastContainer
      position='top-right'
      autoClose={3000}
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
  )
}

export default Register
