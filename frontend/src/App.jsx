import { Route, Routes } from "react-router-dom";
import Landing from "./pages/landing/Landing";
import LoginStudent from "./pages/loginStudent/LoginStudent";
import LoginTeacher from "./pages/loginTeacher/LoginTeacher";
import Nav from "./components/Nav";

import "./App.scss";
import Dashboard from "./pages/dashboard/Dashboard";
import Annoncer from "./pages/dashboard/annoncer/Annoncer";
import ProfContextRoutesProvider from "./pages/dashboard/ProfContextRoutesProvider";
import StudentContextRoutesProvider from "./pages/student/StudentContextRoutesProvider";
import Home from "./pages/home/Home";
import ProfAnnonces from "./pages/dashboard/prof annonces/ProfAnnonces";
import AjouterNotes from "./pages/dashboard/ajouter notes/AjouterNotes";
import StudentMarks from "./pages/student/student marks/StudentMarks";
import ProfileStudent from "./pages/student/profile/ProfileStudent";
import UpdatePassword from "./pages/update password/UpdatePassword";
import ProfileProf from "./pages/dashboard/profile/ProfileProf";
import ProfCours from "./pages/prof cours/ProfCours";
import StudentCourses from "./pages/student/student courses/StudentCourses";
import Help from "./pages/help/Help";
function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/help" element={<Help />} />

        {/* dashboard routes */}
        <Route path="/dashboard" element={<ProfContextRoutesProvider />}>
          <Route index element={<Dashboard />} />
          <Route path="login" element={<LoginTeacher />} />
          <Route path="annoncer" element={<Annoncer />} />
          <Route path="mesannonces" element={<ProfAnnonces />} />
          <Route path="ajouter-notes" element={<AjouterNotes />} />
          <Route path="mescours" element={<ProfCours />} />

          <Route path="profile" element={<ProfileProf />} />
          <Route path="modifier-motdepasse" element={<UpdatePassword />} />
        </Route>
        {/* end of dashboard routes */}
        <Route path="/home" element={<Home />} />

        {/* student routes */}
        <Route path="/etudiant" element={<StudentContextRoutesProvider />}>
          <Route path="mesnotes" element={<StudentMarks />} />
          <Route path="profile" element={<ProfileStudent />} />
          <Route path="modifier-motdepasse" element={<UpdatePassword />} />
          <Route path="mescours" element={<StudentCourses />} />
        </Route>
        {/* end of student routes */}

        <Route path="/login" element={<LoginStudent />} />
      </Routes>
    </>
  );
}

export default App;
