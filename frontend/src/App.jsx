import { Route, Routes } from "react-router-dom";
import Landing from "./pages/landing/Landing";
import LoginStudent from "./pages/loginStudent/LoginStudent";
import LoginTeacher from "./pages/loginTeacher/LoginTeacher";
import Nav from "./components/Nav";

import "./App.scss";
import Dashboard from "./pages/dashboard/Dashboard";
import Annoncer from "./pages/dashboard/annoncer/Annoncer";
import ProfContextRoutesProvider from "./pages/dashboard/ProfContextRoutesProvider";
import Home from "./pages/home/Home";
import ProfAnnonces from "./pages/dashboard/prof annonces/ProfAnnonces";
function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<ProfContextRoutesProvider />}>
          <Route index element={<Dashboard />} />
          <Route path="login" element={<LoginTeacher />} />
          <Route path="annoncer" element={<Annoncer />} />
          <Route path="mesannonces" element={<ProfAnnonces />} />
        </Route>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<LoginStudent />} />
      </Routes>
    </>
  );
}

export default App;
