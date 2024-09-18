// src/components/Register.jsx
import { useState } from "react"; // Import useState hook from React
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom for navigation
import axios from "axios"; // Import axios for making HTTP requests

function Register() {
  const [username, setUsername] = useState(""); // State for storing the username
  const [email, setEmail] = useState(""); // State for storing the email
  const [password, setPassword] = useState(""); // State for storing the password
  const [confirmPassword, setConfirmPassword] = useState(""); // State for storing the confirm password
  const [error, setError] = useState(null); // State for storing error messages
  const navigate = useNavigate(); // Get the navigate function from react-router-dom

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for email validation
    if (!emailRegex.test(email)) {
      setError("Invalid email format."); // Set error message for invalid email format
      return;
    }

    // Password validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters long."); // Set error message for short password
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match"); // Set error message for mismatched passwords
      return;
    }

    try {
      // Make a POST request to the register endpoint
      await axios.post("https://membersonly-ogkg.onrender.com/auth/register", {
        username,
        email,
        password,
        confirmPassword,
        isAdmin: false, // Set this to true if you want to create an admin user
      });
      // Navigate to the login page with a success message
      navigate("/login", {
        state: { message: "Registration successful! Please log in." },
      });
    } catch (err) {
      // Handle errors
      setError(err.response ? err.response.data.message : "An error occurred"); // Set error message for other errors
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
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
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state on input change
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
        <div className="mb-4">
          <label className="block text-gray-700">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} // Update confirmPassword state on input change
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register; // Export the Register component
