import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Messages = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          setError("No token found");
          return;
        }

        const response = await axios.get(
          `http://localhost:3000/admin/users/${userId}`, // Update the URL to match the new route
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUsername(response.data.username);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setError(
          error.response ? error.response.data.message : "An error occurred"
        );
      }
    };

    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          setError("No token found");
          return;
        }

        const response = await axios.get(
          `http://localhost:3000/messages/user/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
        setError(
          error.response ? error.response.data.message : "An error occurred"
        );
      }
    };

    fetchUserDetails();
    fetchMessages();
  }, [userId]);

  const handleDeleteMessage = async (messageId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        setError("No token found");
        return;
      }

      await axios.delete(`http://localhost:3000/admin/message/${messageId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(messages.filter((message) => message.id !== messageId));
    } catch (error) {
      console.error("Error deleting message:", error);
      setError(
        error.response ? error.response.data.message : "An error occurred"
      );
    }
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Messages for {username}</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">ID</th>
            <th className="py-2">Content</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message) => (
            <tr key={message.id}>
              <td className="border px-4 py-2">{message.id}</td>
              <td className="border px-4 py-2">{message.content}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-red-500 text-white p-2 rounded"
                  onClick={() => handleDeleteMessage(message.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="bg-gray-500 text-white p-2 rounded mt-4"
        onClick={handleBackToDashboard}
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default Messages;
