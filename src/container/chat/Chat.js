import React, { useState, useEffect, useRef, useCallBack } from "react";
import "./Chat.css";
import app from "../../firebase";
import firebase from "firebase";

import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  MoreVert,
  SearchOutlined,
  InsertEmoticon,
  Mic,
} from "@material-ui/icons";
import SendIcon from "@material-ui/icons/Send";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
function Chat() {
  const { currentUser } = useAuth();
  const [input, setInput] = useState();
  const [seed, setSeed] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const scrollBottom = useRef();
  const [scrollHt, setScrollHt] = useState();

  const enableScroll = () => {
    scrollBottom.current.scrollTop = scrollBottom.current.scrollTopMax;
  };

  // console.log(currentUser);

  // const scrollToEnd = () => {
  //   let container = document.querySelector(".chat-box");
  //   let scrollHeight = container.scrollHeight();
  // };

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
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("you typed>>", input);

    app.firestore().collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: currentUser.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  const down = () => {
    scrollBottom.current.scrollTop = scrollBottom.current.scrollTopMax;
  };
  console.log(scrollHt);
  console.log(scrollBottom.current);
  return (
    <div className="chat-body">
      <div className="chat-header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat-header-info">
          <h4>{roomName}</h4>
          {/* <p>{timestamp}</p> */}
        </div>
        <div className="chat-headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>

          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div ref={scrollBottom} className="chat-box">
        {messages.map((message) => (
          <div>
            <p
              className={
                message.name !== currentUser.displayName
                  ? "chat-message"
                  : "chat-receiver"
              }
            >
              <small
                id="small"
                style={{ fontSize: "10px", top: "-20px", position: "relative" }}
              >
                {message.name}
              </small>
              <p>{message.message}</p>
              <small className={"timestamp"}>
                {new Date(message.timestamp?.toDate()).toUTCString()}
              </small>
            </p>
          </div>
        ))}
      </div>
      <div className="chat-footer">
        <IconButton>
          <InsertEmoticon />
        </IconButton>
        <IconButton>
          <AttachFile />
        </IconButton>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(e);
            setInput("");
          }}
        >
          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              down();
            }}
            // onLoad={enableScroll()}
            placeholder="type a message"
            type="text"
          />

          <IconButton
            onClick={(e) => {
              e.preventDefault();
              setInput("");
              sendMessage(e);
              down();
            }}
          >
            <SendIcon />
          </IconButton>
        </form>
        <IconButton>
          <Mic />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;
