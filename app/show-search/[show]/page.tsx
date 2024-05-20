"use client";
import SearchHandler from "@/app/components/SearchHandler";
import ShowCard from "@/app/components/ShowCard";
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
        console.log(user)
        const showData = await searchShow(params.show);
        setShowList(showData || null ); // Set default value of null if showData is undefined
      } else {
        console.log("User not signed in!");
      }
    });

    // Cleanup function to unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  if (!showList) {
    return <h1>Loading...</h1>;
  }

  if (showList.length === 0) {
    return (
      <div>
        <SearchHandler />
        <h1>No shows found, please try again!</h1>
      </div>
    );
  }

  return (
    <div>
      <SearchHandler />
      <div className="row flex flex-wrap justify-center">
        {showList.map((show) => (
          <ShowCard key={show.id} {...show} />
        ))}
      </div>
    </div>
  );
};

export default ShowSearch;
