import React from "react";
import { Outlet } from "react-router-dom";
import StudentContextProvider from "../../contexts/StudentContext";

const StudentContextRoutesProvider = () => {
  return (
    <StudentContextProvider>
      <Outlet />
    </StudentContextProvider>
  );
};

export default StudentContextRoutesProvider;
