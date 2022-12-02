import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import LoginStudent from "./pages/loginStudent/LoginStudent";
import LoginTeacher from "./pages/dashboard/login/LoginTeacher";
import Nav from "./components/Nav";

import "./App.scss";
function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard">
          <Route path="login" element={<LoginTeacher />} />
        </Route>
        <Route path="/login" element={<LoginStudent />} />
      </Routes>
    </>
  );
}

export default App;
