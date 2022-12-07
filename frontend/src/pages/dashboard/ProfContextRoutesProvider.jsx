import React from "react";
import { Outlet } from "react-router-dom";
import ProfContextProvider from "../../contexts/ProfContext";

const ProfContextRoutesProvider = () => {
  return (
    <ProfContextProvider>
      <Outlet />
    </ProfContextProvider>
  );
};

export default ProfContextRoutesProvider;
