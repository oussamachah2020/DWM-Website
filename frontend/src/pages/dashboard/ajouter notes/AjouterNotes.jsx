import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Spinner from "../../../components/Spinner";
import useAuthContext from "../../../hooks/useAuthContext";
import useProfContext from "../../../hooks/useProfContext";
import "./ajouterNotes.scss";
const AjouterNotes = () => {
  const { getProfSubjects, profSubjects, isLoading } = useProfContext();
  const { user } = useAuthContext();
  //   const options = ["options 1", "option 2", "option 3"];

  const [selectedSubject, setSelectedSubject] = useState(null);
  const [moduleStudents, setModuleStudents] = useState([]);
  const [isLoadingStudents, setIsLoadingStudents] = useState(false);
  const moduleYear =
    selectedSubject &&
    profSubjects.find((subject) => subject.name === selectedSubject).year;
  const getStudentsByYear = async () => {
    if (!moduleYear) return;
    setIsLoadingStudents(true);
    const year = moduleYear === "1ere année" ? "1" : "2";
    const response = await fetch(`/api/students/${year}`);
    const json = await response.json();
    setModuleStudents(json);
    setIsLoadingStudents(false);
    console.log("related students", json);
  };
  useEffect(() => {
    getProfSubjects();
  }, [user]);

  useEffect(() => {
    if (profSubjects.length > 0) {
      setSelectedSubject(profSubjects[0].name);
    }
  }, [profSubjects]);

  useEffect(() => {
    console.log("moduleYear", moduleYear);
    getStudentsByYear(moduleYear);
  }, [selectedSubject]);

  if (isLoading) {
    return (
      <div className="ajouter-notes-page container-fluid">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="ajouter-notes-page container-fluid">
      {profSubjects.length > 0 ? (
        <>
          <header>
            <h1>Ajouter les notes: </h1>
            <div>
              <label htmlFor="module">Module:</label>
              <select
                onChange={(e) => setSelectedSubject(e.target.value)}
                defaultValue={selectedSubject}
              >
                {profSubjects.map((subject) => (
                  <option key={subject._id}>{subject.name}</option>
                ))}
              </select>
            </div>
          </header>
          {isLoadingStudents ? (
            <Spinner />
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Etudiant</th>
                  <th>Note</th>
                </tr>
              </thead>

              <tbody>
                {moduleStudents.map((student) => (
                  <tr key={student._id}>
                    <td>{student.username}</td>
                    <td>$320,000</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      ) : (
        <p className="error">
          Vous n'êtes enseignant d'aucune matière, contactez les administrateurs
          du site pour vous accorder des privilèges de matière
        </p>
      )}
    </div>
  );
};

export default AjouterNotes;
