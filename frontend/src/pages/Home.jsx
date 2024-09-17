// src/pages/Home.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import MessageBoard from "../components/MessageBoard";
import MessageForm from "../components/MessageForm";

function Home() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("http://localhost:3000/messages");
        setMessages(response.data);
      } catch (err) {
        setError(
          err.response ? err.response.data.message : "An error occurred"
        );
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Message Board</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {user && <MessageForm setMessages={setMessages} />}
      <MessageBoard messages={messages} setMessages={setMessages} />
    </div>
  );
}

export default Home;
