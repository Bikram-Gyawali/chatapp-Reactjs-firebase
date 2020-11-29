import React from "react";
import Sidebar from "../container/Sidebar/Sidebar";
import Chat from "../container/chat/Chat";
import "../container/Sidebarchat/dashboard.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function Dashboard() {
  return (
    <div className="dashboard">
      <Router>
        <Sidebar />
        <Switch>
          <Route path="/dashboard/:roomId">
            <div className="chat">
              <Chat />
            </div>
          </Route>
          <Route path="/dashboard">
            <div className="chat">
              <Chat />
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default Dashboard;
