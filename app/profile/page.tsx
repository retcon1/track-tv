"use client";
import React, { useEffect, useState } from "react";
import { getCurrentUserShows } from "../utils/dbFunctions";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { UserShowStats } from "../interfaces/interfaces";
import Link from "next/link";
import UserShowTile from "../components/UserShowTile";

const Profile = () => {
  const [userShows, setUserShows] = useState<UserShowStats[]>([]);
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
      <div className="flex h-[80vh] items-center justify-center text-center align-middle">
        <h1 className="align-middle text-2xl font-bold">Loading </h1>
        <span className="loading loading-bars loading-md"></span>
      </div>
    );
  }

  if (!loading && userShows.length === 0) {
    return (
      <div>
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
    <div className="overflow-x-auto px-0 md:px-20 ">
      <table className="table">
        <thead>
          <tr>
            {/* <th></th> */}
            <th>Title</th>
            <th>Score</th>
            <th>Progress</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {userShows.map((show, index) => {
            return (
              <UserShowTile
                key={index}
                modalNum={index + 1}
                showDetails={{ ...show }}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Profile;
