import "./App.css";
import Auth from "./components/Auth";
import Profile from "./components/Profile";
import { UserProvider } from "./components/UserContext";

function App() {
  return (
    <div className="App">
      <Auth />
      <UserProvider>
        <Profile />
      </UserProvider>
    </div>
  );
}

export default App;
