"use client";

import { useEffect, useState } from "react";
import Layout from "../components/SidebarNew";
import Link from "next/link";
import axios from "axios";
import useSWR from "swr";
import LoadingScreen from "../components/LoadingScreen";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function page() {
  const { data, error, isLoading, mutate } = useSWR(
    process.env.NEXT_PUBLIC_API_URL + "/exams",
    fetcher
  );

  const [errorMessage, setErrorMessage] = useState([]);

  const [exams, setExams] = useState([
    {
      id: 1,
      title: "Example Exam",
      description: "This is a exam to k",
    },
  ]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    totalQuestions: 0,
    totalTime: 0,
    difficulty: "easy",
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm({
      ...form,
      [name]: type === "number" ? parseInt(value) : value,
    });
  };

  useEffect(() => {
    if (data) {
      setExams(data.data); // Asumsikan `data` adalah array dari API
      // console.log(data);
    }
  }, [data]);

  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/exams`, form);

      mutate();
      setErrorMessage([]);
      setForm({ title: "", description: "", totalQuestions: 0, totalTime: 0 });
      setShowModal(false);
    } catch (error) {
      setShowModal(false);

      // Reset form
      console.error("Error submitting exam:", error.response.data);

      if (error.response) {
        setErrorMessage(error.response.data.errors);
      }
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 p-6 text-black">
        {isLoading && <LoadingScreen />}

        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-2xl font-semibold mb-2">Exam Management</h1>
              <p className="text-gray-600">Create and manage your exams</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
              Create New Exam
            </button>
          </div>

          {error && <p>there is a problem, please reload or contact admin</p>}

          {errorMessage &&
            errorMessage.map((error) => (
              <div
                key={error}
                className="bg-red-100 text-red-600 p-4 rounded-lg mb-4"
              >
                Error: {error.message}
              </div>
            ))}

          {/* Exam Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {exams.map((exam) => (
              <div key={exam._id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-lg font-medium">{exam.title}</h2>
                  <div className="flex gap-2">
                    <button className="text-gray-400 hover:text-indigo-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                      </svg>
                    </button>
                    <button className="text-gray-400 hover:text-red-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                      </svg>
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{exam.description}</p>
                <Link
                  href={`/admin/exam/${exam._id}`}
                  key={exam._id}
                  className="text-indigo-600 hover:text-indigo-700 flex items-center gap-1 text-sm font-medium"
                >
                  Manage
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>

          {/* Create Exam Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center p-4">
              <div className="bg-white rounded-lg w-full max-w-md">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Create New Exam</h2>
                    <button
                      onClick={() => setShowModal(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                      <label className="block mb-1 font-medium">
                        Exam Title
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        placeholder="Enter exam title"
                        value={form.title}
                        name="title"
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="block mb-1 font-medium">
                        Description
                      </label>
                      <textarea
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        rows="3"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Enter exam description"
                      />
                    </div>

                    {/* total questions */}
                    <div>
                      <label className="block mb-1 font-medium">
                        Total Questions
                      </label>
                      <input
                        type="number"
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        placeholder="Enter total questions"
                        value={form.totalQuestions}
                        name="totalQuestions"
                        onChange={handleChange}
                      />
                    </div>

                    {/* total time */}
                    <div>
                      <label className="block mb-1 font-medium">
                        Total Time
                      </label>
                      <input
                        type="number"
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        placeholder="Enter total time"
                        value={form.totalTime}
                        name="totalTime"
                        onChange={handleChange}
                      />
                    </div>

                    {/* difficulty */}
                    <div>
                      <label className="block mb-1 font-medium">
                        Difficulty
                      </label>
                      <select
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        name="difficulty"
                        value={form.difficulty}
                        onChange={handleChange}
                      >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                      </select>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                      >
                        Create Exam
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
