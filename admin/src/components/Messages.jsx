import { useState, useEffect } from "react"; // Import useState and useEffect hooks from React
import { useParams, useNavigate } from "react-router-dom"; // Import useParams and useNavigate from react-router-dom for routing
import axios from "axios"; // Import axios for making HTTP requests

const Messages = () => {
  const { userId } = useParams(); // Get the userId parameter from the URL
  const navigate = useNavigate(); // Get the navigate function from react-router-dom
  const [messages, setMessages] = useState([]); // State for storing the list of messages
  const [username, setUsername] = useState(""); // State for storing the username
  const [error, setError] = useState(null); // State for storing error messages

  // Fetch user details and messages when the component mounts or userId changes
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token"); // Get the token from localStorage
        if (!token) {
          console.error("No token found");
          setError("No token found");
          return;
        }

        // Make a GET request to fetch user details
        const response = await axios.get(
          `http://localhost:3000/admin/users/${userId}`, // Update the URL to match the new route
          {
            headers: { Authorization: `Bearer ${token}` }, // Set the Authorization header with the token
          }
        );
        setUsername(response.data.username); // Update the username state with the fetched data
      } catch (error) {
        console.error("Error fetching user details:", error);
        setError(
          error.response ? error.response.data.message : "An error occurred" // Set error message
        );
      }
    };

    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("token"); // Get the token from localStorage
        if (!token) {
          console.error("No token found");
          setError("No token found");
          return;
        }

        // Make a GET request to fetch messages
        const response = await axios.get(
          `http://localhost:3000/messages/user/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` }, // Set the Authorization header with the token
          }
        );
        setMessages(response.data); // Update the messages state with the fetched data
      } catch (error) {
        console.error("Error fetching messages:", error);
        setError(
          error.response ? error.response.data.message : "An error occurred" // Set error message
        );
      }
    };

    fetchUserDetails(); // Call the fetchUserDetails function
    fetchMessages(); // Call the fetchMessages function
  }, [userId]); // Dependency array means this effect runs when userId changes

  // Handle deleting a message
  const handleDeleteMessage = async (messageId) => {
    try {
      const token = localStorage.getItem("token"); // Get the token from localStorage
      if (!token) {
        console.error("No token found");
        setError("No token found");
        return;
      }

      // Make a DELETE request to delete the message
      await axios.delete(`http://localhost:3000/admin/message/${messageId}`, {
        headers: { Authorization: `Bearer ${token}` }, // Set the Authorization header with the token
      });
      setMessages(messages.filter((message) => message.id !== messageId)); // Update the messages state to remove the deleted message
    } catch (error) {
      console.error("Error deleting message:", error);
      setError(
        error.response ? error.response.data.message : "An error occurred" // Set error message
      );
    }
  };

  // Handle deleting all messages
  const handleDeleteAllMessages = async () => {
    try {
      const token = localStorage.getItem("token"); // Get the token from localStorage
      if (!token) {
        console.error("No token found");
        setError("No token found");
        return;
      }

      // Make a DELETE request to delete all messages
      await axios.delete("http://localhost:3000/admin/message/all", {
        headers: { Authorization: `Bearer ${token}` }, // Set the Authorization header with the token
      });
      setMessages([]); // Clear the messages state
    } catch (error) {
      console.error("Error deleting all messages:", error);
      setError(
        error.response ? error.response.data.message : "An error occurred" // Set error message
      );
    }
  };

  // Handle navigating back to the dashboard
  const handleBackToDashboard = () => {
    navigate("/dashboard"); // Navigate to the dashboard page
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Messages for {username}</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}{" "}
      {/* Display error message if any */}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 text-center">ID</th>
            <th className="py-2 text-center">Content</th>
            <th className="py-2 text-center">Created At</th>
            <th className="py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message) => (
            <tr key={message.id}>
              <td className="border px-4 py-2 text-center">{message.id}</td>
              <td className="border px-4 py-2 text-center">
                {message.content}
              </td>
              <td className="border px-4 py-2 text-center">
                {new Date(message.created_at).toLocaleString()}
              </td>
              <td className="border px-4 py-2 text-center">
                <button
                  className="bg-red-500 text-white p-2 rounded"
                  onClick={() => handleDeleteMessage(message.id)} // Call handleDeleteMessage on button click
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="bg-red-500 text-white p-2 rounded mt-4"
        onClick={handleDeleteAllMessages} // Call handleDeleteAllMessages on button click
      >
        Delete All Messages
      </button>
      <button
        className="bg-gray-500 text-white p-2 rounded mt-4"
        onClick={handleBackToDashboard} // Call handleBackToDashboard on button click
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default Messages; // Export the Messages component
