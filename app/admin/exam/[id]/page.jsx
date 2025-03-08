"use client";
import React, { use, useEffect, useState } from "react";
import Layout from "../../components/SidebarNew";
import Link from "next/link";
import useSWR from "swr";
import axios from "axios";
import LoadingScreen from "../../components/LoadingScreen";
import { useParams } from "next/navigation";
import { ImportModal } from "../../components/ImportModal";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const page = () => {
  const { id } = useParams();
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const { data, error, isLoading, mutate } = useSWR(
    process.env.NEXT_PUBLIC_API_URL + "/exams/" + id,
    fetcher
  );

  const [errorMessage, setErrorMessage] = useState([]);
  const [editSection, setEditSection] = useState(false);

  // console.log(data)
  const [formData, setFormData] = useState({
    name: "",
    type: "reading_comprehension",
    description: "",
    estimatedTime: 1,
    exam: id,
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    // Jika type adalah "number", konversi value ke integer
    const processedValue = type === "number" ? parseInt(value, 10) : value;
    setFormData({
      ...formData,
      [name]: processedValue,
    });
  };

  const handdleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/sections`, formData);

      mutate();
      setErrorMessage([]);
      setFormData({ name: "", type: "", description: "", estimatedTime: 1 });
      // setShowModal(false);
      document.getElementById("close_modal").click();
    } catch (error) {
      // setShowModal(false);
      document.getElementById("close_modal").click();

      // Reset formData
      console.error("Error submitting sections:", error.response.data);

      if (error.response) {
        setErrorMessage(error.response.data.errors);
      }
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/sections/${formData.id}`,
        formData
      );
      mutate();
      setErrorMessage([]);
      setFormData({
        ...formData,
        name: "",
        type: "reading_comprehension",
        description: "",
        estimatedTime: 1,
      });
      // setShowModal(false);
      document.getElementById("close_modal").click();
    } catch (error) {
      // setShowModal(false);
      document.getElementById("close_modal").click();

      // Reset formData
      console.error("Error submitting sections:", error.response.data);

      if (error.response) {
        setErrorMessage(error.response.data.errors);
      }
    }
  };

  const [sections, setSections] = useState([
    {
      id: 1,
      number: 1,
      title: "Example section",
      type: "reading_comprehension",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, rem voluptatem?",
    },
  ]);

  useEffect(() => {
    if (data && data.data) {
      setSections(data.data.sections);
      // console.log(data)
    }
  }, [data]);

  const deleteSection = (id) => {
    setSections(sections.filter((section) => section.id !== id));
  };

  const handleEditModal = (section) => {
    setEditSection(true);
    setFormData({
      id: section._id,
      name: section.name,
      type: section.type,
      description: section.description,
      estimatedTime: section.estimatedTime,
      exam: id,
    });
    document.getElementById("my_modal_5").showModal();
  };

  const [idToDelete, setIdToDelete] = useState(null);

  const confirmDelete = (id) => {
    const modal = document.getElementById("delete_section_modal");
    modal.showModal();
    setIdToDelete(id);
  };

  const deleteExam = async () => {
    try {
      setErrorMessage([]);
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/sections/${idToDelete}`
      );
      mutate();
      document.getElementById("delete_section_modal").close();
      setIdToDelete(null);
    } catch (error) {
      // alert("Error deleting exam");
      setErrorMessage(error.response.data.errors);
      // console.error("Error deleting exam:", error);
    }
  };

  return (
    // <div className="min-h-screen bg-gray-50">
    <Layout>
      {isImportModalOpen && (
        <ImportModal
          isOpen={isImportModalOpen}
          onClose={() => setIsImportModalOpen(false)}
          exam={id}
        />
      )}
      <div className="max-w-6xl mx-auto p-4">
        {isLoading && <LoadingScreen />}

        {/* Header with buttons */}
        <div className="flex flex-col md:flex-row justify-between items-center py-4 border-b mb-6">
          <div></div>
          <div className="flex flex-col md:flex-row gap-3 mt-4 md:mt-0">
            <button
              onClick={() => {
                // empty form data
                setEditSection(false);
                setFormData({
                  ...formData,
                  name: "",
                  type: "reading_comprehension",
                  description: "",
                  estimatedTime: 1,
                });
                document.getElementById("my_modal_5").showModal();
              }}
              className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition-colors w-full md:w-auto justify-center"
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
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
              Add New Section
            </button>
            <button
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors w-full md:w-auto justify-center"
              onClick={() => setIsImportModalOpen(true)}
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
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Import Sections
            </button>
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

        {/* Sections */}
        <div className="space-y-4 overflow-auto md:max-h-[calc(100vh-150px)]">
          {sections.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-4 md:p-6">
              <h3 className="text-xl font-medium text-gray-800">
                No Section Found
              </h3>
            </div>
          ) : (
            sections.map((section) => (
              <div
                key={section._id}
                className="bg-white rounded-lg shadow p-4 md:p-6"
              >
                <div className="flex flex-col md:flex-row items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="text-gray-400 mt-1">
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
                        <line x1="4" y1="9" x2="20" y2="9"></line>
                        <line x1="4" y1="15" x2="20" y2="15"></line>
                        <line x1="10" y1="3" x2="8" y2="21"></line>
                        <line x1="16" y1="3" x2="14" y2="21"></line>
                      </svg>
                    </div>
                    <div className="bg-indigo-100 text-indigo-800 w-8 h-8 rounded-full flex items-center justify-center">
                      {section.number}
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-gray-800">
                        {section.name}
                      </h3>
                      <p className="text-gray-500 mt-2">
                        {section.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-4 md:mt-0">
                    <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-lg text-sm">
                      {section.type}
                    </span>
                    <button
                      className="text-gray-400 hover:text-indigo-600 cursor-pointer"
                      onClick={() => handleEditModal(section)}
                    >
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
                        <path d="M12 20h9"></path>
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                      </svg>
                    </button>
                    <button
                      className="text-gray-400 hover:text-red-600 cursor-pointer"
                      onClick={() => confirmDelete(section._id)}
                    >
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
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Manage Questions Button */}
                <Link
                  href={
                    section.type === "reading_comprehension"
                      ? `/admin/section/${section._id}`
                      : `/admin/section/${section._id}/logical-question`
                  }
                >
                  <div className="mt-6">
                    <button className="w-full border border-indigo-200 text-indigo-600 hover:bg-indigo-50 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
                      Manage Questions
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
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </button>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>

      {/* modal */}

      <dialog id="delete_section_modal" className="modal">
        <div className="modal-box bg-white text-black">
          <h3 className="font-bold text-lg">
            Are you sure you want to delete this data?
          </h3>
          <div className="flex justify-end mt-10 gap-5">
            <button className="mr-5" onClick={() => deleteExam()}>
              <a href="#" className="btn">
                Yes
              </a>
            </button>
            <button
              onClick={() =>
                document.getElementById("delete_section_modal").close()
              }
            >
              <a href="#" className="btn" id="no_delete">
                No
              </a>
            </button>
          </div>
        </div>
      </dialog>

      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box space-y-3">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              id="close_modal"
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Create New Section</h3>

          <div className="form space-y-3">
            <label className="input w-full">
              <span className="label mr-2">Name Section</span>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
              />
            </label>

            <label className="select w-full">
              <span className="label">Type</span>
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="reading_comprehension">
                  READING_COMPREHENSION
                </option>
                <option value="logical_reasoning">LOGICAL_REASONING</option>
              </select>
            </label>

            {/* description */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Description</legend>
              <textarea
                className="textarea h-24 w-full"
                name="description"
                placeholder="Section description"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
              <div className="fieldset-label">Your Section description</div>
            </fieldset>

            <label className="input w-full">
              <span className="label mr-2">Estimated Time (Minute)</span>
              <input
                type="number"
                name="estimatedTime"
                placeholder="Estimated Time must be greater than 1"
                value={formData.estimatedTime}
                onChange={handleChange}
              />
            </label>

            <button
              className="btn btn-outline btn-primary w-full"
              onClick={editSection ? handleEdit : handdleSubmit}
            >
              {editSection ? "Edit Section" : "Create Section"}
            </button>
          </div>
        </div>
      </dialog>
    </Layout>
    // </div>
  );
};

export default page;
