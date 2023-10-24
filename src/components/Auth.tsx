import { useState } from "react";
import { auth } from "../config/firebase";
import { logout, signIn, signInGoogle } from "../utils/authFunctions";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");


  return (
    <div>
      <input
        placeholder="Email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        minLength={6}
        onChange={(e) => setPass(e.target.value)}
      />
      <button onClick={() => signIn(email, pass)}>Sign In</button>

      <button onClick={signInGoogle}>Sing In with Google</button>

      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Auth;
