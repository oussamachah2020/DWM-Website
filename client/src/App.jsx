import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/loginStudent/Login";

import "./App.scss";
import Nav from "./components/Nav";
function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
