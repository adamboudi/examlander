import firebase from "firebase";
var config = {
  apiKey: "AIzaSyABW_07po68W5TItuiBv6kSBbNhJaRO5jY",
  authDomain: "excal-87585.firebaseapp.com",
  databaseURL: "https://excal-87585.firebaseio.com",
  projectId: "excal-87585",
  storageBucket: "excal-87585.appspot.com",
  messagingSenderId: "566005221493"
};
var fire = firebase.initializeApp(config);
export default fire;
export const auth = firebase.auth();
