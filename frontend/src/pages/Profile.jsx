// src/pages/Profile.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [profileUser, setProfileUser] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/messages/user/${id}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        setMessages(response.data);
      } catch (err) {
        setError(
          err.response ? err.response.data.message : "An error occurred"
        );
      }
    };

    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setProfileUser(response.data);
      } catch (err) {
        setError(
          err.response ? err.response.data.message : "An error occurred"
        );
      }
    };

    if (id && user) {
      fetchMessages();
      fetchUser();
    } else {
      setError("User ID is undefined or user is not authenticated");
    }
  }, [id, user]);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleDelete = async (messageId) => {
    try {
      await axios.delete(`http://localhost:3000/messages/${messageId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setMessages(messages.filter((message) => message.id !== messageId));
    } catch (err) {
      setError(err.response ? err.response.data.message : "An error occurred");
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">
        {profileUser ? profileUser.username : "User"}'s Messages
      </h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
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
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;
