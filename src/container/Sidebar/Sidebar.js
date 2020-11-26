import React from "react";
import "../Sidebar/Sidebar.css";
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { SearchOutlined } from "@material-ui/icons";
import Sidebarchat from "../Sidebarchat/Sidebarchat";
function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <IconButton>
          <Avatar />
        </IconButton>
        <div className="sidebar-header-right">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
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
        <Sidebarchat />
        <Sidebarchat />
        <Sidebarchat />
        <Sidebarchat />
        <Sidebarchat />
        <Sidebarchat />
        <Sidebarchat />
      </div>
    </div>
  );
}

export default Sidebar;
