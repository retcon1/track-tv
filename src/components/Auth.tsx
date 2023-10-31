import { useState } from "react";
import { logout, signIn, signInGoogle, signUp } from "../utils/authFunctions";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [signUpClicked, setSignUpClicked] = useState(false);
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPass, setSignUpPass] = useState("");

  return (
    <div>
      <button onClick={() => setSignUpClicked(!signUpClicked)}>
        {signUpClicked ? "Sign In" : "Sign Up"}
      </button>

      {signUpClicked ? (
        <div className="signUp">
          <input
            placeholder="Username"
            minLength={6}
            maxLength={10}
            onChange={(e) => setSignUpUsername(e.target.value)}
          />
          <input
            placeholder="Email"
            type="email"
            onChange={(e) => setSignUpEmail(e.target.value)}
          />
          <input
            placeholder="Password"
            type="password"
            minLength={6}
            onChange={(e) => setSignUpPass(e.target.value)}
          />
          <button
            onClick={() => signUp(signUpEmail, signUpPass, signUpUsername)}
          >
            Sign Up
          </button>
        </div>
      ) : (
        <div className="signIn">
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
        </div>
      )}

      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Auth;
