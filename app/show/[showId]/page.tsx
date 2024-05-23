"use client";
import React, { useEffect, useState } from "react";
import { auth } from "@/app/config/firebase";
import { getShowDetails } from "@/app/utils/searchFunctions";
import { ShowDetailedInfo } from "@/app/interfaces/interfaces";

const ShowInfo = ({ params }: { params: { showId: string } }) => {
  const [showDetails, setShowDetails] = useState<ShowDetailedInfo | null>(null);
  const [fullSummary, setFullSummary] = useState(false);

  useEffect(() => {
    // Listener to check if user is signed in, needed so the component doesn't load before fetching user data to check against their list
    const unsubscribe = auth.onAuthStateChanged(async (user: any) => {
      if (user) {
        const showData = await getShowDetails(params.showId);
        setShowDetails(showData || null); // Set default value of null if showData is undefined
      } else {
        console.log("User not signed in!");
      }
    });

    // Cleanup function to unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  if (!showDetails) {
    return (
      <div className="flex h-[80vh] items-center justify-center text-center align-middle">
        <h1 className="align-middle text-2xl font-bold">Loading</h1>
        &nbsp;
        <span className="loading loading-bars loading-md"></span>
      </div>
    );
  }

  return (
    <div className="flex justify-center p-28">
      <header className="flex flex-row items-start overflow-hidden ">
        <img
          src={showDetails?.image}
          alt={`poster of ${showDetails?.title}`}
          className="z-10 mb-10 mr-[-10px] w-1/4 rounded-md object-contain"
        />
        <div className="mt-12 flex h-auto min-h-[270px] flex-col rounded-xl bg-neutral p-2 pl-10">
          <h1 className="mb-5 mt-2 text-4xl font-bold">{showDetails.title}</h1>
          <div
            dangerouslySetInnerHTML={{
              __html: fullSummary
                ? showDetails.summary
                : `${showDetails.summary.slice(0, 800)}${showDetails.summary.length > 800 ? "..." : ""}`,
            }}
            className="peer text-sm transition-all duration-300 ease-in-out hover:text-white"
          />
          {showDetails.summary.length > 800 ? (
            <button
              onClick={() => setFullSummary(!fullSummary)}
              className="mt-[-20px] bg-gradient-to-t from-neutral pt-5 opacity-0 transition-all duration-300 ease-in-out hover:from-transparent hover:opacity-100 peer-hover:opacity-100"
            >
              {fullSummary ? "Show Less" : "Show More"}
            </button>
          ) : null}
        </div>
      </header>
    </div>
  );
};

export default ShowInfo;
