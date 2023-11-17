"use client";
import { auth } from "./config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import Login from "./login/page";
// useRouter
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      router.push("/profile");
    }
  }, [user]);

  return (
    <main>
      <Login />
    </main>
  );
}
