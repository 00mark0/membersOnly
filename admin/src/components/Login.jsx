import { useState } from "react"; // Import useState hook from React
import axios from "axios"; // Import axios for making HTTP requests
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom for navigation

const Login = () => {
  const [username, setUsername] = useState(""); // State for storing the username
  const [password, setPassword] = useState(""); // State for storing the password
  const [error, setError] = useState(""); // State for storing error messages
  const navigate = useNavigate(); // Get the navigate function from react-router-dom

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      // Make a POST request to the login endpoint
      const response = await axios.post("http://localhost:3000/auth/login", {
        username,
        password,
      });
      if (response.data.isAdmin) {
        localStorage.setItem("token", response.data.token); // Store the token in localStorage
        navigate("/dashboard"); // Navigate to the dashboard page
      } else {
        setError("Access denied. Admins only."); // Set error message for non-admin users
      }
    } catch (error) {
      console.error("Login error:", error); // Log any errors
      setError("Login failed. Please try again."); // Set error message for login failure
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
      <form onSubmit={handleLogin}>
        {error && <p className="text-red-500 mb-4">{error}</p>}{" "}
        {/* Display error message if any */}
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Update username state on input change
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state on input change
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login; // Export the Login component
