"use client";

import LoadingScreen from "@/app/admin/components/LoadingScreen";
import Layout from "@/app/admin/components/SidebarNew";
import { fetcher } from "@/app/admin/utils/fetcher";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function page() {
  const { id } = useParams();

  const { data, error, isLoading, mutate } = useSWR(
    process.env.NEXT_PUBLIC_API_URL + "/sections/" + id,
    fetcher
  );

  // console.log(data);

  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    questionContent: "",
    questionType: "",
    questionSubType: "",
    severity: "",
    sequenceNumber: 1,
    choices: [
      {
        text: "",
        isCorrect: false,
      },
    ],
    answerNote: "",
    // passage: passage,
    section: id,
  });

  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState([]);

  const [isBeingEdited, setIsBeingEdited] = useState(false);

  const handleEdit = (question) => {
    setFormData(question);
    setIsBeingEdited(true);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.questionContent)
      newErrors.questionContent = "Question questionContent is required";
    if (!formData.questionType)
      newErrors.questionType = "Question Type is required";
    if (!formData.questionSubType)
      newErrors.questionSubType = "Question questionSubType is required";
    if (!formData.severity) newErrors.severity = "Severity is required";

    // convert sequence number from string to number
    formData.sequenceNumber = parseInt(formData.sequenceNumber);

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // console.log("Form submitted:", formData);
      try {
        if (isBeingEdited) {
          await axios.put(
            `${process.env.NEXT_PUBLIC_API_URL}/questions/${formData._id}`,
            formData
          );
        } else {
          await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/questions`,
            formData
          );
        }
        setFormData({
          questionContent: "",
          questionType: "",
          questionSubType: "",
          severity: "",
          sequenceNumber: 1,
          choices: [
            {
              text: "",
              isCorrect: false,
            },
          ],
          answerNote: "",
          section: id,
        });
        setErrorMessage([]);
        setShowModal(false);
        mutate();
      } catch (error) {
        if (error.response) {
          setErrorMessage(
            error.response.data.errors || [
              { message: error.response.data.message },
            ]
          );
        }
      }
    }
  };

  const [idToDelete, setIdToDelete] = useState(null);

  const confirmDelete = (id) => {
    const modal = document.getElementById("delete_question_mal");
    modal.showModal();
    setIdToDelete(id);
  };

  const deletePassageAndQuestion = async () => {
    try {
      setErrorMessage([]);
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/questions/${idToDelete}`
      );
      mutate();
      document.getElementById("delete_question_mal").close();
      setIdToDelete(null);
    } catch (error) {
      // alert("Error deleting exam");
      setErrorMessage(error.response.data.errors);
      // console.error("Error deleting exam:", error);
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

  const [questions, setQuestions] = useState([
    {
      id: 1,
      number: 1,
      description: "Example description",
      difficulty: "MODERATE",
      _id: "67be2bc2b7b84ba2b98c5ce9",
    },
  ]);

  useEffect(() => {
    if (data && data.data) {
      setQuestions(data.data.questions);
    }
  }, [data]);

  return (
    <Layout>
      <div className="p-6 max-w-7xl mx-auto text-black">
        {isLoading && <LoadingScreen />}
        {/* Header */}
        <div className="flex justify-between items-start mb-6 bg-white  p-3 rounded">
          <div>
            <h1 className="text-2xl font-semibold mb-2">
              {data && data.data ? data.data.name : "Loading..."}
            </h1>
            <p className="text-gray-600">
              {data && data.data ? data.data.description : "Loading..."}
            </p>
            <div className="mt-2">
              <span className="bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full">
                LOGICAL_REASONING
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              setIsBeingEdited(false);
              setFormData({
                questionContent: "",
                questionType: "",
                questionSubType: "",
                severity: "",
                sequenceNumber: 1,
                choices: [
                  {
                    text: "",
                    isCorrect: false,
                  },
                ],
                answerNote: "",
                // passage: passage,
                section: id,
              });

              setShowModal(true);
            }}
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
            Add New Question
          </button>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-black">
            Questions
          </h2>
          <div className="space-y-3 sm:space-y-4 max-h-[calc(100vh-400px)] overflow-y-auto">
            {questions.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-4 md:p-6">
                <h3 className="text-xl font-medium text-gray-800">
                  No Question Found
                </h3>
              </div>
            ) : (
              questions.map((question) => (
                <div
                  key={question._id}
                  className="bg-white rounded-lg shadow p-4 sm:p-6"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="bg-indigo-100 text-indigo-800 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 text-sm sm:text-base">
                      {question.sequenceNumber}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4">
                        <p className="text-gray-900 text-sm sm:text-base">
                          {question.questionContent}
                        </p>
                        <div className="flex flex-row sm:flex-col md:flex-row items-start sm:items-end md:items-center gap-2 sm:gap-3 md:gap-4 shrink-0">
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2 order-2 sm:order-1">
                            <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-0.5 sm:inline rounded">
                              {question._id}
                            </span>
                            <span className="bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded text-xs sm:text-sm whitespace-nowrap">
                              {question.severity}
                            </span>
                          </div>
                          <div className="flex gap-1 sm:gap-2 order-1 sm:order-2">
                            <button
                              className="text-gray-400 hover:text-indigo-600 p-1 cursor-pointer"
                              onClick={() => handleEdit(question)}
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
                                className="sm:w-[18px] sm:h-[18px]"
                              >
                                <path d="M12 20h9" />
                                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                              </svg>
                            </button>
                            <button className="text-gray-400 hover:text-red-600 p-1 cursor-pointer" onClick={() => confirmDelete(question._id)}>
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
                                className="sm:w-[18px] sm:h-[18px]"
                              >
                                <path d="M3 6h18" />
                                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-[rgba(0,0,0,0.8)] flex items-center justify-center p-4">
            <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">
                    {isBeingEdited ? "Edit Question" : "Add New Question"}
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
                        <option value="">
                          Select Question questionSubType
                        </option>
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
                            sequenceNumber: parseInt(e.target.value),
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

                  {errorMessage &&
                    errorMessage.map((error) => (
                      <div
                        key={error}
                        className="bg-red-100 text-red-600 p-4 rounded-lg mb-4"
                      >
                        Error: {error.message}
                      </div>
                    ))}

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
                      {isBeingEdited ? "Update Question" : "Create Question"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        <dialog id="delete_question_mal" className="modal">
          <div className="modal-box bg-white text-black">
            <h3 className="font-bold text-lg">
              Are you sure you want to delete this data?
            </h3>
            <div className="flex justify-end mt-10 gap-5">
              <button
                className="mr-5"
                onClick={() => deletePassageAndQuestion()}
              >
                <a href="#" className="btn">
                  Yes
                </a>
              </button>
              <button
                onClick={() =>
                  document.getElementById("delete_question_mal").close()
                }
              >
                <a href="#" className="btn" id="no_delete">
                  No
                </a>
              </button>
            </div>
          </div>
        </dialog>
      </div>
    </Layout>
  );
}
