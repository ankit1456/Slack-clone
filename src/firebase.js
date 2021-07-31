import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCj9RDFZH2r7XMPnjvISVACbW8pbLf66aw",
  authDomain: "slack-clone-s-d0d8e.firebaseapp.com",
  projectId: "slack-clone-s-d0d8e",
  storageBucket: "slack-clone-s-d0d8e.appspot.com",
  messagingSenderId: "603097457892",
  appId: "1:603097457892:web:ab434d5ba7094ae5f438f1",
  measurementId: "G-0LQBHV4ZE7",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
