// src/App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"; // Import necessary components from react-router-dom
import Navbar from "./components/Navbar"; // Import Navbar component
import Home from "./pages/Home"; // Import Home page component
import Login from "./components/Login"; // Import Login component
import Register from "./components/Register"; // Import Register component
import Profile from "./pages/Profile"; // Import Profile page component
import { useAuth } from "./context/AuthContext"; // Import useAuth from the AuthContext

function App() {
  const { user } = useAuth(); // Get the current user from the AuthContext

  return (
    <Router>
      <Navbar /> {/* Render the Navbar component */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Route for the Home page */}
        <Route path="/login" element={<Login />} />{" "}
        {/* Route for the Login page */}
        <Route path="/register" element={<Register />} />{" "}
        {/* Route for the Register page */}
        <Route
          path="/profile/:id"
          element={user ? <Profile /> : <Navigate to="/login" />} // Protect the Profile route
        />
      </Routes>
    </Router>
  );
}

export default App; // Export the App component
