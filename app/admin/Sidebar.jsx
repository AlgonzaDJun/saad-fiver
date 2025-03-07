// components/Sidebar.js
import React from "react";
import { MdOutlineClose } from "react-icons/md";
import Link from "next/link";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      style={{
        width: "250px",
        height: "100vh",
        backgroundColor: "#333",
        color: "#fff",
        position: "fixed",
        top: "0",
        left: isOpen ? "0" : "-250px",
        transition: "left 0.3s ease",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "20px",
        }}
      >
        <h1>
          <strong>Admin Panel</strong>
        </h1>
        <MdOutlineClose onClick={toggleSidebar} style={{ cursor: "pointer" }} />
      </div>
      <ul>
        <Link href="/admin">
          <li>Dashboard</li>
        </Link>
        <Link href="/admin/exams">
          <li>Exam</li>
        </Link>
        <Link href="/admin/settings">
          <li>Settings</li>
        </Link>
      </ul>
      <ul>
        <Link href="/admin/logout">
          <li>Logout</li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
