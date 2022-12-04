import { useContext } from "react";
import { AuthStudentContext } from "../context/AuthStudentContext";

const useStudentAuthContext = () => {
  const context = useContext(AuthStudentContext);
  if (!context) {
    throw Error(
      "useStudentAuthContext must be used inside AuthStudentProvider"
    );
  }
  return context;
};

export default useStudentAuthContext;
