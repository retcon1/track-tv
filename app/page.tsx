"use client";
import HeroShow from "@/public/hero-show.webp";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./config/firebase";
import "../app/globals.css";

export default function Home() {
  const router = useRouter();
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      router.push("/profile");
    }
  }, [user, router]);

  return (
    <main className="min-h-screen p-8 sm:p-16">
      <div className="w-[400px]">
        <h1 className="mb-10 mt-10 flex text-left text-3xl font-bold text-white md:text-6xl">
          All your shows
          <br />
          in one place.
        </h1>
        <h2 className="mb-5 text-sm font-bold text-white sm:text-lg md:text-xl">
          The golden age of television needs to be <br /> tracked somehow!
          <br />
          Click below to get started...
        </h2>
        <a className="btn btn-secondary" href="/login">
          Sign Up
        </a>
      </div>
      <div className="hero-container">
        <Image src={HeroShow} alt="house of the dragon poster" priority />
      </div>
    </main>
  );
}
