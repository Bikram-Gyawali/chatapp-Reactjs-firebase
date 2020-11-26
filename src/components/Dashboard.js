import React from "react";
import Sidebar from "../container/Sidebar/Sidebar";
import Chat from "../container/chat/Chat";
import "../container/Sidebarchat/dashboard.css";
function Dashboard() {
  return (
    <div className="dashboard">
      <div>
        <Sidebar />
      </div>
      <div className="chat">
        <Chat />
      </div>
    </div>
  );
}

export default Dashboard;
