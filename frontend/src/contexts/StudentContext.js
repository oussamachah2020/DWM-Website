import { createContext, useState } from "react";
import useAuthContext from "../hooks/useAuthContext";
import { getSubjectInfo } from "../utilities/getSubjectInfo";

export const StudentContext = createContext();

const StudentContextProvider = ({ children }) => {
  const { user } = useAuthContext();
  const [studentRelatedAnnonces, setStudentRelatedAnnonces] = useState({});
  const [studentMarks, setStudentMarks] = useState([]);
  const [studentSubjects, setStudentSubjects] = useState([]);
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

  const getStudentMarks = async () => {
    setError(null);
    if (!user) return setError("Vous devez se connecter d'aboard");
    setIsLoading(true);
    const response = await fetch("/api/marks", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();
    const studentMarks = [];
    if (response.ok) {
      for (let i = 0; i < json.length; i++) {
        const doc = json[i];
        const { mark, description, _id } = doc;
        const subjectInfo = await getSubjectInfo(doc.subjectID);
        studentMarks.push({
          mark,
          description,
          subjectName: subjectInfo.name,
          _id,
        });
      }
    } else {
      setError(json.error);
    }

    setStudentMarks(studentMarks);
    setIsLoading(false);
  };

  const getStudentSubjects = async () => {
    setIsLoading(true);
    if (!user) return;
    const response = await fetch("/api/subjects/studentsubjects", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();
    setStudentSubjects(json);
    console.log("student subjects", json);
    setIsLoading(false);
  };
  const values = {
    getStudentRelatedAnnonces,
    studentRelatedAnnonces,
    error,
    success,
    isLoading,
    studentMarks,
    getStudentMarks,
    getStudentSubjects,
    studentSubjects,
  };
  return (
    <StudentContext.Provider value={values}>{children}</StudentContext.Provider>
  );
};

export default StudentContextProvider;
