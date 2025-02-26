import { useContext } from "react";
import { NavLink } from "react-router";
import AuthContext from "../context/AuthContext";

export default function ChatBody({ messages }) {
  const auth = useContext(AuthContext);

  console.log("mess", messages);
  return (
    <>
      <header className="chat-mainHeader" style={{}}>
        <h3>Hangout with Colleagues</h3>
        <div className="leaveChat-btn">
          <NavLink className="leaveChat-btn" to="/">
            Leave Chat
          </NavLink>
        </div>
      </header>
      <div className="chat-container">
        {messages?.map((message) =>
          message.name === auth.username ? (
            <div className="message-chats" key={message.id}>
              <p className="sender-name">You</p>
              <div className="message-sender">
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            <div className="message-chats" key={message.id}>
              <p>{message.name}</p>
              <div className="message-recipient">
                <p>{message.text}</p>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
}
