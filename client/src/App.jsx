import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";

import "./App.scss";
import Nav from "./components/Nav";
function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
