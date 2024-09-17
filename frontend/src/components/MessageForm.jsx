// src/components/MessageForm.jsx
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function MessageForm({ setMessages }) {
  const { user } = useAuth();
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:3000/messages",
        { content },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      const response = await axios.get("http://localhost:3000/messages");
      setMessages(response.data);
      setContent("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border rounded mb-2"
        placeholder="Write your message..."
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Post Message
      </button>
    </form>
  );
}

export default MessageForm;
