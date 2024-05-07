"use client";
import React, { useEffect, useState } from "react";
import { getCurrentUserShows } from "../utils/dbFunctions";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { ShowStats } from "../interfaces/interfaces";
import ShowCard from "../components/UserShowCard";
import Link from "next/link";
import Logout from "../components/Logout";

const Profile = () => {
  const [userShows, setUserShows] = useState<ShowStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, async () => {
      const currentShows = await getCurrentUserShows();
      if (currentShows) {
        setUserShows(currentShows);
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return (
      <div>
        <h1>Loading..</h1>
      </div>
    );
  }

  if (!loading && userShows.length === 0) {
    return (
      <div>
        <Logout />
        <h1>
          You don't have any shows yet! How about adding some
          <Link href="/show-search">
            <strong> here</strong>
          </Link>
          ?
        </h1>
      </div>
    );
  }

  return (
    <div>
      <Logout />
      {userShows.map((show) => {
        return (
          <ShowCard
            key={show.id}
            id={show.id}
            title={show.title}
            current_episode={show.current_episode}
            total_episodes={show.total_episodes}
            status={show.status}
            rating={show.rating}
            started_watching={show.started_watching}
          />
        );
      })}
      <Link href="/show-search">Click to add another show!</Link>
    </div>
  );
};

export default Profile;
