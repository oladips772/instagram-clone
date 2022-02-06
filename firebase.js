import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyBNbDOlHw7dPrgqceHG0BIGzPHN6tVsHoE",
  authDomain: "instagram-clone-4103f.firebaseapp.com",
  projectId: "instagram-clone-4103f",
  storageBucket: "instagram-clone-4103f.appspot.com",
  messagingSenderId: "363331419085",
  appId: "1:363331419085:web:da5bec6f559ef6438e2284",
};

//old way of  using firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth, firebase };
