import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import necessary components from react-router-dom
import Login from "./components/Login"; // Import Login component
import Users from "./components/Users"; // Import Users component
import Messages from "./components/Messages"; // Import Messages component

function App() {
  return (
    <Router>
      {" "}
      {/* Wrap the application in Router to enable routing */}
      <Routes>
        {" "}
        {/* Define the routes for the application */}
        <Route path="/login" element={<Login />} />{" "}
        {/* Route for the Login page */}
        <Route path="/dashboard" element={<Users />} />{" "}
        {/* Route for the Users (dashboard) page */}
        <Route path="/messages/:userId" element={<Messages />} />{" "}
        {/* Route for the Messages page with dynamic userId */}
        <Route path="/" element={<Login />} />{" "}
        {/* Default route for the Login page */}
      </Routes>
    </Router>
  );
}

export default App; // Export the App component
