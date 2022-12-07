import { createContext, useState } from "react";
import useAuthContext from "../hooks/useAuthContext";

export const StudentContext = createContext();

const StudentContextProvider = ({ children }) => {
  const { user } = useAuthContext();
  const [studentRelatedAnnonces, setStudentRelatedAnnonces] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getStudentRelatedAnnonces = async () => {};

  const values = { getStudentRelatedAnnonces, error, success, isLoading };
  return (
    <StudentContext.Provider value={values}>{children}</StudentContext.Provider>
  );
};

export default StudentContextProvider;
