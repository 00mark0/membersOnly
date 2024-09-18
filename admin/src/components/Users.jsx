import { useState, useEffect } from "react"; // Import useState and useEffect hooks from React
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom for navigation
import axios from "axios"; // Import axios for making HTTP requests

const Users = () => {
  const [users, setUsers] = useState([]); // State for storing the list of users
  const [filteredUsers, setFilteredUsers] = useState([]); // State for storing the filtered list of users
  const [error, setError] = useState(null); // State for storing error messages
  const [search, setSearch] = useState(""); // State for storing the search input
  const navigate = useNavigate(); // Get the navigate function from react-router-dom

  // Fetch users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token"); // Get the token from localStorage
        if (!token) {
          console.error("No token found");
          setError("No token found");
          return;
        }

        // Make a GET request to fetch users
        const response = await axios.get(
          "https://membersonly-ogkg.onrender.com/admin/users",
          {
            headers: { Authorization: `Bearer ${token}` }, // Set the Authorization header with the token
          }
        );
        setUsers(response.data); // Update the users state with the fetched data
        setFilteredUsers(response.data); // Update the filteredUsers state with the fetched data
      } catch (error) {
        console.error("Error fetching users:", error);
        setError(
          error.response ? error.response.data.message : "An error occurred" // Set error message
        );
      }
    };
    fetchUsers(); // Call the fetchUsers function
  }, []); // Empty dependency array means this effect runs once when the component mounts

  // Handle deleting a user
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token"); // Get the token from localStorage
      if (!token) {
        console.error("No token found");
        setError("No token found");
        return;
      }

      // Make a DELETE request to delete the user
      await axios.delete(
        `https://membersonly-ogkg.onrender.com/admin/users/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` }, // Set the Authorization header with the token
        }
      );
      setUsers(users.filter((user) => user.id !== id)); // Update the users state to remove the deleted user
      setFilteredUsers(filteredUsers.filter((user) => user.id !== id)); // Update the filteredUsers state to remove the deleted user
    } catch (error) {
      console.error("Error deleting user:", error);
      setError(
        error.response ? error.response.data.message : "An error occurred" // Set error message
      );
    }
  };

  // Handle deleting all users
  const handleDeleteAllUsers = async () => {
    try {
      const token = localStorage.getItem("token"); // Get the token from localStorage
      if (!token) {
        console.error("No token found");
        setError("No token found");
        return;
      }

      // Make a DELETE request to delete all users except the admin
      await axios.delete("https://membersonly-ogkg.onrender.com/admin/users", {
        headers: { Authorization: `Bearer ${token}` }, // Set the Authorization header with the token
      });
      setUsers(users.filter((user) => user.is_admin)); // Clear the users state except for admin
      setFilteredUsers(filteredUsers.filter((user) => user.is_admin)); // Clear the filteredUsers state except for admin
    } catch (error) {
      console.error("Error deleting all users:", error);
      setError(
        error.response ? error.response.data.message : "An error occurred" // Set error message
      );
    }
  };

  // Handle logging out
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from localStorage
    navigate("/login"); // Navigate to the login page
  };

  // Handle clicking on a user
  const handleUserClick = (id) => {
    navigate(`/messages/${id}`); // Navigate to the messages page for the clicked user
  };

  // Handle search input change
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value); // Update the search state with the input value
    const filtered = users.filter(
      (user) =>
        user.username.toLowerCase().includes(value.toLowerCase()) || // Filter users by username
        user.id.toString().includes(value) // Filter users by ID
    );
    setFilteredUsers(filtered); // Update the filteredUsers state with the filtered list
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Users</h2>
        <button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={handleLogout} // Call handleLogout on button click
        >
          Logout
        </button>
      </div>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by ID, Username, or Email"
          value={search}
          onChange={handleSearch} // Call handleSearch on input change
          className="mb-4 p-2 border rounded"
        />
        <button
          className="bg-red-500 text-white p-2 rounded"
          onClick={handleDeleteAllUsers} // Call handleDeleteAllUsers on button click
        >
          Delete All Users
        </button>
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}{" "}
      {/* Display error message if any */}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 text-center">ID</th>
            <th className="py-2 text-center">Username</th>
            <th className="py-2 text-center">Email</th>
            <th className="py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr
              key={user.id}
              onClick={() => handleUserClick(user.id)} // Call handleUserClick on row click
              className="cursor-pointer"
            >
              <td className="border px-4 py-2 text-center">{user.id}</td>
              <td className="border px-4 py-2 text-center">{user.username}</td>
              <td className="border px-4 py-2 text-center">{user.email}</td>
              <td className="border px-4 py-2 text-center">
                <button
                  className="bg-red-500 text-white p-2 rounded"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the row click event from firing
                    handleDelete(user.id); // Call handleDelete on button click
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users; // Export the Users component
