"use client";
import React, { useState } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { CiCirclePlus } from "react-icons/ci";
import CreateExamModal from "./CreateExamModal";
import { GoChevronRight } from "react-icons/go";
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import Layout from "../components/SidebarNew";

const Exams = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [exams, setExams] = useState([]); // State untuk menyimpan daftar exam

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCreateExam = (formData) => {
    // Tambahkan exam baru ke dalam state `exams`
    setExams([...exams, formData]);
    setIsModalOpen(false); // Tutup modal setelah submit
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div>
      <div
        style={{
          marginLeft: isSidebarOpen ? "250px" : "0",
          transition: "margin-left 0.3s ease",
          padding: "20px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <h1>
              <strong>Exam Management</strong>
            </h1>
            <p>Create and manage your exam.</p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            style={{
              display: "flex",
              alignItems: "center",
              color: "#fff",
              backgroundColor: "#444",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginTop: "20px",
            }}
          >
            <CiCirclePlus style={{ marginRight: "5px" }} />
            Create New Exam
          </button>
        </div>

        {/* Menampilkan daftar exam dalam bentuk card */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "#f9f9f9",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              color: "red",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h1>
                <strong>ini title</strong>
              </h1>
              <div style={{ display: "flex", alignItems: "center" }}>
                {" "}
                <AiFillEdit />
                <MdDeleteForever />
              </div>
            </div>
            <p>ini deskripsi</p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              {" "}
              <button>Manage</button>
              <GoChevronRight />
            </div>
          </div>
          <div
            style={{
              backgroundColor: "#f9f9f9",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              color: "red",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h1>
                <strong>ini title</strong>
              </h1>
              <div style={{ display: "flex", alignItems: "center" }}>
                {" "}
                <AiFillEdit />
                <MdDeleteForever />
              </div>
            </div>
            <p>ini deskripsi</p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              {" "}
              <button>Manage</button>
              <GoChevronRight />
            </div>
          </div>
          <div
            style={{
              backgroundColor: "#f9f9f9",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              color: "red",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h1>
                <strong>ini title</strong>
              </h1>
              <div style={{ display: "flex", alignItems: "center" }}>
                {" "}
                <AiFillEdit />
                <MdDeleteForever />
              </div>
            </div>
            <p>ini deskripsi</p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              {" "}
              <button>Manage</button>
              <GoChevronRight />
            </div>
          </div>

          {exams.map((exam, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#f9f9f9",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                color: "red",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h1>
                  <strong>{exam.title}</strong>
                </h1>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {" "}
                  <AiFillEdit />
                  <MdDeleteForever />
                </div>
              </div>
              <p>{exam.description}</p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "20px",
                }}
              >
                {" "}
                <button>Manage</button>
                <GoChevronRight />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal untuk Create Exam */}
      <CreateExamModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateExam}
      />
    </div>

    // <Layout>
    //   <div className="p-10 text-black">Please select Exam</div>
    // </Layout>
  );
};

export default Exams;
