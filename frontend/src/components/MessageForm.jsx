// src/components/MessageForm.jsx
import { useState } from "react"; // Import useState hook from React
import axios from "axios"; // Import axios for making HTTP requests
import { useAuth } from "../context/AuthContext"; // Import useAuth from the AuthContext
import PropTypes from "prop-types"; // Import PropTypes for prop validation

function MessageForm({ setMessages }) {
  const { user } = useAuth(); // Get the current user from the AuthContext
  const [content, setContent] = useState(""); // State for storing the content of the new message
  const [error, setError] = useState(null); // State for storing error messages

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      // Make a POST request to create a new message
      await axios.post(
        "https://membersonly-ogkg.onrender.com/messages",
        { content }, // Request body with the message content
        {
          headers: { Authorization: `Bearer ${user.token}` }, // Authorization header with the user's token
        }
      );
      // Fetch the updated list of messages
      const response = await axios.get(
        "https://membersonly-ogkg.onrender.com/messages"
      );
      setMessages(response.data); // Update the messages state with the new list of messages
      setContent(""); // Reset the content state
    } catch (err) {
      console.error(err); // Log any errors
      setError(err.response ? err.response.data.message : "An error occurred"); // Set error message
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      {error && <div className="text-red-500 mb-4">{error}</div>}{" "}
      {/* Display error message if any */}
      <textarea
        value={content} // Bind the textarea value to content state
        onChange={(e) => setContent(e.target.value)} // Update content state on change
        className="w-full p-2 border rounded mb-2"
        placeholder="Write your message..."
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Post Message
      </button>
    </form>
  );
}

// Define PropTypes for the MessageForm component
MessageForm.propTypes = {
  setMessages: PropTypes.func.isRequired,
};

export default MessageForm; // Export the MessageForm component
