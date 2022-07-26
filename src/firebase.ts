import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
  authDomain: "tomateto-dc4e9.firebaseapp.com",
  projectId: "tomateto-dc4e9",
  storageBucket: "tomateto-dc4e9.appspot.com",
  messagingSenderId: "623145589465",
  appId: "1:623145589465:web:b7837a1f86bca1cc2abcc8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("firebase initialized");

//Initialize Firebase Authentication
const auth = getAuth(app);

//Initialize Firebase Storage
const storage = getStorage(app);

//Initialize Cloud Firestore
const db = getFirestore(app);

export { app, auth, storage, db };