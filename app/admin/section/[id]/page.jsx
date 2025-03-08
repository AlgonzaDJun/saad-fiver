"use client";
import React, { useEffect, useState } from "react";
import Layout from "../../components/SidebarNew";
import Link from "next/link";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";
import LoadingScreen from "../../components/LoadingScreen";
import axios from "axios";

const page = () => {
  const { id } = useParams();

  const { data, error, isLoading, mutate } = useSWR(
    process.env.NEXT_PUBLIC_API_URL + "/sections/" + id,
    fetcher
  );

  useEffect(() => {
    if (data && data.data) {
      // console.log(data.data)
      setPassages(data.data.passages);
      setQuestions(data.data.questions);
    }
  }, [data]);

  const [passages, setPassages] = useState([
    {
      id: 1,
      number: 1,
      title: "Example Passage",
      preview:
        "The following passage was written in the mid-1990s. Evidence that the earth's atmosphere has warmed has become quite compelling, in part because it has been reinforced recently by the development of accurate...",
    },
  ]);

  const [questions, setQuestions] = useState([
    {
      id: 1,
      number: 1,
      text: "Which one of the following most accurately describes the relation between the argumentation in the second paragraph and that in the third paragraph?",
      difficulty: "MODERATE",
      questionId: "67be2bc2b7b84ba2b98c5ce9",
    },
  ]);

  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    text: "",
    section: id,
    difficulty: "medium", // Default value
    tags: [],
  });

  const [questionData, setQuestionData] = useState({
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
    passage: "",
    section: id,
  });

  const handleUpdateQuestion = async (question) => {
    setQuestionData(question);
    setShowModalQuestion(true);
  };

  const [showModalQuestion, setShowModalQuestion] = useState(false);

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

  const handleEdit = (passage) => {
    setFormData({
      ...formData,
      title: passage.title,
      text: passage.text,
      difficulty: passage.difficulty,
      tags: passage.tags,
      id: passage._id,
    });
    setShowModal(true);
  };

  const [errorMessage, setErrorMessage] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/passages/${formData.id}`,
        formData
      );
      setShowModal(false);
      mutate();
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.errors);
      }
      setShowModal(false);
    }
  };

  const [isQuestion, setIsQuestion] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

  const confirmDelete = (id, isQuestion) => {
    const modal = document.getElementById("delete_passage_modal");
    modal.showModal();
    setIdToDelete(id);

    if (isQuestion) {
      setIsQuestion(true);
    }
  };

  const deletePassageAndQuestion = async () => {
    try {
      setErrorMessage([]);
      if (isQuestion) {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/questions/${idToDelete}`
        );
      } else {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/passages/${idToDelete}`
        );
      }
      mutate();
      document.getElementById("delete_passage_modal").close();
      setIdToDelete(null);
    } catch (error) {
      // alert("Error deleting exam");
      setErrorMessage(error.response.data.errors);
      // console.error("Error deleting exam:", error);
    }
  };

  const [errors, setErrors] = useState({});

  const updateQuestion = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!questionData.questionContent)
      newErrors.questionContent = "Question questionContent is required";
    if (!questionData.questionType)
      newErrors.questionType = "Question Type is required";
    if (!questionData.questionSubType)
      newErrors.questionSubType = "Question questionSubType is required";
    if (!questionData.severity) newErrors.severity = "Severity is required";

    questionData.sequenceNumber = parseInt(questionData.sequenceNumber);

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // console.log(questionData);
      try {
        await axios.put(
          process.env.NEXT_PUBLIC_API_URL + "/questions/" + questionData._id,
          questionData
        );
        setIsSuccess(true);
        mutate();
        setTimeout(() => {
          setIsSuccess(false);
          setShowModalQuestion(false);
        }, 1000);
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

  // Tambah opsi jawaban baru
  const addOption = () => {
    setQuestionData((prev) => ({
      ...prev,
      choices: [...prev.choices, { text: "", isCorrect: false }],
    }));
  };

  // Update teks opsi jawaban
  const updateOptionText = (index, value) => {
    const newOptions = [...questionData.choices];
    newOptions[index].text = value;
    setQuestionData((prev) => ({
      ...prev,
      choices: newOptions,
    }));
  };

  // Update status isCorrect
  const toggleCorrectAnswer = (index) => {
    const newOptions = [...questionData.choices];
    newOptions[index].isCorrect = !newOptions[index].isCorrect;
    setQuestionData((prev) => ({
      ...prev,
      choices: newOptions,
    }));
  };

  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <Layout>
      <div className="p-3 sm:p-4 md:p-6 max-w-6xl mx-auto">
        {isLoading && <LoadingScreen />}

        {/* Passages Section */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-0 text-black">
              Passages
            </h2>

            <div className="space-x-3 sm:space-x-4">
              <Link href={`/admin/section/${id}/add-passage`}>
                <button className="btn btn-primary">Add Passage</button>
              </Link>

              <a
                href="#"
                className="text-indigo-600 hover:text-indigo-700 text-sm sm:text-base"
              >
                View All Questions
              </a>
            </div>
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

          <div className="grid sm:grid-cols-1 md:flex overflow-x-scroll gap-4">
            {passages.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-4 md:p-6">
                <h3 className="text-xl font-medium text-gray-800">
                  No Passage Found
                </h3>
              </div>
            ) : (
              passages.map((passage) => (
                <div
                  key={passage._id}
                  className="bg-white min-w-1/2 rounded-lg shadow p-4 sm:p-6"
                >
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <div className="bg-indigo-100 text-indigo-800 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-sm sm:text-base">
                        {passage.number}
                      </div>
                      <h3 className="text-lg sm:text-xl font-medium text-gray-800">
                        {passage.title}
                      </h3>

                      {/* small text and grey that show _id */}
                      <div className="text-xs block text-gray-500 sm:inline">
                        {passage._id}
                      </div>
                    </div>
                    <div className="flex gap-1 sm:gap-2">
                      <button
                        className="text-gray-400 hover:text-indigo-600 p-1 cursor-pointer"
                        onClick={() => handleEdit(passage)}
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
                      <button
                        className="text-gray-400 hover:text-red-600 p-1 cursor-pointer"
                        onClick={() => confirmDelete(passage._id, false)}
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
                          <path d="M3 6h18" />
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4 text-sm sm:text-base line-clamp-2">
                    {passage.text}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button className="text-indigo-600 border border-indigo-200 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:bg-indigo-50 text-sm sm:text-base w-full sm:w-auto">
                      View Questions
                    </button>

                    <Link
                      href={`/admin/section/${id}/${passage._id}/add-question`}
                    >
                      <button className="bg-indigo-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:bg-indigo-700 flex items-center justify-center sm:justify-start gap-1 sm:gap-2 text-sm sm:text-base w-full sm:w-auto">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="sm:w-4 sm:h-4"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="8" x2="12" y2="16" />
                          <line x1="8" y1="12" x2="16" y2="12" />
                        </svg>
                        Add Question
                      </button>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Questions Section */}
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-black">
            Questions
          </h2>
          <div className="space-y-3 sm:space-y-4 max-h-[calc(100vh-500px)] overflow-y-auto">
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
                            <span className="text-xs text-gray-500 hidden sm:inline">
                              {question.passage}
                            </span>
                            <span className="bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded text-xs sm:text-sm whitespace-nowrap">
                              {question.severity}
                            </span>
                          </div>
                          <div className="flex gap-1 sm:gap-2 order-1 sm:order-2">
                            <button
                              className="text-gray-400 hover:text-indigo-600 p-1 cursor-pointer"
                              onClick={() => handleUpdateQuestion(question)}
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
                            <button className="text-gray-400 hover:text-red-600 p-1 cursor-pointer" onClick={() => confirmDelete(question._id, true)}>
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

          {showModal && (
            <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center p-4 text-black">
              <div className="bg-white rounded-lg w-full max-w-md">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Update Passage</h2>
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
                      <label className="block mb-1 font-medium">Title</label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        placeholder="Enter title"
                        value={formData.title}
                        name="title"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="block mb-1 font-medium">text</label>
                      <textarea
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        rows="3"
                        name="text"
                        value={formData.text}
                        onChange={handleInputChange}
                        placeholder="Enter text"
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
                        value={formData.difficulty}
                        onChange={handleInputChange}
                      >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                      </select>
                    </div>

                    {/* tags */}
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

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                      >
                        Update Passage
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {showModalQuestion && (
            <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center p-4 text-black">
              <div className="bg-white rounded-lg w-full md:max-w-4xl overflow-y-auto max-h-[90vh]">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Update Question</h2>
                    <button
                      onClick={() => setShowModalQuestion(false)}
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
                  <form onSubmit={updateQuestion}>
                    {/* Question questionContent */}
                    <div className="mb-6">
                      <label className="block mb-2 font-medium">
                        Question Content
                      </label>
                      <textarea
                        className={`w-full p-3 border rounded-lg ${
                          errors.questionContent
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        rows="4"
                        placeholder="Enter question questionContent"
                        value={questionData.questionContent}
                        onChange={(e) =>
                          setQuestionData((prev) => ({
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
                          value={questionData.questionType}
                          onChange={(e) =>
                            setQuestionData((prev) => ({
                              ...prev,
                              questionType: e.target.value,
                            }))
                          }
                        >
                          <option value="">Select Question Type</option>
                          <option value="multiple_choice">
                            Multiple Choice
                          </option>
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
                          value={questionData.questionSubType}
                          onChange={(e) =>
                            setQuestionData((prev) => ({
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
                        <label className="block mb-2 font-medium">
                          Severity
                        </label>
                        <select
                          className={`w-full p-3 border rounded-lg ${
                            errors.severity
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          value={questionData.severity}
                          onChange={(e) =>
                            setQuestionData((prev) => ({
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
                          value={questionData.sequenceNumber}
                          onChange={(e) =>
                            setQuestionData((prev) => ({
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
                          Answer choices (toggle the checkbox if it is the
                          correct answer)
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
                        {questionData.choices.map((option, index) => (
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
                        value={questionData.answerNote}
                        onChange={(e) =>
                          setQuestionData((prev) => ({
                            ...prev,
                            answerNote: e.target.value,
                          }))
                        }
                      />
                    </div>
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
                        <span>Success update question!</span>
                      </div>
                    )}

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
                        Update Question
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <dialog id="delete_passage_modal" className="modal">
        <div className="modal-box bg-white text-black">
          <h3 className="font-bold text-lg">
            Are you sure you want to delete this data?
          </h3>
          <div className="flex justify-end mt-10 gap-5">
            <button className="mr-5" onClick={() => deletePassageAndQuestion()}>
              <a href="#" className="btn">
                Yes
              </a>
            </button>
            <button
              onClick={() =>
                document.getElementById("delete_passage_modal").close()
              }
            >
              <a href="#" className="btn" id="no_delete">
                No
              </a>
            </button>
          </div>
        </div>
      </dialog>
    </Layout>
  );
};

export default page;
