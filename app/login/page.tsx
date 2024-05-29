"use client";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { auth } from "../config/firebase";
import SignUpForm from "../components/auth/SignUpForm";
import LoginForm from "../components/auth/LoginForm";

const Login = () => {
  const [signUpClicked, setSignUpClicked] = useState(false);
  const router = useRouter();
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      router.push("/profile");
    }
  }, [user]);

  return (
    <div className="flex h-dvh  flex-col items-center justify-center px-4 py-8 md:px-8">
      <div className="rounded-3xl bg-neutral p-10">
        <a
          className="btn btn-outline flex justify-center"
          onClick={() => setSignUpClicked(!signUpClicked)}
        >
          {signUpClicked ? "Sign In" : "Sign Up"}
        </a>
        {signUpClicked ? <SignUpForm /> : <LoginForm />}
      </div>
    </div>
  );
};

export default Login;
