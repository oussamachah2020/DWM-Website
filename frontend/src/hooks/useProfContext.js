import { useContext } from "react";
import { ProfContext } from "../contexts/ProfContext";

const useProfContext = () => {
  const context = useContext(ProfContext);
  if (!context) {
    throw Error("useProfContext must be used inside ProfContextProvider");
  }
  return context;
};

export default useProfContext;
