"use client";
import Layout from "@/app/admin/components/SidebarNew";
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kirim data ke API atau simpan ke database
    // try {
    //   const response = await fetch("/api/passages", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(formData),
    //   });

    //   if (response.ok) {
    //     alert("Passage created successfully!");
    //     // Reset form
    //     setFormData({
    //       title: "",
    //       text: "",
    //       section: "",
    //       difficulty: "medium",
    //       tags: [],
    //     });
    //     setTagInput("");
    //   } else {
    //     alert("Failed to create passage.");
    //   }
    // } catch (error) {
    //   console.error("Error:", error);
    //   alert("An error occurred.");
    // }
  };

  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-black text-4xl font-semibold text-center">
          Create New Passage for relevant section
        </h1>
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
              required
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
              required
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
