// src/components/MessageBoard.jsx
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes for prop validation

function MessageBoard({ messages, setMessages }) {
  const { user } = useAuth();
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [error, setError] = useState(null); // State for storing error messages

  const handleEdit = (message) => {
    setEditingMessageId(message.id);
    setEditContent(message.content);
  };

  const handleSave = async (messageId) => {
    try {
      const response = await axios.put(
        `https://membersonly-ogkg.onrender.com/messages/${messageId}`,
        { content: editContent },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setMessages(
        messages.map((message) =>
          message.id === messageId ? response.data : message
        )
      );
      setEditingMessageId(null);
      setEditContent("");
    } catch (err) {
      console.error(err);
      setError(err.response ? err.response.data.message : "An error occurred");
    }
  };

  // Sort messages by created_at in descending order
  const sortedMessages = messages
    ? [...messages].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      )
    : [];

  return (
    <div>
      {error && <div className="text-red-500 mb-4">{error}</div>}{" "}
      {/* Display error message if any */}
      {sortedMessages.map((message) => (
        <div key={message.id} className="border p-4 mb-4">
          {editingMessageId === message.id ? (
            <div>
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full p-2 border rounded mb-2"
              />
              <button
                onClick={() => handleSave(message.id)}
                className="bg-blue-500 text-white p-2 rounded"
              >
                Save
              </button>
            </div>
          ) : (
            <div>
              <p>{message.content}</p>
              <p className="text-gray-500 text-sm">
                {new Date(message.created_at).toLocaleString()}
                {message.is_edited && (
                  <span className="text-gray-400"> (edited)</span>
                )}
              </p>
              {user ? (
                <Link
                  to={`/profile/${message.user_id}`}
                  className="text-blue-500"
                >
                  {message.username}
                </Link>
              ) : (
                <span className="text-gray-500">Anonymous</span>
              )}
              {user && user.id === message.user_id && (
                <button
                  onClick={() => handleEdit(message)}
                  className="bg-yellow-500 text-white p-2 rounded ml-2"
                >
                  Edit
                </button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// Define PropTypes for the MessageBoard component
MessageBoard.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      content: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
      is_edited: PropTypes.bool,
      user_id: PropTypes.number.isRequired,
      username: PropTypes.string,
    })
  ).isRequired,
  setMessages: PropTypes.func.isRequired,
};

export default MessageBoard;
