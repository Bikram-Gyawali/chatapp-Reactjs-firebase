import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
const app = firebase.initializeApp({
  apiKey: "AIzaSyCliONRZIwCQg602wb28Jmd6WzKmV_WmCA",
  authDomain: "kurakani-c769d.firebaseapp.com",
  databaseURL: "https://kurakani-c769d.firebaseio.com",
  projectId: "kurakani-c769d",
  storageBucket: "kurakani-c769d.appspot.com",
  messagingSenderId: "821404720204",
  appId: "1:821404720204:web:81d3344514546a6b25a8e9",
});
export const db = app.firestore();
console.log(firebase);
export const auths = app.auth();
export const gauth = new firebase.auth.GoogleAuthProvider();
export default app;
