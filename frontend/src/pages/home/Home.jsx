import React, { useEffect } from "react";
import Spinner from "../../components/Spinner";
import ProfContextProvider from "../../contexts/ProfContext";
import StudentContextProvider from "../../contexts/StudentContext";
import useAuthContext from "../../hooks/useAuthContext";
import HomeProf from "./HomeProf";
import HomeStudent from "./HomeStudent";

const Home = () => {
  const { user } = useAuthContext();
  if (!user) {
    return (
      <div className="spinner-container">
        <Spinner />
      </div>
    );
  }
  return (
    <>
      {user?.admin ? (
        <ProfContextProvider>
          <HomeProf />
        </ProfContextProvider>
      ) : (
        <StudentContextProvider>
          <HomeStudent />
        </StudentContextProvider>
      )}
    </>
  );
};

export default Home;
