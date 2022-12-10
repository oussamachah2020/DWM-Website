import React, { useEffect } from "react";
import ProfContextProvider from "../../contexts/ProfContext";
import StudentContextProvider from "../../contexts/StudentContext";
import useAuthContext from "../../hooks/useAuthContext";
import HomeProf from "./HomeProf";
import HomeStudent from "./HomeStudent";

const Home = () => {
  const { user } = useAuthContext();

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
