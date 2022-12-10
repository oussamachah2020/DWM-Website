import React, { useEffect } from "react";
import Spinner from "../../../components/Spinner";
import useAuthContext from "../../../hooks/useAuthContext";
import useStudentContext from "../../../hooks/useStudentContext";
import "./studentMarks.scss";
const StudentMarks = () => {
  const { getStudentMarks, error, isLoading, studentMarks } =
    useStudentContext();
  const { user } = useAuthContext();
  useEffect(() => {
    getStudentMarks();
  }, [user]);

  if (isLoading) {
    return (
      <div className="spinner-container">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="student-marks-page container-fluid">
      {error && <p className="error">{error}</p>}

      {studentMarks.length > 0 ? (
        <>
          <h2>Mes Notes</h2>
          <table>
            <thead>
              <tr>
                <th>Module</th>
                <th>Note</th>
                <th>Description</th>
              </tr>
            </thead>

            <tbody>
              {studentMarks.map((markData) => {
                return (
                  <tr key={markData._id}>
                    <td>{markData.subjectName}</td>
                    <td>{markData.mark}</td>
                    <td>{markData.description}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      ) : (
        <p className="info">
          Aucune note est publié par vos professeurs actuellement
        </p>
      )}
    </div>
  );
};

export default StudentMarks;
