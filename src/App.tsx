import { useEffect, useState } from "react";
import "./App.css";
import Auth from "./components/Auth";
import { getDoc, collection } from "firebase/firestore";
import { auth, db } from "./config/firebase";
import Profile from "./components/Profile";

function App() {
  return (
    <div className="App">
      <Auth />
      <Profile />
    </div>
  );
}

export default App;
