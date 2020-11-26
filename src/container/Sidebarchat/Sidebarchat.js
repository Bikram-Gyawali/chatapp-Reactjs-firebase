import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import "./Sidebarchat.css";
function Sidebarchat({ addNewChat }) {
  const [seed, setSeed] = useState("");
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);
  const newChat = () => {
    const roomName = prompt("Please enter name for chat.");
    if (roomName) {
    }
  };
  return addNewChat ? (
    <div>
      <div onClick={newChat} className="sidebarchat">
        <h2>New chat here</h2>
      </div>
    </div>
  ) : (
    <div className="sidebar-chat">
      <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
      <div className="sidebar-chatinfo">
        <h2>Room Name</h2>
        <p>last seen msg...</p>
      </div>
    </div>
  );
}

export default Sidebarchat;
