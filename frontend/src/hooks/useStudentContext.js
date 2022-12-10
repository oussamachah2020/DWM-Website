import { useContext } from "react";
import { StudentContext } from "../contexts/StudentContext";

const useStudentContext = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw Error("useStudentContext must be used inside StudentContextProvider");
  }
  return context;
};

export default useStudentContext;
