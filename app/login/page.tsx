"use client";
import { useEffect, useState } from "react";
import { signIn, signInGoogle, signUp } from "../utils/authFunctions";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { auth } from "../config/firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [signUpClicked, setSignUpClicked] = useState(false);
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPass, setSignUpPass] = useState("");
  const router = useRouter();
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      router.push("/profile");
    }
  }, [user]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-8 md:px-8">
      <div className="rounded-3xl bg-neutral p-10">
        <a
          className="btn btn-outline flex justify-center"
          onClick={() => setSignUpClicked(!signUpClicked)}
        >
          {signUpClicked ? "Sign In" : "Sign Up"}
        </a>

        {signUpClicked ? (
          <form
            className="flex flex-col items-center"
            onSubmit={(e) => {
              e.preventDefault();
              signUp(signUpEmail, signUpPass, signUpUsername);
            }}
          >
            <label className="input input-bordered my-5 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                placeholder="Username"
                minLength={6}
                maxLength={10}
                onChange={(e) => setSignUpUsername(e.target.value)}
                className="mx-5 grow rounded"
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                placeholder="Email"
                type="email"
                onChange={(e) => setSignUpEmail(e.target.value)}
                className="mx-5 grow rounded"
              />
            </label>
            <label className="input input-bordered my-5 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                placeholder="Password"
                type="password"
                minLength={6}
                onChange={(e) => setSignUpPass(e.target.value)}
                className="mx-5 rounded"
              />
            </label>
            <button
              className="btn btn-primary mb-3"
              disabled={
                signUpUsername.length < 6 ||
                signUpEmail.length < 6 ||
                signUpPass.length < 6
              }
              type="submit"
            >
              Sign Up
            </button>
          </form>
        ) : (
          <form
            className="flex flex-col items-center"
            onSubmit={(e) => {
              e.preventDefault();
              signIn(email, pass);
            }}
          >
            <label className="input input-bordered my-5 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                placeholder="Email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                className="mx-5 rounded"
              />
            </label>

            <label className="input input-bordered mb-5 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                placeholder="Password"
                type="password"
                minLength={6}
                onChange={(e) => setPass(e.target.value)}
                className="mx-5 rounded"
              />
            </label>
            <button className="btn btn-primary mb-5 rounded" type="submit">
              Sign In
            </button>

            <a className="btn btn-outline btn-primary" onClick={signInGoogle}>
              Sign In with Google
            </a>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
