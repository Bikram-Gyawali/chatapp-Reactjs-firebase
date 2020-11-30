import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import "./Sidebarchat.css";
import app, { db } from "../../firebase";
import { Link, useParams } from "react-router-dom";
function Sidebarchat({ addNewChat, id, name }) {
  const [seed, setSeed] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState("");

  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, []);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);
  const newChat = () => {
    let roomName = prompt("Please enter name for chat.");
    if (roomName) {
      app.firestore().collection("rooms").add({
        name: roomName,
      });
    }
  };

  useEffect(() => {
    if (roomId) {
      app
        .firestore()
        .collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

      app
        .firestore()
        .collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "dsc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);
  return addNewChat ? (
    <div>
      <div onClick={newChat} className="sidebarchat">
        <h2>New chat here</h2>
      </div>
    </div>
  ) : (
    <Link to={`/dashboard/${id}`} style={{ textDecoration: "none" }}>
      <div className="sidebar-chat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebar-chatinfo">
          <h2 style={{ fontWeight: "bold", fontSize: "20px" }}>{name}</h2>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  );
}

export default Sidebarchat;
