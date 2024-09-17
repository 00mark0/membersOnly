// src/pages/Home.jsx
import { useState, useEffect } from "react"; // Import useState and useEffect hooks from React
import axios from "axios"; // Import axios for making HTTP requests
import { useAuth } from "../context/AuthContext"; // Import useAuth from the AuthContext
import MessageBoard from "../components/MessageBoard"; // Import MessageBoard component
import MessageForm from "../components/MessageForm"; // Import MessageForm component

function Home() {
  const { user } = useAuth(); // Get the current user from the AuthContext
  const [messages, setMessages] = useState([]); // State for storing the list of messages
  const [error, setError] = useState(null); // State for storing error messages

  // Fetch messages when the component mounts
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // Make a GET request to fetch messages
        const response = await axios.get("http://localhost:3000/messages");
        setMessages(response.data); // Update the messages state with the fetched data
      } catch (err) {
        // Handle errors
        setError(
          err.response ? err.response.data.message : "An error occurred" // Set error message
        );
      }
    };

    fetchMessages(); // Call the fetchMessages function
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Message Board</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}{" "}
      {/* Display error message if any */}
      {user && <MessageForm setMessages={setMessages} />}{" "}
      {/* Display MessageForm if user is logged in */}
      <MessageBoard messages={messages} setMessages={setMessages} />{" "}
      {/* Display MessageBoard with messages */}
    </div>
  );
}

export default Home; // Export the Home component
