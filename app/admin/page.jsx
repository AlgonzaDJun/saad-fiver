"use client";
import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import CreateExamModal from "./exams/CreateExamModal";
import { FaBars } from "react-icons/fa";
import Exams from "./exams/page";
import Settings from "./settings/page";
import Logout from "./logout/page";
import Dashboard from "./dashboard/page";

const Administrator = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [exams, setExams] = useState([]);
  const [activeComponent, setActiveComponent] = useState("dashboard");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCreateExam = (formData) => {
    setExams([...exams, formData]);
    setIsModalOpen(false);
    console.log("Form Data Submitted:", formData);
  };

  const handleSidebarItemClick = (componentName) => {
    setActiveComponent(componentName);
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 text-white transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform md:relative md:translate-x-0`}
      >
        <div className="p-4 text-lg font-semibold border-b border-gray-700 flex justify-between items-center">
          <span>Dashboard</span>
          <button onClick={toggleSidebar} className="md:hidden text-white">
            ✖
          </button>
        </div>
        <ul className="mt-4 space-y-2 p-4">
          {" "}
          <li>
            <button
              className="w-full text-left p-2 hover:bg-gray-700 rounded"
              onClick={() => handleSidebarItemClick("dashboard")}
            >
              Dashboard
            </button>
          </li>
          <li>
            <button
              className="w-full text-left p-2 hover:bg-gray-700 rounded"
              onClick={() => handleSidebarItemClick("exams")}
            >
              Exams
            </button>
          </li>
          <li>
            <button
              className="w-full text-left p-2 hover:bg-gray-700 rounded"
              onClick={() => handleSidebarItemClick("settings")}
            >
              Settings
            </button>
          </li>
          <li>
            <button
              className="w-full text-left p-2 hover:bg-gray-700 rounded"
              onClick={() => handleSidebarItemClick("logout")}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full">
        <header className="bg-white shadow p-4 flex items-center justify-between md:hidden">
          <button onClick={toggleSidebar} className="text-gray-700 p-2">
            <FaBars size={24} />
          </button>
          <h1 className="text-lg font-semibold">Dashboard Admin</h1>
        </header>

        <main className="p-6 flex-grow overflow-auto">
          {activeComponent === "exams" && <Exams />}
          {activeComponent === "settings" && <Settings />}
          {activeComponent === "logout" && <Logout />}
          {activeComponent === "dashboard" && <Dashboard />}
        </main>
      </div>
    </div>
  );
};

export default Administrator;
