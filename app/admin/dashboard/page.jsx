import React from "react";

function Dashboard() {
  return (
    <div>
      <div className="flex justify-between items-center bg-gray-800 text-white p-4">
        <h1 className="text-[20px]">Admin Dashboard</h1>
        <button className=" h-[40px] w-[90px] rounded bg-red-500">
          Sign Out
        </button>
      </div>
      <div className=" mt-5  bg-gray-800 text-white p-4">
        <h1 className="text-[20px]">Admin Dashboard</h1>
        <p className="mt-3">
          Welcome to the admin area. This page is only accesible to users with
          admin role.
        </p>
        <div className="p-5 bg-gray-500">
          <h2 className="mb-2">Admin Actions</h2>
          <p>Manage Exams</p>
          <p>Manage Users</p>
          <p>System Settings</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
