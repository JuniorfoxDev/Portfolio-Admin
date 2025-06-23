import React, { useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AddProduct = () => {
  // returns 
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState('');
  const handleHome = () => {
    setTimeout(() => {
      window.location.replace('/home');
    }, 200);
  }
  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setFileName(file.name)
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description || !link || !image) {
      alert('All fields are required');
      return;
    }
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('link', link);
    formData.append('image', image);

    try {
      const response = await axios.post('https://portfolio-server-vaibhav.vercel.app/add-project', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success("Project Added Successfully", {
        position: 'top-right'
      })
      setTimeout(() => {
        window.location.href = '/preview';
      }, 100)
    } catch (error) {
      console.log('Error adding project:', error.response ? error.response.data : error.message);
      toast.error("Can't add the Project", {
        position: 'top-right'
      })
    }
  };
  return (
    <div className="bg-white text-black min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form className="space-y-8 max-w-3xl mx-auto" onSubmit={handleSubmit}>

          <div>
            <label htmlFor="project-name" className="block text-sm font-medium text-gray-700 mb-1">
              Project Name
            </label>
            <div className="relative">
              <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                title
              </span>
              <input
                type="text"
                id="name"
                name="project-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Full Stack Webpage"
                className="w-full bg-gray-50 border border-gray-300 text-black placeholder-gray-400 rounded-lg py-3 pl-12 pr-4 focus:ring-2 focus:ring-black focus:border-black transition"
              />
            </div>
          </div>
          <div>
            <label htmlFor="project-description" className="block text-sm font-medium text-gray-700 mb-1">
              Project Description
            </label>
            <div className="relative">
              <span className="material-icons absolute left-3 top-4 text-gray-400">
                description
              </span>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                name="project-description"
                placeholder="Describe your project in a few sentences..."
                rows="4"
                className="w-full bg-gray-50 border border-gray-300 text-black placeholder-gray-400 rounded-lg py-3 pl-12 pr-4 focus:ring-2 focus:ring-black focus:border-black transition resize-none"
              ></textarea>
            </div>
          </div>
          <div>
            <label htmlFor="project-image-upload" className="block text-sm font-medium text-gray-700 mb-1">
              Project Image
            </label>
            <div
              className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-black transition group cursor-pointer"
              onClick={() => document.getElementById('project-image-upload').click()}
            >
              <input
                id="project-image-upload"
                name="project-image-upload"
                type="file"
                className="hidden"
                onChange={handleImagePreview}
              />
              <div className="space-y-1 text-center">
                <span className="material-icons text-5xl text-gray-400 group-hover:text-black transition">
                  cloud_upload
                </span>
                <div className="flex text-sm text-gray-600 justify-center">
                  <span className="bg-gray-200 rounded-md font-medium text-black px-2 py-1">
                    Upload a file
                  </span>
                  <p className="text-center pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500 py-2 ">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2 ml-1">{fileName}</p>
          </div>
          <div>
            <label htmlFor="project-link" className="block text-sm font-medium text-gray-700 mb-1">
              Project Link
            </label>
            <div className="relative">
              <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                link
              </span>
              <input
                type="url"
                id="link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                name="project-link"
                placeholder="e.g., https://myproject.com"
                className="w-full bg-gray-50 border border-gray-300 text-black placeholder-gray-400 rounded-lg py-3 pl-12 pr-4 focus:ring-2 focus:ring-black focus:border-black transition"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-end gap-4">
            <button
              type="button"
              className="text-gray-700 hover:bg-gray-200 rounded-lg px-6 py-3 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center justify-center bg-black hover:bg-gray-800 text-white font-semibold rounded-lg px-6 py-3 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
            >
              <span className="material-icons mr-2">add_circle_outline</span>
              Add Project
            </button>
          </div>
        </form>
      </main>
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
  );
};

export default AddProduct;
