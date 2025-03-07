"use client";
import Layout from "@/app/admin/components/SidebarNew";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState } from "react";

const page = () => {
  const { id, passage } = useParams();

  const [formData, setFormData] = useState({
    questionContent: "",
    questionType: "",
    questionSubType: "",
    severity: "",
    sequenceNumber: "9",
    choices: [
      {
        text: "",
        isCorrect: false,
      },
    ],
    answerNote: "",
    passage: passage,
    section: id,
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.questionContent)
      newErrors.questionContent = "Question questionContent is required";
    if (!formData.questionType)
      newErrors.questionType = "Question Type is required";
    if (!formData.questionSubType)
      newErrors.questionSubType = "Question questionSubType is required";
    if (!formData.severity) newErrors.severity = "Severity is required";

    formData.sequenceNumber = parseInt(formData.sequenceNumber);

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted:", formData);
      setShowModal(false);
    }
  };

  // Tambah opsi jawaban baru
  const addOption = () => {
    setFormData((prev) => ({
      ...prev,
      choices: [...prev.choices, { text: "", isCorrect: false }],
    }));
  };

  // Update teks opsi jawaban
  const updateOptionText = (index, value) => {
    const newOptions = [...formData.choices];
    newOptions[index].text = value;
    setFormData((prev) => ({
      ...prev,
      choices: newOptions,
    }));
  };

  // Update status isCorrect
  const toggleCorrectAnswer = (index) => {
    const newOptions = [...formData.choices];
    newOptions[index].isCorrect = !newOptions[index].isCorrect;
    setFormData((prev) => ({
      ...prev,
      choices: newOptions,
    }));
  };

  return (
    <Layout>
      <div className="p-4 text-black">
        <div
          key={1}
          className="bg-white min-w-1/2 rounded-lg shadow p-4 sm:p-6"
        >
          <div className="flex items-start justify-between mb-3 sm:mb-4">
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="bg-indigo-100 text-indigo-800 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-sm sm:text-base">
                1
              </div>
              <h3 className="text-lg sm:text-xl font-medium text-gray-800">
                Passage 1
              </h3>
            </div>
          </div>
          <p className="text-gray-600 mb-4 text-sm sm:text-base line-clamp-2">
            The following passage was written in the mid-1990s. Evidence that
            the earth's atmosphere has warmed has become quite compelling, in
            part because it has been reinforced recently by the development of
            accurate...
          </p>
        </div>
        <div className="flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Create New Question</h2>
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
                {/* Question questionContent */}
                <div className="mb-6">
                  <label className="block mb-2 font-medium">
                    Question questionContent
                  </label>
                  <textarea
                    className={`w-full p-3 border rounded-lg ${
                      errors.questionContent
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    rows="4"
                    placeholder="Enter question questionContent"
                    value={formData.questionContent}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        questionContent: e.target.value,
                      }))
                    }
                  />
                  {errors.questionContent && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.questionContent}
                    </p>
                  )}
                </div>

                {/* Question questionType and questionSubType */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block mb-2 font-medium">
                      Question questionType
                    </label>
                    <select
                      className={`w-full p-3 border rounded-lg ${
                        errors.questionType
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      value={formData.questionType}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          questionType: e.target.value,
                        }))
                      }
                    >
                      <option value="">Select Question Type</option>
                      <option value="multiple_choice">Multiple Choice</option>
                      <option value="true_false">True/False</option>
                    </select>
                    {errors.questionType && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.questionType}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block mb-2 font-medium">
                      Question questionSubType
                    </label>
                    <select
                      className={`w-full p-3 border rounded-lg ${
                        errors.questionSubType
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      value={formData.questionSubType}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          questionSubType: e.target.value,
                        }))
                      }
                    >
                      <option value="">Select Question questionSubType</option>
                      <option value="basic">Basic</option>
                      <option value="advanced">Advanced</option>
                    </select>
                    {errors.questionSubType && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.questionSubType}
                      </p>
                    )}
                  </div>
                </div>

                {/* Severity and sequenceNumber */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block mb-2 font-medium">Severity</label>
                    <select
                      className={`w-full p-3 border rounded-lg ${
                        errors.severity ? "border-red-500" : "border-gray-300"
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
                      sequenceNumber Number
                    </label>
                    <input
                      type="number"
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      value={formData.sequenceNumber}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          sequenceNumber: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                {/* Answer choices */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium">
                      Answer choices (toggle the checkbox if it is the correct
                      answer)
                    </label>
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
                    {formData.choices.map((option, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="w-5 h-5 text-indigo-600 border-gray-300 rounded"
                          checked={option.isCorrect}
                          onChange={() => toggleCorrectAnswer(index)}
                        />
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
                            value={option.text}
                            onChange={(e) =>
                              updateOptionText(index, e.target.value)
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Answer answerNote */}
                <div className="mb-6">
                  <label className="block mb-2 font-medium">
                    Answer answerNote
                  </label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    rows="3"
                    placeholder="Enter answer answerNote"
                    value={formData.answerNote}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        answerNote: e.target.value,
                      }))
                    }
                  />
                </div>

                {/* Bottom Toolbar */}
                <div className="flex justify-end items-center pt-4">
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
      </div>
    </Layout>
  );
};

export default page;
