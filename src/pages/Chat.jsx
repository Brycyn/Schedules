import { useContext, useEffect } from "react";
import { NavBar } from "../components/NavBar";
import AuthContext from "../context/AuthContext";
import ChatBody from "../components/ChatBody";
import { useState } from "react";
import { IoPaperPlaneOutline } from "react-icons/io5";

import { TfiMenuAlt } from "react-icons/tfi";

export default function Chat({ socket }) {
  const [messages, setMessages] = useState([]);

  const auth = useContext(AuthContext);

  useEffect(() => {
    socket.on("messageResponse", (data) => setMessages([...messages, data]));
  }, [socket, messages]);

  const ChatBar = ({ socket }) => {
    const [message, setMessage] = useState("");

    function handleMessageSubmit(e) {
      e.preventDefault();
      console.log({ username: auth?.username }, message);

      if (auth.username && message.trim()) {
        socket.emit("message", {
          text: message,
          name: auth.username,
          id: `${socket.id}${Math.random()}`,
          socketID: socket.id,
        });
      }
      setMessage("");
    }
    return (
      <form className="form" onSubmit={handleMessageSubmit}>
        <input
          className="chatBar"
          type="text"
          placeholder="write a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <IoPaperPlaneOutline style={{ margin: 10 }} />
      </form>
    );
  };

  return (
    <>
      <NavBar />
      <div className="chat">
        <ChatBody messages={messages} />
        <ChatBar socket={socket} />
      </div>
    </>
  );
}
