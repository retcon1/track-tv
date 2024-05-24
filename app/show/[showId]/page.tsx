"use client";
import React, { useEffect, useState } from "react";
import { auth } from "@/app/config/firebase";
import { getShowDetails } from "@/app/utils/searchFunctions";
import { ShowDetailedInfo, Actor } from "@/app/interfaces/interfaces";

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
    <div className="p-24">
      <div className="flex justify-center">
        <header className="flex flex-row items-start overflow-hidden ">
          <img
            src={showDetails?.image}
            alt={`poster of ${showDetails?.title}`}
            className="z-10 mb-10 mr-[-10px] w-1/4 rounded-md object-contain"
          />
          <div className="mb-8 mt-12 flex h-auto min-h-[270px] flex-col rounded-xl bg-neutral p-2 pl-10">
            <h1 className="mb-5 mt-2 text-4xl font-bold">
              {showDetails.title}
            </h1>
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
      <div className="flex flex-row">
        <div className="flex w-44 flex-col rounded-xl bg-neutral p-4">
          <h2 className="mt-2 mb-2 text-xl font-bold">Rating</h2>
          <p className="badge badge-success">{showDetails.rating}</p>
          <h2 className="mt-6 text-xl font-bold">Genres</h2>
          <ul className="ml-10 text-left">
            {showDetails.genres.map((genre) => (
              <li key={genre} className="badge">
                {genre}
              </li>
            ))}
          </ul>
          <h2 className="mt-10 text-xl font-bold">Network</h2>
          <p>{showDetails.network}</p>
        </div>
        <div className="ml-6 flex flex-col rounded-xl bg-neutral p-4">
          <h2 className="text-lg mb-1">Cast</h2>
          <ul className="flex flex-row flex-wrap gap-5">
            {showDetails.cast
              .slice(0, 10)
              .map((actor: Actor, index: number) => (
                <li key={index} className="flex flex-col items-center text-center">
                  <img
                    src={actor.headshot}
                    alt={`headshot of ${actor.castName}`}
                    className="mask mask-square h-12 w-12 rounded-sm object-cover"
                  />
                  <h2 className="text-sm">{actor.castName}</h2>
                  <h3 className="text-sm opacity-60 max-w-[126px]">{actor.charName}</h3>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ShowInfo;
