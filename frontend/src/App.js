import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import { UserProvider } from "./data/UserContext";

import NavBar from "./components/NavBar";
import Home from "./pages/Home";
//import About from "./pages/About";
//import Service from "./pages/Service";
//import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
//import Logout from "./data/Logout";
function App() {
  return (
    
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
   
  );
}

export default App;
