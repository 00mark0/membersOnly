// src/components/Login.jsx
import { useState } from "react"; // Import useState hook from React
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate and Link from react-router-dom
import axios from "axios"; // Import axios for making HTTP requests
import { useAuth } from "../context/AuthContext"; // Import useAuth from the AuthContext

function Login() {
  const [username, setUsername] = useState(""); // State for storing the username
  const [password, setPassword] = useState(""); // State for storing the password
  const [error, setError] = useState(null); // State for storing error messages
  const { login } = useAuth(); // Get the login function from the AuthContext
  const navigate = useNavigate(); // Get the navigate function from react-router-dom

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      // Make a POST request to the login endpoint
      const response = await axios.post("http://localhost:3000/auth/login", {
        username,
        password,
      });
      login(response.data); // Call the login function with the response data
      navigate("/"); // Navigate to the home page
    } catch (err) {
      // Handle errors
      if (err.response && err.response.status === 401) {
        setError("Incorrect username or password"); // Set error message for incorrect credentials
      } else {
        setError(
          err.response ? err.response.data.message : "An error occurred" // Set error message for other errors
        );
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}{" "}
      {/* Display error message if any */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Update username state on input change
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state on input change
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Login
        </button>
      </form>
      <div className="mt-4">
        <p>
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login; // Export the Login component
