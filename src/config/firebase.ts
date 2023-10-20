// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClrq_tfXGvP7fxlusBg4y4xCO4mpkqL-0",
  authDomain: "tracktv-cc99a.firebaseapp.com",
  projectId: "tracktv-cc99a",
  storageBucket: "tracktv-cc99a.appspot.com",
  messagingSenderId: "454117558344",
  appId: "1:454117558344:web:2cf8df700a06fead57307d",
  measurementId: "G-8SB6TTRD49",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Don't need analytics for now...
// const analytics = getAnalytics(app);
