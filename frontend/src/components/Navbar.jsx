// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white">
          <Link to="/" className="mr-4">
            Home
          </Link>
        </div>
        <div className="text-white flex items-center">
          {user ? (
            <>
              <Link to={`/profile/${user.id}`} className="mr-4">
                {user.username}
              </Link>
              <button onClick={logout} className="text-red-500">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="mr-4">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
