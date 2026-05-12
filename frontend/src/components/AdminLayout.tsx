import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export const AdminLayout = () => {
  const role = localStorage.getItem("role");

  //  защита
  if (role !== "admin") {
    window.location.href = "/";
    return null;
  }

  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <div className="flex-1 p-6 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};