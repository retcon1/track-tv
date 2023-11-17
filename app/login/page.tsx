"use client";
import { useState } from "react";
import { logout, signIn, signInGoogle, signUp } from "../utils/authFunctions";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [signUpClicked, setSignUpClicked] = useState(false);
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPass, setSignUpPass] = useState("");

  return (
    <div className="flex justify-center">
      <button onClick={() => setSignUpClicked(!signUpClicked)}>
        {signUpClicked ? "Sign In" : "Sign Up"}
      </button>

      {signUpClicked ? (
        <div>
          <input
            placeholder="Username"
            minLength={6}
            maxLength={10}
            onChange={(e) => setSignUpUsername(e.target.value)}
            className="mx-5"
          />
          <input
            placeholder="Email"
            type="email"
            onChange={(e) => setSignUpEmail(e.target.value)}
            className="mx-5"
          />
          <input
            placeholder="Password"
            type="password"
            minLength={6}
            onChange={(e) => setSignUpPass(e.target.value)}
            className="mx-5"
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
            className="mx-5"
          />
          <input
            placeholder="Password"
            type="password"
            minLength={6}
            onChange={(e) => setPass(e.target.value)}
            className="mx-5"
          />
          <button onClick={() => signIn(email, pass)} className="mx-5">
            Sign In
          </button>

          <button onClick={signInGoogle}>Sign In with Google</button>
        </div>
      )}

      <button onClick={logout} className="mx-5">Logout</button>
    </div>
  );
};

export default Login;
