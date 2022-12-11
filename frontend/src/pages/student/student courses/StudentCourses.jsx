import React, { useState } from "react";
import { useEffect } from "react";
import { Trash } from "react-bootstrap-icons";
import Spinner from "../../../components/Spinner";
import useAuthContext from "../../../hooks/useAuthContext";
import useStudentContext from "../../../hooks/useStudentContext";
import "./studentCourses.scss";
const StudentCourses = () => {
  const { user } = useAuthContext();
  const { getStudentSubjects, isLoading, studentSubjects } =
    useStudentContext();
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [fileCategory, setFileCategory] = useState(null);
  const [subjectFiles, setSubjectFiles] = useState({
    cours: [],
    tps: [],
    tds: [],
  });
  useEffect(() => {
    getStudentSubjects();
  }, [user]);

  useEffect(() => {
    if (studentSubjects.length == 0) return setSelectedSubject(null);
    setSelectedSubject(studentSubjects[0].name);
  }, [studentSubjects]);

  const getSubjectFiles = async (subjectName, category) => {
    console.log("trying");
    const response = await fetch(`/api/files/${subjectName}/${category}`);

    const json = await response.json();

    console.log("json", json);
    if (response.ok) {
      setSubjectFiles((prevFiles) => ({ ...prevFiles, [category]: json }));
    } else {
      setSubjectFiles({});
    }
  };
  useEffect(() => {
    console.log("subjectFiles", subjectFiles);
  }, [subjectFiles]);
  useEffect(() => {
    if (!selectedSubject) return;

    getSubjectFiles(selectedSubject, "cours");
    getSubjectFiles(selectedSubject, "tds");
    getSubjectFiles(selectedSubject, "tps");
    console.log("selected subject", selectedSubject);
  }, [selectedSubject]);

  if (isLoading) {
    return (
      <div className="student-cours-page container-fluid">
        <div className="spinner-container">
          <Spinner />
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="student-cours-page container-fluid">
        <h3>Votre Modules</h3>
        <div className="subjects-container">
          {studentSubjects.map((subject) => (
            <div
              onClick={() => setSelectedSubject(subject.name)}
              key={subject._id}
              className={
                subject.name === selectedSubject
                  ? "subject selected"
                  : "subject"
              }
            >
              {subject.name}
            </div>
          ))}
        </div>
        <main>
          <div className="file-container">
            <div className="header">
              <h2 className="file-category">I- Cours</h2>
            </div>
            {subjectFiles.cours.map((file, idx) => (
              <div key={idx} className="file">
                <h4 className="file-name">{file.fileName}</h4>
                <a
                  href={`/uploads/subjects/${selectedSubject}/cours/${file.fileName}`}
                  download
                >
                  download
                </a>
              </div>
            ))}
          </div>
          <div className="file-container">
            <div className="header">
              <h2 className="file-category">II- TD</h2>
            </div>
            {subjectFiles.tds.map((file, idx) => (
              <div key={idx} className="file">
                <h4 className="file-name">{file.fileName}</h4>
                <a
                  href={`/uploads/subjects/${selectedSubject}/tds/${file.fileName}`}
                  download
                >
                  download
                </a>
              </div>
            ))}
          </div>
          <div className="file-container">
            <div className="header">
              <h2 className="file-category">III- TP</h2>
            </div>
            {subjectFiles.tps.map((file, idx) => (
              <div key={idx} className="file">
                <h4 className="file-name">{file.fileName}</h4>
                <a
                  href={`/uploads/subjects/${selectedSubject}/tps/${file.fileName}`}
                  download
                >
                  download
                </a>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default StudentCourses;
