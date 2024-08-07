"use client";
import React, { useEffect, useState } from "react";
import { getShowsBy } from "../utils/dbFunctions";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { UserShowStats } from "../interfaces/interfaces";
import Link from "next/link";
import UserShowTile from "../components/UserShowTile";
import { updateShows } from "../utils/updateFunctions";
import Success from "../components/toasts/Success";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";

const Profile = () => {
  const [userShows, setUserShows] = useState<UserShowStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState({ by: "title", asc: true });
  const [notification, setNotification] = useState("");
  const [popup, setPopup] = useState(false);

  const router = useRouter();
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (!user) {
      router.push("/");
    }

    onAuthStateChanged(auth, async () => {
      const currentShows = await getShowsBy(order.by, order.asc);
      if (currentShows) {
        setUserShows(currentShows);
        setLoading(false);
      }

      // Check if the user has any shows with new episodes once a day
      const lastUpdate = localStorage.getItem("lastUpdate");
      const now = new Date().getTime();
      const oneDay = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

      if (!lastUpdate || now - parseInt(lastUpdate) > oneDay) {
        const changedShows = await updateShows();

        if (changedShows && changedShows.length > 0) {
          let text = "These shows have new episodes: ";
          changedShows.forEach((show, index) => {
            text += `${show}${index < changedShows.length - 1 ? ", " : "."}`;
          });
          setNotification(text);
          setPopup(true);
          setTimeout(() => {
            setPopup(false);
          }, 10000);
        }

        localStorage.setItem("lastUpdate", now.toString());
      }
    });
  }, [order]);

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center text-center align-middle">
        <h1 className="align-middle text-2xl font-bold">Loading</h1>
        &nbsp;
        <span className="loading loading-bars loading-md"></span>
      </div>
    );
  }

  if (!loading && userShows.length === 0) {
    return (
      <div className="flex h-[80vh] items-center justify-center text-center align-middle">
        <h1 className="align-middle text-2xl font-bold">
          You don&apos;t have any shows yet! How about adding some shows{" "}
          <Link href="/show-search">
            <strong className="underline">here</strong>
          </Link>
          ?
        </h1>
      </div>
    );
  }

  return (
    <>
      {popup && <Success text={notification} />}
      <div className="overflow-x-auto sm:px-12 md:px-24 lg:px-48 xl:px-60">
        <table className="table">
          <thead>
            <tr>
              {/* <th></th> */}
              <th
                className="hover:cursor-pointer hover:text-white"
                onClick={() => setOrder({ by: "title", asc: !order.asc })}
              >
                Title
              </th>
              <th
                className="p-0 hover:cursor-pointer hover:text-white sm:p-3"
                onClick={() => setOrder({ by: "rating", asc: !order.asc })}
              >
                Rating
              </th>
              <th
                className="hover:cursor-pointer hover:text-white"
                onClick={() =>
                  setOrder({ by: "total_episodes", asc: !order.asc })
                }
              >
                Progress
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="font-bold text-primary">Watching</th>
            </tr>
            {userShows
              .filter((show) => show.status == "watching")
              .map((show) => {
                return <UserShowTile key={show.id} showDetails={{ ...show }} />;
              })}
            <tr>
              <th className="font-bold text-success">Completed</th>
            </tr>
            {userShows
              .filter((show) => show.status == "completed")
              .map((show) => {
                return <UserShowTile key={show.id} showDetails={{ ...show }} />;
              })}
            <tr>
              <th className="font-bold text-warning">Planning</th>
            </tr>
            {userShows
              .filter((show) => show.status == "planning")
              .map((show) => {
                return <UserShowTile key={show.id} showDetails={{ ...show }} />;
              })}
            <tr>
              <th className="font-bold text-error">Dropped</th>
            </tr>
            {userShows
              .filter((show) => show.status == "dropped")
              .map((show) => {
                return <UserShowTile key={show.id} showDetails={{ ...show }} />;
              })}
            <tr>
              <th className="font-bold text-secondary">Paused</th>
            </tr>
            {userShows
              .filter((show) => show.status == "paused")
              .map((show) => {
                return <UserShowTile key={show.id} showDetails={{ ...show }} />;
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Profile;
