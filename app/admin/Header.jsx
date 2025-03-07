// components/Header.js
import React from "react";
import { FaBars } from "react-icons/fa";

const Header = ({ toggleSidebar }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#444",
        color: "#fff",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <FaBars onClick={toggleSidebar} style={{ cursor: "pointer", marginRight:"5px" }} />
        <h1>Dashboard Admin</h1>
      </div>
      <div>
        <h3>Administrator</h3>
      </div>
    </div>
  );
};

export default Header;
