// utils/api.js
import axios from "axios";

export const createExam = async (examData) => {
  try {
    const response = await axios.post(
      "https://saad-fiver.vercel.app/api/exams",
      examData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating exam:", error);
    throw error;
  }
};

// components/CreateExamModal.js
import React, { useState } from "react";

const CreateExamModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: "1",
    description: "1",
    totalQuestions: 1,
    totalTime: 1,
    difficulty: "easy",
    tags: ["1", "untuk ahok"],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createExam(formData);
      alert("Exam created successfully!");
      onClose();
    } catch (error) {
      alert("Failed to create exam");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/75 text-black ">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Create New Exam</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full p-2 border rounded mb-2"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2 border rounded mb-2"
            required
          />
          <input
            type="number"
            name="totalQuestions"
            value={formData.totalQuestions}
            onChange={handleChange}
            placeholder="Total Questions"
            className="w-full p-2 border rounded mb-2"
            required
          />
          <input
            type="number"
            name="totalTime"
            value={formData.totalTime}
            onChange={handleChange}
            placeholder="Total Time (minutes)"
            className="w-full p-2 border rounded mb-2"
            required
          />
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="Tags (comma separated)"
            className="w-full p-2 border rounded mb-2"
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateExamModal;
