import React, { useEffect, useState } from "react";
import "../Sidebar/Sidebar.css";
import app from "../../firebase";
import { Alert } from "react-bootstrap";
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { SearchOutlined } from "@material-ui/icons";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Sidebarchat from "../Sidebarchat/Sidebarchat";
import LockIcon from "@material-ui/icons/Lock";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState("");
  const history = useHistory();
  const { logout, currentUser } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  async function logOut() {
    setError("");
    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  useEffect(() => {
    const unSub = app
      .firestore()
      .collection("rooms")
      .onSnapshot((snapshot) =>
        setRooms(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    return () => {
      unSub();
    };
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <IconButton>
          <Avatar src={currentUser.photoURL} />
        </IconButton>
        <div className="sidebar-header-right">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            />
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              style={{ top: "50px" }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={logout}>
                <LockIcon />
                Logout
              </MenuItem>
            </Menu>
          </IconButton>

          <IconButton onClick={logOut}></IconButton>
          {error && <Alert variant="danger">{error} </Alert>}
        </div>
      </div>
      <div className="sidebar-search">
        <div className="search-container">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <input type="text" placeholder="Search or start new chat" />
        </div>
      </div>
      <div className="sidebar-chats">
        <Sidebarchat addNewChat />
        {rooms.map((room) => (
          <Sidebarchat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
