import React from "react";
import "../styles/chat.scss";

const Chat = () => {
  return (
    <div className="chats">
      <aside className="sidebar">
        <div className="top">
          <button>+ New chat</button>
        </div>
        <nav className="previousChats">
          {Array.from({ length: 20 }).map((_, index) => (
            <button key={index} className="chatItem">
              Previous Chat {index + 1}
            </button>
          ))}
        </nav>
      </aside>

      <main>
        <h2>Where should we begin?</h2>

        <div className="chatSection">
          <div className="chatContainer"></div>
          <section className="inputField">
            <button className="add">+</button>
            <input placeholder="Ask anything" />
            <button className="ask">🎤</button>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Chat;
