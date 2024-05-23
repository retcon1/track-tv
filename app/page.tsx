"use client";
import ShowSplash from "@/public/shows-2021-edited.webp";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./config/firebase";

export default function Home() {
  const router = useRouter();
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      router.push("/profile");
    }
  }, [user]);

  return (
    <main className="p-16">
      <div className="w-[40vw]">
        <h1 className="mb-10 mt-10 flex text-left text-6xl font-bold text-white">
          All your shows
          <br />
          in one place.
        </h1>
        <h2 className="mb-5 text-xl font-bold text-white">
          The golden age of television needs to be tracked somehow! <br />
          Click below to get started...
        </h2>
        <a className="btn btn-secondary" href="/login">
          Sign Up
        </a>
      </div>
      <div>
        <Image
          className="absolute right-0 top-[4.25rem] z-[-1] w-[60vw]"
          src={ShowSplash}
          alt="collage of tv shows"
          priority
        />
      </div>
    </main>
  );
}
