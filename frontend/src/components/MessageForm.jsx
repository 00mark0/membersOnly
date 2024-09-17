// src/components/MessageForm.jsx
import { useState } from "react"; // Import useState hook from React
import axios from "axios"; // Import axios for making HTTP requests
import { useAuth } from "../context/AuthContext"; // Import useAuth from the AuthContext

function MessageForm({ setMessages }) {
  const { user } = useAuth(); // Get the current user from the AuthContext
  const [content, setContent] = useState(""); // State for storing the content of the new message

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      // Make a POST request to create a new message
      await axios.post(
        "http://localhost:3000/messages",
        { content }, // Request body with the message content
        {
          headers: { Authorization: `Bearer ${user.token}` }, // Authorization header with the user's token
        }
      );
      // Fetch the updated list of messages
      const response = await axios.get("http://localhost:3000/messages");
      setMessages(response.data); // Update the messages state with the new list of messages
      setContent(""); // Reset the content state
    } catch (err) {
      console.error(err); // Log any errors
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
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

export default MessageForm; // Export the MessageForm component
