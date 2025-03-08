"use client";
import Layout from "@/app/admin/components/SidebarNew";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useState } from "react";

const page = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    section: id,
    difficulty: "medium", // Default value
    tags: [],
  });

  // State untuk input tags sementara
  const [tagInput, setTagInput] = useState("");

  // Handle perubahan input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle perubahan input tags
  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  // Handle ketika user menekan spasi atau koma di input tags
  const handleTagInputKeyDown = (e) => {
    if (e.key === " " || e.key === ",") {
      e.preventDefault(); // Mencegah spasi atau koma masuk ke input
      const newTag = tagInput.trim(); // Ambil nilai tag dan hilangkan spasi
      if (newTag) {
        setFormData({
          ...formData,
          tags: [...formData.tags, newTag], // Tambahkan tag baru ke array tags
        });
        setTagInput(""); // Reset input tags
      }
    }
  };

  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrrorMessage] = useState([]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);

    // Kirim data ke API atau simpan ke database
    try {
      // use axios
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/passages`, formData);
      setIsSuccess(true)
      setTimeout(() => {
        // goto /sections/id
        window.location.href = `/admin/section/${id}`;
      }, 2000);
    } catch (error) {
      // console.error("Error:", error);
      if (error.response) {
        setErrrorMessage(error.response.data.errors);
        // console.error("Error:", error.response.data.errors);
      }
    }
  };

  return (
    <Layout>
      <div className="p-4 mx-auto my-auto ">
        <h1 className="text-black text-4xl font-semibold text-center md:mt-16">
          Create New Passage for relevant section
        </h1>

        {isSuccess && (
          <div role="alert" className="alert alert-success">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Success create passage</span>
          </div>
        )}

        {errorMessage.length > 0 && (
          <div role="alert" className="alert alert-error">
            <ul>
              {errorMessage.map((error, index) => (
                <li key={index}>{error.message}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="space-y-4 max-w-lg mx-auto p-4 text-gray-900"
        >
          {/* Input Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            />
          </div>

          {/* Input Text */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Text
            </label>
            <textarea
              name="text"
              value={formData.text}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
              rows="4"
            />
          </div>

          {/* Input Difficulty */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Difficulty
            </label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          {/* Input Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tags
            </label>
            <input
              type="text"
              value={tagInput}
              onChange={handleTagInputChange}
              onKeyDown={handleTagInputKeyDown}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
              placeholder="Type tags separated by space or comma"
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
            >
              Create Passage
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default page;
