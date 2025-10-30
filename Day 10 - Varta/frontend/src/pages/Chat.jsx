import React, { useState } from "react";
import Card from "../components/Card";

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, from: "System", text: "Welcome to the chat!" },
  ]);
  const [text, setText] = useState("");

  const send = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const next = {
      id: Date.now(),
      from: "You",
      text: text.trim(),
    };
    setMessages((s) => [...s, next]);
    setText("");
  };

  return (
    <Card>
      <h2>Chats</h2>
      <div className="chat-window">
        {messages.map((m) => (
          <div key={m.id} className="chat-message">
            <strong>{m.from}:</strong> <span>{m.text}</span>
          </div>
        ))}
      </div>

      <form className="chat-form" onSubmit={send}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message"
        />
        <button className="btn" type="submit">
          Send
        </button>
      </form>
    </Card>
  );
};

export default Chat;
