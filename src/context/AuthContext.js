import React, { useContext, useState, useEffect, useReducer } from "react";
import { auths, gauth } from "../firebase";
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ reducer, initialState, children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return auths.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auths.signInWithEmailAndPassword(email, password);
  }
  function logout() {
    return auths.signOut();
  }
  function resetPass(email) {
    return auths.sendPasswordResetEmail(email);
  }
  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePass(password) {
    return currentUser.updatePassword(password);
  }

  function googleSignIn() {
    return auths.signInWithPopup(gauth);
  }

  useEffect(() => {
    const unsubscribe = auths.onAuthStateChanged((user) => {
      setCurrentUser(user);
      console.log(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);
  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPass,
    updateEmail,
    updatePass,
    googleSignIn,
  };
  return (
    <div>
      <AuthContext.Provider
        value={value}
        reducers={useReducer(reducer, initialState)}
      >
        {!loading && children}
      </AuthContext.Provider>
    </div>
  );
}
