import React, { useState } from 'react';
import axios from 'axios';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AddProduct = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [image, setImage] = useState(null);

  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setImage(file);
    }
  };

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
      toast.success("Project Added Successfully",{
        position:'top-right'
      })
      setTimeout(() => {
        window.location.href = '/home';
      },200)
    } catch (error) {
      console.log('Error adding project:', error.response ? error.response.data : error.message);
      toast.error("Can't add the Project",{
        position:'top-right'
      })
    }
  };

  return (
    <div className='px-3 md:px-20 py-5'>
      <div>
        <h2 className='font-poppins text-4xl font-medium'>Add Project</h2>
        <div className='flex flex-col md:flex-row justify-between items-center gap-10'>
          <form onSubmit={handleSubmit} className='form py-5'>
            <div className='flex flex-col py-4 gap-3'>
              <label htmlFor="name" className='text-2xl font-bold font-poppins'>Project Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='px-2 py-3 font-poppins font-medium border-2 border-black w-[350px] focus:border-blue-400 focus:border-2 text-xl outline-none'
                placeholder='Enter Project Name'
              />
            </div>
            <div className='flex flex-col py-4 gap-3'>
              <label htmlFor="description" className='text-2xl font-bold font-poppins'>Project Description</label>
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className='px-2 py-3 font-poppins font-medium border-2 border-black w-[350px] focus:border-blue-400 focus:border-2 text-xl outline-none'
                placeholder='Enter Project Description'
              />
            </div>
            <div className='flex flex-col py-4 gap-3'>
              <label htmlFor="image" className='text-2xl font-bold font-poppins'>Project Image</label>
              <input
                type="file"
                id="image"
                className='px-2 py-3 font-poppins font-medium border-2 border-black w-[350px] focus:border-blue-400 focus:border-2 text-xl outline-none'
                onChange={handleImagePreview}
              />
            </div>
            <div className='flex flex-col py-4 gap-3'>
              <label htmlFor="link" className='text-2xl font-bold font-poppins'>Project Link</label>
              <input
                type="text"
                id="link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className='px-2 py-3 font-poppins font-medium border-2 border-black w-[350px] focus:border-blue-400 focus:border-2 text-xl outline-none'
                placeholder='Enter Project Link'
              />
            </div>
            <div>
              <button
                type='submit'
                className='bg-black text-white px-4 py-2 font-poppins font-normal text-xl rounded-full hover:bg-blue-200 hover:text-black hover:font-poppins hover:font-semibold'
              >
                Add Project
              </button>
            </div>
          </form>
          {imagePreview && (
            <div>
              <img src={imagePreview} alt="Image preview" />
            </div>
          )}
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
  );
};

export default AddProduct;
