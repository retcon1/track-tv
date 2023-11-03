import React, { useEffect, useState } from "react";
import { findUserByEmail, getCurrentUserShows } from "../utils/dbFunctions";
import ShowCard from "./ShowCard";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { ShowStats } from "../interfaces/interfaces";
import { useUser } from "./UserContext";

const Profile = () => {
  const [userShows, setUserShows] = useState<ShowStats[]>([]);
  const [loading, setLoading] = useState(true);
  const { setUserData, userData } = useUser();

  useEffect(() => {
    onAuthStateChanged(auth, async () => {
      console.log(auth.currentUser?.uid);
      const currentShows = await getCurrentUserShows();
      if (currentShows) {
        const newUserData = await findUserByEmail();
        if (newUserData) {
          setUserData(newUserData);
        }
        setUserShows(currentShows);
        setLoading(false);
      }
    });
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
    </div>
  );
};

export default Profile;
