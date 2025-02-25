import { useContext, useEffect } from "react";
import { NavBar } from "../components/NavBar";
import AuthContext from "../context/AuthContext";
import ChatBody from "../components/ChatBody";
import { useState } from "react";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { MdOnlinePrediction } from "react-icons/md";

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

  const ChatUsers = ({ socket }) => {
    const [newUsers, setNewUser] = useState([]);

    useEffect(() => {
      socket.on("newUserResponse", (data) => setNewUser(data));
    }, [socket, newUsers]);

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "column",
          width: "300px",
        }}
      >
        <h2 style={{ borderBottom: "black 1px solid" }}> Active Users</h2>
        {newUsers.map((user) =>
          auth.username !== user.username ? (
            <div
              style={{
                flexDirection: "row",
                display: "flex",
                alignItems: "center",
              }}
            >
              <MdOnlinePrediction style={{ marginRight: 5 }} />
              <h4 key={user.id}>{user.username}</h4>
            </div>
          ) : (
            ""
          )
        )}
      </div>
    );
  };
  return (
    <>
      <NavBar />
      <ChatUsers socket={socket} />
      <div className="chat">
        <ChatBody messages={messages} />
        <ChatBar socket={socket} />
      </div>
    </>
  );
}
