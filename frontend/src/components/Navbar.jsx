// src/components/Navbar.jsx
import { Link } from "react-router-dom"; // Import Link from react-router-dom for navigation
import { useAuth } from "../context/AuthContext"; // Import useAuth from the AuthContext

function Navbar() {
  const { user, logout } = useAuth(); // Get the current user and logout function from the AuthContext

  return (
    <nav className="bg-gray-800 p-4">
      {" "}
      {/* Navbar container with background color and padding */}
      <div className="container mx-auto flex justify-between items-center">
        {" "}
        {/* Centered container with flexbox layout */}
        <div className="text-white">
          <Link to="/" className="mr-4">
            {" "}
            {/* Link to the home page */}
            Home
          </Link>
        </div>
        <div className="text-white flex items-center">
          {user ? ( // Check if the user is logged in
            <>
              <Link to={`/profile/${user.id}`} className="mr-4">
                {" "}
                {/* Link to the user's profile */}
                {user.username}
              </Link>
              <button onClick={logout} className="text-red-500">
                {" "}
                {/* Logout button */}
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="mr-4">
              {" "}
              {/* Link to the login page if the user is not logged in */}
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar; // Export the Navbar component
