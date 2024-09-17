// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import necessary components from react-router-dom
import Navbar from "./components/Navbar"; // Import Navbar component
import Home from "./pages/Home"; // Import Home page component
import Login from "./components/Login"; // Import Login component
import Register from "./components/Register"; // Import Register component
import Profile from "./pages/Profile"; // Import Profile page component

function App() {
  return (
    <Router>
      {" "}
      {/* Wrap the application in Router to enable routing */}
      <Navbar /> {/* Render the Navbar component */}
      <Routes>
        {" "}
        {/* Define the routes for the application */}
        <Route path="/" element={<Home />} /> {/* Route for the Home page */}
        <Route path="/login" element={<Login />} />{" "}
        {/* Route for the Login page */}
        <Route path="/register" element={<Register />} />{" "}
        {/* Route for the Register page */}
        <Route path="/profile/:id" element={<Profile />} />{" "}
        {/* Route for the Profile page with dynamic id */}
      </Routes>
    </Router>
  );
}

export default App; // Export the App component
