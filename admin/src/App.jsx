import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom"; // Import necessary components from react-router-dom
import Login from "./components/Login"; // Import Login component
import Users from "./components/Users"; // Import Users component
import Messages from "./components/Messages"; // Import Messages component

function App() {
  const isAuthenticated = () => {
    return !!localStorage.getItem("token"); // Check if token exists in localStorage
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={isAuthenticated() ? <Users /> : <Navigate to="/login" />}
        />
        <Route
          path="/messages/:userId"
          element={isAuthenticated() ? <Messages /> : <Navigate to="/login" />}
        />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App; // Export the App component
