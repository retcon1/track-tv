import React, { useEffect, useState } from "react";
import { getCurrentUserShows } from "../utils/dbFunctions";
import ShowCard from "./ShowCard";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { ShowStats } from "../interfaces/interfaces";

const Profile = () => {
  const [userShows, setUserShows] = useState<ShowStats[]>([]);

  const [user, setUser] = useState<null | Object>(null);
  const [loading, setLoading] = useState(true);
  console.log(auth?.currentUser?.email);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      console.log(user);
      const currentShows = await getCurrentUserShows();
      setUserShows(currentShows);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  }

  return (
    <div>
      {userShows.map((show) => {
        return (
          <ShowCard
            key={show.title}
            title={show.title}
            current_episode={show.current_episode}
            total_episodes={show.total_episodes}
            status={show.status}
            rating={show.rating}
            started_watching={show.started_watching}
          />
        );
      })}
    </div>
  );
};

export default Profile;
