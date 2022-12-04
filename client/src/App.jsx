import { Route, Routes } from "react-router-dom";
import Landing from "./pages/landing/Landing";
import LoginStudent from "./pages/loginStudent/LoginStudent";
import LoginTeacher from "./pages/loginTeacher/LoginTeacher";
import Nav from "./components/Nav";

import "./App.scss";
import Dashboard from "./pages/dashboard/Dashboard";
function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard">
          <Route index element={<Dashboard />} />
          <Route path="login" element={<LoginTeacher />} />
        </Route>
        <Route path="/login" element={<LoginStudent />} />
      </Routes>
    </>
  );
}

export default App;
