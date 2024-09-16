import React, { useEffect, useState } from 'react'

import { GoArrowUpRight } from "react-icons/go";
import axios from "axios"
const Home = () => {
  const handleOnAdd = () => {
    setTimeout(() => {
      window.location.href = '/add-project';
    },100);
  }
  const [projects,setProjects] = useState([]);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:3001/projects');
        setProjects(response.data);
      } catch (error) {
        console.error(error)
      }
    }
    fetchProjects()
  },[])
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  }
  return (
    <div className='px-4 md:px-32 py-10'>
      <div className='flex gap-3'>
      <button className='bg-black font-poppins text-2xl py-2 px-4 rounded-lg text-white hover:bg-blue-400' onClick={handleOnAdd}>Add Product</button>
      <button className='bg-black font-poppins text-2xl py-2 px-4 rounded-lg text-white hover:bg-blue-400' onClick={handleLogout}>Logout</button>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-3 py-6'>
       {projects.map((project) => ( 
        <div key={project._id} className="bg-blue-100 h-fit px-4 py-6 rounded-3xl text-black flex flex-col gap-5">
          <div className="relative overflow-hidden rounded-3xl">
            <img src={project.image} alt="" className="h-auto w-auto rounded-3xl transform object-cover transition-transform duration-200 hover:scale-125" />
          </div>
          <div>
            <h2 className="font-poppins text-3xl font-semibold ">{project.name}</h2>
            <div className="flex items-center justify-between">
              <p className="font-poppins font-medium text-lg">{project.description}</p>
              <a href={project.link} target='_blank'  className="hover:bg-black p-3 hover:rounded-full text-center hover:text-white"><GoArrowUpRight className="text-2xl  font-poppins font-bold " /> </a>
            </div>
          </div>
        </div>
        ))}
      </div>
    </div>
  )
}

export default Home
