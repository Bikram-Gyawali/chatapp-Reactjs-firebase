import React from "react";
import Signup from "./Signup";
import { AuthProvider } from "../context/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import Resetpass from "./Resetpass";
import Update from "./Update";
import Sidebar from "../container/Sidebar/Sidebar";
import Chat from "../container/chat/Chat";
function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />
            <PrivateRoute exact path="/update" component={Update} />
            <Route
              className="w-100"
              style={{ maxWidth: "400px" }}
              path="/signup"
              component={Signup}
            />
            <Route
              className="w-100"
              style={{ maxWidth: "400px" }}
              path="/login"
              component={Login}
            />
            <Route
              className="w-100"
              style={{ maxWidth: "400px" }}
              path="/resetpass"
              component={Resetpass}
            />
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
