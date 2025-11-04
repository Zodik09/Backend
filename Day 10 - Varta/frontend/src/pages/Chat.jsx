import React, { useEffect, useState } from "react";
import { PiPlusBold } from "react-icons/pi";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import socket from "../utils/Socket";
import "../styles/chat.scss";
import instance from "../utils/Router";

const Chat = () => {
  const [chatId, setChatId] = useState("");
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all previous chats
  const fetchChats = async () => {
    try {
      setLoading(true);
      const res = await instance.get("/chat");
      setChatHistory(res?.data?.fetchedChats || []);
    } catch (err) {
      console.error("Failed to fetch chats:", err);
    } finally {
      setLoading(false);
    }
  };

  // Listen for AI responses
  useEffect(() => {
    fetchChats();

    const handleAIAnswer = (ans) => {
      if (ans.chatId === chatId) {
        setMessages((prev) => [...prev, { role: "ai", text: ans.answer }]);
      }
    };

    socket.on("AI-answer", handleAIAnswer);
    return () => socket.off("AI-answer", handleAIAnswer);
  }, [chatId]);

  // Create new chat
  const handleNewChat = async () => {
    const title = window.prompt("Enter chat name:");
    if (!title?.trim()) return;

    try {
      const res = await instance.post("/chat", { title });
      setChatHistory((prev) => [...prev, res.data.chat]);
      setChatId(res.data.chat._id);
      setMessages([]);
    } catch (err) {
      console.error("Failed to create chat:", err);
    }
  };

  // When user selects a chat
  const handleChatSelect = async (chat) => {
    setChatId(chat._id);
    setMessages([]);

    const res = await instance.get("/messages");
    console.log(res);
  };

  // Handle message submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!chatId || !question.trim()) return;

    const newMessage = { role: "user", text: question };
    setMessages((prev) => [...prev, newMessage]);

    socket.emit("message", { chatId, question });
    setQuestion("");
  };

  return (
    <div className="chats">
      <aside className="sidebar">
        <div className="top">
          <button onClick={handleNewChat}>+ New Chat</button>
        </div>

        <nav className="previousChats">
          {loading ? (
            <span>Loading...</span>
          ) : chatHistory.length > 0 ? (
            chatHistory.map((chat) => (
              <button
                key={chat._id}
                className={`chatItem ${chat._id === chatId ? "active" : ""}`}
                onClick={() => handleChatSelect(chat)}
              >
                {chat.title}
              </button>
            ))
          ) : (
            <span>No chats available.</span>
          )}
        </nav>
      </aside>

      <main>
        {chatId ? (
          <>
            <h2>Hello! How can I help you today?</h2>
            <div className="chatSection">
              <div className="chatContainer">
                {messages.map((msg, i) => (
                  <div key={i} className={`msg ${msg.role}`}>
                    {msg.text}
                  </div>
                ))}
              </div>

              <form className="inputField" onSubmit={handleSubmit}>
                <button className="add" type="button">
                  <PiPlusBold />
                </button>
                <input
                  placeholder="Ask anything..."
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  required
                />
                <button className="ask" type="submit">
                  <MdOutlineArrowForwardIos />
                </button>
              </form>
            </div>
          </>
        ) : (
          <h2>Select a chat from the sidebar or create a new one.</h2>
        )}
      </main>
    </div>
  );
};

export default Chat;
