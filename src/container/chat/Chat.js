import React, { useState, useEffect, useRef } from "react";
import "./Chat.css";
import app from "../../firebase";
import firebase from "firebase";
import Picker from "emoji-picker-react";
import { OverlayTrigger, Popover } from "react-bootstrap";
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
  const scrollBottom = useRef();
  const { currentUser } = useAuth();
  const [input, setInput] = useState();
  const [seed, setSeed] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [chosenEmoji, setChosenEmoji] = useState();
  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject.emoji);
    console.log(chosenEmoji);
    setInput(emojiObject.emoji);
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
    // console.log("you typed>>", input);

    app.firestore().collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: currentUser.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  const down = () => {
    scrollBottom.current.scrollTop = scrollBottom.current.scrollTopMax;
  };

  const Emojis = () => (
    <OverlayTrigger
      trigger="click"
      placement="top"
      overlay={popover}
      delay={{ show: 100, hide: 100 }}
    >
      <IconButton>
        <InsertEmoticon />
      </IconButton>
    </OverlayTrigger>
  );

  const popover = (
    <Popover style={{ width: "500px" }}>
      <Popover.Content>
        <Picker onEmojiClick={onEmojiClick} disableAutoFocus={true} />
      </Popover.Content>
    </Popover>
  );

  return (
    <div className="chat-body">
      <div className="chat-header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat-header-info">
          <h4>{roomName}</h4>
          <p>
            last seen ..
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
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
          <div
          // className={
          //   message.message == chosenEmoji ? "forEmoji" : "forMessage"
          // }
          >
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
              <p style={{ fontSize: "20px" }}>{message.message}</p>
              <small className={"timestamp"}>
                {new Date(message.timestamp?.toDate()).toUTCString()}
              </small>
            </p>
          </div>
        ))}
      </div>

      <div className="chat-footer">
        {/* <IconButton>
          <InsertEmoticon />
        </IconButton> */}
        <Emojis />
        <IconButton>
          <AttachFile />
        </IconButton>
        <form
          required
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
            placeholder="type a message"
            type="text"
          />

          <IconButton
            onClick={(e) => {
              e.preventDefault();
              setInput("");
              sendMessage(e);
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
