// src/pages/Profile.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { id } = useParams(); // Get the user ID from the URL parameters
  const { user, logout } = useAuth(); // Get the logged-in user and logout function from the AuthContext
  const navigate = useNavigate(); // Hook to programmatically navigate to different routes
  const [messages, setMessages] = useState([]); // State to store the user's messages
  const [error, setError] = useState(null); // State to store any error messages
  const [profileUser, setProfileUser] = useState(null); // State to store the profile user data

  useEffect(() => {
    // Function to fetch messages for the user
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `https://membersonly-ogkg.onrender.com/messages/user/${id}`,
          {
            headers: { Authorization: `Bearer ${user.token}` }, // Include the user's token in the request headers
          }
        );
        setMessages(response.data); // Set the fetched messages to the state
      } catch (err) {
        setError(
          err.response ? err.response.data.message : "An error occurred" // Set the error message if the request fails
        );
      }
    };

    // Function to fetch the profile user data
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `https://membersonly-ogkg.onrender.com/users/${id}`,
          {
            headers: { Authorization: `Bearer ${user.token}` }, // Include the user's token in the request headers
          }
        );
        setProfileUser(response.data); // Set the fetched user data to the state
      } catch (err) {
        setError(
          err.response ? err.response.data.message : "An error occurred" // Set the error message if the request fails
        );
      }
    };

    if (id && user) {
      fetchMessages(); // Fetch messages if the user ID and user are defined
      fetchUser(); // Fetch user data if the user ID and user are defined
    } else {
      setError("User ID is undefined or user is not authenticated"); // Set an error message if the user ID or user is not defined
    }
  }, [id, user]); // Dependency array to re-run the effect when the user ID or user changes

  useEffect(() => {
    if (!user) {
      navigate("/"); // Redirect to the home page if the user is not authenticated
    }
  }, [user, navigate]); // Dependency array to re-run the effect when the user or navigate changes

  // Function to handle the deletion of a message
  const handleDelete = async (messageId) => {
    try {
      await axios.delete(
        `https://membersonly-ogkg.onrender.com/messages/${messageId}`,
        {
          headers: { Authorization: `Bearer ${user.token}` }, // Include the user's token in the request headers
        }
      );
      setMessages(messages.filter((message) => message.id !== messageId)); // Remove the deleted message from the state
    } catch (err) {
      setError(
        err.response ? err.response.data.message : "An error occurred" // Set the error message if the request fails
      );
    }
  };

  // Function to handle the deletion of the user's account
  const handleDeleteAccount = async () => {
    try {
      await axios.delete(
        `https://membersonly-ogkg.onrender.com/users/deleteAccount`,
        {
          headers: { Authorization: `Bearer ${user.token}` }, // Include the user's token in the request headers
        }
      );
      logout(); // Log the user out after deleting the account
      navigate("/"); // Redirect to the home page
    } catch (err) {
      setError(
        err.response ? err.response.data.message : "An error occurred" // Set the error message if the request fails
      );
    }
  };

  if (!user) {
    return <div>Loading...</div>; // Show a loading message if the user is not authenticated
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">
        {profileUser ? profileUser.username : "User"}`s Messages
      </h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}{" "}
      {/* Display any error messages */}
      <div>
        {messages.map((message) => (
          <div key={message.id} className="border p-4 mb-4">
            <p>{message.content}</p>
            <p className="text-gray-500 text-sm">
              {new Date(message.created_at).toLocaleString()}
            </p>
            {user.id === message.user_id && (
              <button
                onClick={() => handleDelete(message.id)}
                className="bg-red-500 text-white p-2 rounded"
              >
                Delete
              </button>
            )}{" "}
            {/* Show the delete button only if the logged-in user is the owner of the message */}
          </div>
        ))}
      </div>
      {profileUser && user.id === profileUser.id && (
        <button
          onClick={handleDeleteAccount}
          className="bg-red-500 text-white p-2 rounded mt-4"
        >
          Delete Account
        </button>
      )}{" "}
      {/* Show the delete account button only if the logged-in user is viewing their own profile */}
    </div>
  );
}

export default Profile;
