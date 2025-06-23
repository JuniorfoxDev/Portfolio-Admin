import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const About = () => {
    const [formData, setFormData] = useState({
        name: "",
        profileImage: "",
        bio: "",
        education: [],
        experience: [],
    });
    const [isExisting, setIsExisting] = useState(false);

    useEffect(() => {
        axios.get("https://portfolio-server-vaibhav.vercel.app/portfolio").then((res) => {
            if (res.data && res.data._id) {
                setFormData(res.data);
                setIsExisting(true);
            } else {
                setFormData({
                    name: "",
                    profileImage: "",
                    bio: "",
                    education: [],
                    experience: [],
                });
            }
        });
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEduChange = (index, field, value) => {
        const newEdu = [...formData.education];
        newEdu[index][field] = value;
        setFormData({ ...formData, education: newEdu });
    };

    const handleExpChange = (index, field, value) => {
        const newExp = [...formData.experience];
        newExp[index][field] = value;
        setFormData({ ...formData, experience: newExp });
    };

    const addEducation = () => {
        setFormData({
            ...formData,
            education: [
                ...formData.education,
                { institution: "", degree: "", cgpa: "", startYear: "", endYear: "" },
            ],
        });
    };

    const removeEducation = (index) => {
        const newEdu = formData.education.filter((_, i) => i !== index);
        setFormData({ ...formData, education: newEdu });
    };

    const addExperience = () => {
        setFormData({
            ...formData,
            experience: [
                ...formData.experience,
                { company: "", role: "", startDate: "", endDate: "", year: "", description: "" },
            ],
        });
    };

    const removeExperience = (index) => {
        const newExp = formData.experience.filter((_, i) => i !== index);
        setFormData({ ...formData, experience: newExp });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isExisting) {
            await axios.put("https://portfolio-server-vaibhav.vercel.app/portfolio", formData);
            alert("Portfolio updated!");
        } else {
            await axios.post("https://portfolio-server-vaibhav.vercel.app/portfolio", formData);
            alert("Portfolio added!");
            setIsExisting(true);
        }
    };

    return (
        <div className="bg-white text-black min-h-screen flex flex-col md:flex-row">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:pl-72 py-8">
                <form className="space-y-8" onSubmit={handleSubmit}>
                    {/* Personal Info */}
                    <section className="p-6 bg-gray-100 rounded-lg border">
                        <h2 className="text-xl font-bold flex items-center mb-4">
                            <span className="material-icons mr-2">person</span>Personal Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input type="text" name="name" value={formData.name} onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2" placeholder="Full Name" />
                            <input type="url" name="profileImage" value={formData.profileImage} onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2" placeholder="Profile Image URL" />
                        </div>
                        <textarea name="bio" value={formData.bio} onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 mt-4"
                            placeholder="Tell us about yourself..." />
                    </section>

                    {/* Education */}
                    <section className="p-6 bg-gray-100 rounded-lg border">
                        <h2 className="text-xl font-bold flex items-center mb-4">
                            <span className="material-icons mr-2">school</span>Education
                        </h2>
                        {formData.education.map((entry, idx) => (
                            <div key={idx} className="p-4 border rounded mb-4 bg-white shadow-sm">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input type="text" value={entry.institution}
                                        onChange={(e) => handleEduChange(idx, "institution", e.target.value)}
                                        className="w-full border border-gray-300 rounded px-3 py-2" placeholder="Institution Name" />
                                    <input type="text" value={entry.degree}
                                        onChange={(e) => handleEduChange(idx, "degree", e.target.value)}
                                        className="w-full border border-gray-300 rounded px-3 py-2" placeholder="Degree / Program" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                                    <input type="text" value={entry.cgpa}
                                        onChange={(e) => handleEduChange(idx, "cgpa", e.target.value)}
                                        className="w-full border border-gray-300 rounded px-3 py-2" placeholder="CGPA / Grade" />
                                    <DatePicker
                                        selected={entry.startYear ? new Date(entry.startYear) : null}
                                        onChange={(date) => handleEduChange(idx, "startYear", date.toISOString())}
                                        dateFormat="yyyy-MM-dd"
                                        placeholderText="Start Year"
                                        className="w-full border border-gray-300 rounded px-3 py-2"
                                    />
                                    <DatePicker
                                        selected={entry.endYear ? new Date(entry.endYear) : null}
                                        onChange={(date) => handleEduChange(idx, "endYear", date.toISOString())}
                                        dateFormat="yyyy-MM-dd"
                                        placeholderText="End Year"
                                        className="w-full border border-gray-300 rounded px-3 py-2"
                                    />
                                </div>
                                <div className="text-right mt-2">
                                    <button type="button" onClick={() => removeEducation(idx)}
                                        className="border border-red-500 text-red-500 rounded px-3 py-1 hover:bg-red-50">
                                        <span className="material-icons text-sm mr-1">delete</span>Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                        <button type="button" onClick={addEducation}
                            className="border border-gray-400 rounded px-3 py-1 mt-2 hover:bg-gray-100">
                            <span className="material-icons text-sm mr-1">add_circle_outline</span>Add Education Entry
                        </button>
                    </section>

                    {/* Experience */}
                    <section className="p-6 bg-gray-100 rounded-lg border">
                        <h2 className="text-xl font-bold flex items-center mb-4">
                            <span className="material-icons mr-2">work</span>Experience
                        </h2>
                        {formData.experience.map((entry, idx) => (
                            <div key={idx} className="p-4 border rounded mb-4 bg-white shadow-sm">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input type="text" value={entry.company}
                                        onChange={(e) => handleExpChange(idx, "company", e.target.value)}
                                        className="w-full border border-gray-300 rounded px-3 py-2" placeholder="Company Name" />
                                    <input type="text" value={entry.role}
                                        onChange={(e) => handleExpChange(idx, "role", e.target.value)}
                                        className="w-full border border-gray-300 rounded px-3 py-2" placeholder="Role / Position" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                                    <DatePicker
                                        selected={entry.startDate ? new Date(entry.startDate) : null}
                                        onChange={(date) => handleExpChange(idx, "startDate", date.toISOString())}
                                        dateFormat="yyyy-MM-dd"
                                        placeholderText="Start Date"
                                        className="w-full border border-gray-300 rounded px-3 py-2"
                                    />
                                    <DatePicker
                                        selected={entry.endDate ? new Date(entry.endDate) : null}
                                        onChange={(date) => handleExpChange(idx, "endDate", date.toISOString())}
                                        dateFormat="yyyy-MM-dd"
                                        placeholderText="End Date"
                                        className="w-full border border-gray-300 rounded px-3 py-2"
                                    />
                                    <input
                                        type="text"
                                        value={entry.year}
                                        onChange={(e) => handleExpChange(idx, "year", e.target.value)}
                                        className="w-full border border-gray-300 rounded px-3 py-2"
                                        placeholder="Year (Optional)"
                                    />
                                </div>
                                <textarea value={entry.description}
                                    onChange={(e) => handleExpChange(idx, "description", e.target.value)}
                                    className="w-full border border-gray-300 rounded px-3 py-2 mt-3"
                                    placeholder="Description / Responsibilities" />
                                <div className="text-right mt-2">
                                    <button type="button" onClick={() => removeExperience(idx)}
                                        className="border border-red-500 text-red-500 rounded px-3 py-1 hover:bg-red-50">
                                        <span className="material-icons text-sm mr-1">delete</span>Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                        <button type="button" onClick={addExperience}
                            className="border border-gray-400 rounded px-3 py-1 mt-2 hover:bg-gray-100">
                            <span className="material-icons text-sm mr-1">add_circle_outline</span>Add Experience Entry
                        </button>
                    </section>

                    <div className="text-right">
                        <button type="submit"
                            className="bg-black text-white rounded px-4 py-2 hover:bg-gray-800">
                            <span className="material-icons text-sm mr-1">save</span>
                            {isExisting ? "Update Portfolio" : "Add Portfolio"}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default About;
