import { Route, Routes } from "react-router-dom";
import Landing from "./pages/landing/Landing";
import LoginStudent from "./pages/loginStudent/LoginStudent";
import LoginTeacher from "./pages/loginTeacher/LoginTeacher";
import Nav from "./components/Nav";

import "./App.scss";
import Dashboard from "./pages/dashboard/Dashboard";
import Annoncer from "./pages/dashboard/annoncer/Annoncer";
import ProfContextRoutesProvider from "./pages/dashboard/ProfContextRoutesProvider";
import useAuthContext from "./hooks/useAuthContext";
import HomeProf from "./pages/home/HomeProf";
import HomeStudent from "./pages/home/HomeStudent";
import Home from "./pages/home/Home";
function App() {
  const { user } = useAuthContext();
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<ProfContextRoutesProvider />}>
          <Route index element={<Dashboard />} />
          <Route path="login" element={<LoginTeacher />} />
          <Route path="annoncer" element={<Annoncer />} />
        </Route>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<LoginStudent />} />
      </Routes>
    </>
  );
}

export default App;
