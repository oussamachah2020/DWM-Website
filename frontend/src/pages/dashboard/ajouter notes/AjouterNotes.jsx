import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Spinner from "../../../components/Spinner";
import useAuthContext from "../../../hooks/useAuthContext";
import useProfContext from "../../../hooks/useProfContext";
import "./ajouterNotes.scss";
const AjouterNotes = () => {
  const {
    getProfSubjects,
    profSubjects,
    isLoading,
    postMark,
    error,
    success,
    setError,
    setSuccess,
  } = useProfContext();
  const { user } = useAuthContext();

  const [selectedSubject, setSelectedSubject] = useState(null);
  const [subjectStudents, setSubjectStudents] = useState([]);

  const [isLoadingStudents, setIsLoadingStudents] = useState(false);
  const [studentsNotes, setStudentsNotes] = useState([]);
  const [description, setDescription] = useState("");

  const [isPostingNotes, setIsPostingNotes] = useState(false);

  const moduleYear =
    selectedSubject &&
    profSubjects.find((subject) => subject.name === selectedSubject).year;

  const getStudentsByYear = async () => {
    if (!moduleYear) return;
    setIsLoadingStudents(true);
    const year = moduleYear === "1ere année" ? "1" : "2";
    const response = await fetch(`/api/students/${year}`);
    const json = await response.json();
    setSubjectStudents(json);
    setIsLoadingStudents(false);
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
    getStudentsByYear(moduleYear);
    setDescription("");
    setSuccess(null);
    setError(null);
  }, [selectedSubject]);

  useEffect(() => {
    if (!selectedSubject) return;
    if (!subjectStudents) return;
    const initialState = subjectStudents.map((student) => ({
      studentName: student.username,
      mark: "10",
      subjectName: selectedSubject,
      description,
    }));
    setStudentsNotes(initialState);
  }, [subjectStudents]);

  useEffect(() => {
    setStudentsNotes(
      studentsNotes.map((studentNote) => ({ ...studentNote, description }))
    );
  }, [description]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsPostingNotes(true);
      await postMark(studentsNotes);
    } catch (error) {
      setError(error.message);
    }
    setIsPostingNotes(false);
    setDescription("");
  };
  if (isLoading) {
    return (
      <div className="ajouter-notes-page container-fluid">
        <div className="spinner-container">
          <Spinner />
        </div>
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
          {success && <p className="success">{success}</p>}
          {error && <p className="error">{error}</p>}
          {isLoadingStudents ? (
            <Spinner />
          ) : (
            <form onSubmit={handleSubmit}>
              <table>
                {isPostingNotes && (
                  <div className="blurred-bg">
                    <Spinner />
                  </div>
                )}
                <thead>
                  <tr>
                    <th>Etudiant</th>
                    <th>Note</th>
                  </tr>
                </thead>

                <tbody>
                  {subjectStudents.map((student) => {
                    return (
                      <tr key={student._id}>
                        <td>{student.username}</td>
                        <td>
                          <input
                            type="number"
                            required
                            value={
                              studentsNotes.find(
                                (studentNote) =>
                                  studentNote.studentName == student.username
                              )?.mark
                            }
                            onChange={(e) =>
                              setStudentsNotes(
                                studentsNotes.map((studentNote) => {
                                  if (
                                    studentNote.studentName !== student.username
                                  )
                                    return studentNote;
                                  return {
                                    ...studentNote,
                                    mark: e.target.value,
                                  };
                                })
                              )
                            }
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <h3>
                Description: <small>(optionnelle)</small>
              </h3>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                placeholder="ex: Notes du premiere ds"
              />
              <button
                disabled={isPostingNotes}
                className="btn-primary"
                type="submit"
              >
                Envoyer
              </button>
            </form>
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
