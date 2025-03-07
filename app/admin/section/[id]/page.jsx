"use client";
import React, { useState } from "react";
import Layout from "../../components/SidebarNew";
import Link from "next/link";
import { useParams } from "next/navigation";

const page = () => {
  const { id } = useParams();
  const [passages] = useState([
    {
      id: 1,
      number: 1,
      title: "Passage 1",
      preview:
        "The following passage was written in the mid-1990s. Evidence that the earth's atmosphere has warmed has become quite compelling, in part because it has been reinforced recently by the development of accurate...",
    },
    {
      id: 2,
      number: 2,
      title: "Passage 2",
      preview:
        "When interviewing witnesses to a crime, police interviewers seek to maximize the amount of information that a cooperating eyewitness can give them so that they can generate leads to follow, confirm or disconfirm alibis, and so...",
    },
    {
      id: 3,
      number: 3,
      title: "Passage 3",
      preview:
        "The following passage was written in the mid-1990s. Evidence that the earth's atmosphere has warmed has become quite compelling, in part because it has been reinforced recently by the development of accurate...",
    },
  ]);

  const [questions] = useState([
    {
      id: 1,
      number: 1,
      text: "Which one of the following most accurately describes the relation between the argumentation in the second paragraph and that in the third paragraph?",
      difficulty: "MODERATE",
      questionId: "67be2bc2b7b84ba2b98c5ce9",
    },
    {
      id: 2,
      number: 2,
      text: "Which one of the following is mentioned in the passage?",
      difficulty: "MODERATE",
      questionId: "67be2bc2b7b84ba2b98c5ce9",
    },
    {
      id: 3,
      number: 3,
      text: "It can be reasonably inferred from the passage that the author considers which one of the following most crucial in judging the success of a model developed to explain",
      difficulty: "MODERATE",
      questionId: "67be2bc2b7b84ba2b98c5ce9",
    },
    {
      id: 4,
      number: 4,
      text: "It can be reasonably inferred from the passage that the author considers which one of the following most crucial in judging the success of a model developed to explain",
      difficulty: "MODERATE",
      questionId: "67be2bc2b7b84ba2b98c5ce9",
    },
    {
      id: 5,
      number: 5,
      text: "It can be reasonably inferred from the passage that the author considers which one of the following most crucial in judging the success of a model developed to explain",
      difficulty: "MODERATE",
      questionId: "67be2bc2b7b84ba2b98c5ce9",
    },
    {
      id: 6,
      number: 6,
      text: "It can be reasonably inferred from the passage that the author considers which one of the following most crucial in judging the success of a model developed to explain",
      difficulty: "MODERATE",
      questionId: "67be2bc2b7b84ba2b98c5ce9",
    },
    {
      id: 7,
      number: 7,
      text: "It can be reasonably inferred from the passage that the author considers which one of the following most crucial in judging the success of a model developed to explain",
      difficulty: "MODERATE",
      questionId: "67be2bc2b7b84ba2b98c5ce9",
    },
  ]);

  return (
    <Layout>
      <div className="p-3 sm:p-4 md:p-6 max-w-6xl mx-auto">
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

          <div className="grid sm:grid-cols-1 md:flex overflow-x-scroll gap-4">
            {passages.map((passage) => (
              <div
                key={passage.id}
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
                  </div>
                  <div className="flex gap-1 sm:gap-2">
                    <button className="text-gray-400 hover:text-indigo-600 p-1">
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
                    <button className="text-gray-400 hover:text-red-600 p-1">
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
                  {passage.preview}
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button className="text-indigo-600 border border-indigo-200 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:bg-indigo-50 text-sm sm:text-base w-full sm:w-auto">
                    View Questions
                  </button>
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
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Questions Section */}
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-black">
            Questions
          </h2>
          <div className="space-y-3 sm:space-y-4 max-h-[calc(100vh-500px)] overflow-y-auto">
            {questions.map((question) => (
              <div
                key={question.id}
                className="bg-white rounded-lg shadow p-4 sm:p-6"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="bg-indigo-100 text-indigo-800 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 text-sm sm:text-base">
                    {question.number}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4">
                      <p className="text-gray-900 text-sm sm:text-base">
                        {question.text}
                      </p>
                      <div className="flex flex-row sm:flex-col md:flex-row items-start sm:items-end md:items-center gap-2 sm:gap-3 md:gap-4 shrink-0">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2 order-2 sm:order-1">
                          <span className="text-xs text-gray-500 hidden sm:inline">
                            {question.questionId}
                          </span>
                          <span className="bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded text-xs sm:text-sm whitespace-nowrap">
                            {question.difficulty}
                          </span>
                        </div>
                        <div className="flex gap-1 sm:gap-2 order-1 sm:order-2">
                          <button className="text-gray-400 hover:text-indigo-600 p-1">
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
                          <button className="text-gray-400 hover:text-red-600 p-1">
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
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default page;
