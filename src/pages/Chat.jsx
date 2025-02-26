import { useContext, useEffect } from "react";
import { NavBar } from "../components/NavBar";
import AuthContext from "../context/AuthContext";
import ChatBody from "../components/ChatBody";
import { useState } from "react";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { MdOnlinePrediction } from "react-icons/md";
import { CgMenuGridR } from "react-icons/cg";

import { BiMenuAltLeft, BiMenuAltRight } from "react-icons/bi";

export default function Chat({ socket }) {
  const [messages, setMessages] = useState([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [newUsers, setNewUser] = useState([]);

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
    useEffect(() => {
      socket.on("newUserResponse", (data) => setNewUser(data));
    }, [socket, newUsers]);

    return (
      <div
        className="contain"
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignContent: "flex-start",
          flexDirection: "column",
          width: "300px",
          borderRight: "black 1px solid",

          alignItems: "center",
          padding: "10px",
        }}
      >
        <h2 style={{ borderBottom: "black 1px solid" }}> Active Users</h2>
        {newUsers.map((user) =>
          auth.username !== user.username ? (
            <div
              className="active-container"
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              <MdOnlinePrediction style={{ marginRight: 5 }} />
              <h4 className="active-users" key={user.id}>
                {user.username}
              </h4>
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
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          height: "100vh", // Ensure full height
        }}
      >
        {chatOpen ? (
          <>
            <BiMenuAltRight size={50} onClick={() => setChatOpen(!chatOpen)} />
            <ChatUsers socket={socket} />
          </>
        ) : (
          <BiMenuAltLeft size={50} onClick={() => setChatOpen(!chatOpen)} />
        )}
        {/* Ensure .chat expands and aligns properly */}
        <div
          className="chat"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "10px",
          }}
        >
          <ChatBody messages={messages} />
          <ChatBar socket={socket} />
        </div>
      </div>
    </>
  );
}
