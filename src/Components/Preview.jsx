import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";

const Preview = () => {
  const [project,setProject] = useState([]);
  const fetchProjects = async () => {
    try {
      const response = await axios.get('https://portfolio-server-vaibhav.vercel.app/projects')
      setProject(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  }
  useEffect(() => {
    fetchProjects();
  },[])
  const handleDelete = async (projectId) => {
    try {
      await axios.delete(`https://portfolio-server-vaibhav.vercel.app/delete-project/${projectId}`);
      fetchProjects();
      alert("Project Added Succesfully");
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Failed to delete project');
    }
  }
  return (
    <div className="bg-white text-black min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow px-4 sm:px-6 md:pl-72 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {project.map((project) => (
            <div
              key={project._id}
              className="bg-white rounded-lg shadow hover:shadow-lg transform hover:-translate-y-1 transition overflow-hidden"
            >
              <div className="bg-gray-100 h-56 flex items-center justify-center">
                <img
                  src={project.image}
                  alt={`${project.name} screenshot`}
                  className="object-contain h-full w-full p-2"
                />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {project.name}
                </h2>
                <p className="text-sm text-gray-600 mb-3">
                  {project.description}
                </p>
                <div className="flex justify-between items-center">
                  <a
                    href={project.link}
                    target="_blank"
                    rel='noopener noreferrer' 
                    className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
                  >
                    View Project
                    <span className="material-icons text-sm ml-1">
                      arrow_outward
                    </span>
                  </a>
                  <button onClick={() => handleDelete(project._id)} className="text-red-500 hover:text-white hover:bg-red-500  flex items-center border rounded border-red-500 hover:border-red-950  px-2 py-1" aria-label={`Delete ${project.name}`}>
                    <span className="material-icons text-sm mr-1">delete</span>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Preview;
