// src/components/MessageBoard.jsx
import { Link } from "react-router-dom";

function MessageBoard({ messages, user }) {
  return (
    <div>
      {messages.map((message) => (
        <div key={message.id} className="border p-4 mb-4">
          <p>{message.content}</p>
          <p className="text-gray-500 text-sm">
            {user && message.username ? (
              <Link to={`/profile/${message.user_id}`}>{message.username}</Link>
            ) : (
              "Anonymous"
            )}{" "}
            - {new Date(message.created_at).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}

export default MessageBoard;
