const getSubjectInfo = async (subjectID) => {
  const response = await fetch(`/api/subjects/${subjectID}`);
  const json = await response.json();
  return json;
};

export { getSubjectInfo };
