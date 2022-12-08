import { createContext, useState } from "react";
import useAuthContext from "../hooks/useAuthContext";

export const StudentContext = createContext();

const StudentContextProvider = ({ children }) => {
  const { user } = useAuthContext();
  const [studentRelatedAnnonces, setStudentRelatedAnnonces] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getStudentRelatedAnnonces = async () => {
    if (!user) return;
    setIsLoading(true);
    const studentYear = user.year === "1ere année" ? "1" : "2";
    const response = await fetch(`/api/annonces/${studentYear}`);
    const json = await response.json();
    const annonces = [];
    for (let i = 0; i < json.length; i++) {
      const currentEl = json[i];
      const response = await fetch(`/api/profs/${currentEl.profID}`);
      const prof = await response.json();
      const annonce = {
        id: currentEl._id,
        content: currentEl.content,
        year: currentEl.year,
        createdAt: currentEl.createdAt,
        profUsername: prof.username,
        profEmail: prof.email,
      };
      annonces.push(annonce);
    }
    setStudentRelatedAnnonces(annonces);
    setIsLoading(false);
  };

  const values = {
    getStudentRelatedAnnonces,
    studentRelatedAnnonces,
    error,
    success,
    isLoading,
  };
  return (
    <StudentContext.Provider value={values}>{children}</StudentContext.Provider>
  );
};

export default StudentContextProvider;
