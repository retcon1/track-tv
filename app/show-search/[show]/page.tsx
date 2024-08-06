"use client";
import ShowCard from "@/app/components/Searching/ShowCard";
import { ShowBasicInfo } from "@/app/interfaces/interfaces";
import { searchShow } from "@/app/utils/searchFunctions";
import React, { useEffect, useState } from "react";
import { auth } from "@/app/config/firebase";

const ShowSearch = ({ params }: { params: { show: string } }) => {
  const [showList, setShowList] = useState<ShowBasicInfo[] | null>(null);

  useEffect(() => {
    // Listener to check if user is signed in, needed so the component doesn't load before fetching user data to check against their list
    const unsubscribe = auth.onAuthStateChanged(async (user: any) => {
      if (user) {
        const showData = await searchShow(params.show);
        setShowList(showData || null); // Set default value of null if showData is undefined
      } else {
        console.log("User not signed in!");
      }
    });

    // Cleanup function to unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  if (!showList) {
    return (
      <div className="flex h-[80vh] items-center justify-center text-center align-middle">
        <h1 className="align-middle text-2xl font-bold">Loading</h1>
        &nbsp;
        <span className="loading loading-bars loading-md"></span>
      </div>
    );
  }

  if (showList.length === 0) {
    return (
      <div className="flex h-[80vh] items-center justify-center text-center align-middle">
        <h1>No shows found, please try again!</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center">
      {showList.map((show) => (
        <ShowCard key={show.id} {...show} />
      ))}
    </div>
  );
};

export default ShowSearch;
