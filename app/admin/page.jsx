"use client";

import { useState } from "react";
import Link from "next/link";
import Layout from "./components/SidebarNew";

export default function page() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    content: "",
    type: "",
    subtype: "",
    severity: "",
    sequence: "9",
    options: ["", ""],
    note: "",
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.content) newErrors.content = "Question content is required";
    if (!formData.type) newErrors.type = "Question type is required";
    if (!formData.subtype) newErrors.subtype = "Question subtype is required";
    if (!formData.severity) newErrors.severity = "Severity is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted:", formData);
      setShowModal(false);
    }
  };

  const addOption = () => {
    setFormData((prev) => ({
      ...prev,
      options: [...prev.options, ""],
    }));
  };

  const updateOption = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData((prev) => ({
      ...prev,
      options: newOptions,
    }));
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 p-6 text-black">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-semibold mb-6">Admin Dashboard</h1>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Link href="/admin/exam" className="block">
              <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 bg-indigo-100 rounded-lg">
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
                      className="text-indigo-600"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-lg font-medium">Exam Management</h2>
                    <p className="text-gray-500 text-sm">
                      Create and manage your exams
                    </p>
                  </div>
                </div>
                <div className="flex items-center text-indigo-600 text-sm font-medium">
                  View Exams
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
                    className="ml-1"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>

          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">
                      Create New Question
                    </h2>
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

                  <form onSubmit={handleSubmit}>
                    {/* Question Content */}
                    <div className="mb-6">
                      <label className="block mb-2 font-medium">
                        Question Content
                      </label>
                      <textarea
                        className={`w-full p-3 border rounded-lg ${
                          errors.content ? "border-red-500" : "border-gray-300"
                        }`}
                        rows="4"
                        placeholder="Enter question content"
                        value={formData.content}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            content: e.target.value,
                          }))
                        }
                      />
                      {errors.content && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.content}
                        </p>
                      )}
                    </div>

                    {/* Question Type and Subtype */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block mb-2 font-medium">
                          Question Type
                        </label>
                        <select
                          className={`w-full p-3 border rounded-lg ${
                            errors.type ? "border-red-500" : "border-gray-300"
                          }`}
                          value={formData.type}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              type: e.target.value,
                            }))
                          }
                        >
                          <option value="">Select Question Type</option>
                          <option value="multiple_choice">
                            Multiple Choice
                          </option>
                          <option value="true_false">True/False</option>
                        </select>
                        {errors.type && (
                          <p className="mt-1 text-sm text-red-500">
                            {errors.type}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block mb-2 font-medium">
                          Question Subtype
                        </label>
                        <select
                          className={`w-full p-3 border rounded-lg ${
                            errors.subtype
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          value={formData.subtype}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              subtype: e.target.value,
                            }))
                          }
                        >
                          <option value="">Select Question Subtype</option>
                          <option value="basic">Basic</option>
                          <option value="advanced">Advanced</option>
                        </select>
                        {errors.subtype && (
                          <p className="mt-1 text-sm text-red-500">
                            {errors.subtype}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Severity and Sequence */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block mb-2 font-medium">
                          Severity
                        </label>
                        <select
                          className={`w-full p-3 border rounded-lg ${
                            errors.severity
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          value={formData.severity}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              severity: e.target.value,
                            }))
                          }
                        >
                          <option value="">Select Severity</option>
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>
                        {errors.severity && (
                          <p className="mt-1 text-sm text-red-500">
                            {errors.severity}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block mb-2 font-medium">
                          Sequence Number
                        </label>
                        <input
                          type="number"
                          className="w-full p-3 border border-gray-300 rounded-lg"
                          value={formData.sequence}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              sequence: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </div>

                    {/* Answer Options */}
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <label className="font-medium">Answer Options</label>
                        <button
                          type="button"
                          onClick={addOption}
                          className="text-indigo-600 hover:text-indigo-700 flex items-center gap-1 text-sm"
                        >
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
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="16" />
                            <line x1="8" y1="12" x2="16" y2="12" />
                          </svg>
                          Add Option
                        </button>
                      </div>
                      <div className="space-y-3">
                        {formData.options.map((option, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg flex-1">
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
                                className="text-gray-400"
                              >
                                <line x1="3" y1="12" x2="21" y2="12" />
                                <line x1="3" y1="6" x2="21" y2="6" />
                                <line x1="3" y1="18" x2="21" y2="18" />
                              </svg>
                              <input
                                type="text"
                                className="flex-1 outline-none"
                                placeholder={`Option ${index + 1}`}
                                value={option}
                                onChange={(e) =>
                                  updateOption(index, e.target.value)
                                }
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Answer Note */}
                    <div className="mb-6">
                      <label className="block mb-2 font-medium">
                        Answer Note
                      </label>
                      <textarea
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        rows="3"
                        placeholder="Enter answer note"
                        value={formData.note}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            note: e.target.value,
                          }))
                        }
                      />
                    </div>

                    {/* Bottom Toolbar */}
                    <div className="flex justify-between items-center pt-4 border-t">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          className="p-2 text-gray-500 hover:text-gray-700"
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
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <path d="M20.4 14.5L16 10 4 20" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          className="p-2 text-gray-500 hover:text-gray-700"
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
                            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                            <polyline points="14 2 14 8 20 8" />
                          </svg>
                        </button>
                      </div>
                      <button
                        type="submit"
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
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                        Create Question
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
