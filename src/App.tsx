import "./App.css";
import Auth from "./components/Auth";
import Profile from "./components/Profile";
import { Routes, Route, useNavigate } from "react-router-dom";
import { auth } from "./config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

function App() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, [user, navigate]);

  return (
    <div id="root" className="App">
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
