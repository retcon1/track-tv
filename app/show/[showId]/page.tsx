"use client";
import React, { useEffect, useState } from "react";
import { auth } from "@/app/config/firebase";
import { getShowDetails } from "@/app/utils/searchFunctions";
import { ShowDetailedInfo, Actor } from "@/app/interfaces/interfaces";
import EditModal from "@/app/components/EditModal";
import { Timestamp } from "firebase/firestore";

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
    <div className="pt-16 sm:px-12 md:px-24 lg:px-32 xl:px-48">
      <div className="flex justify-center">
        <header className="flex flex-row items-start overflow-hidden ">
          <div className="flex flex-col">
            <img
              src={showDetails?.image}
              alt={`poster of ${showDetails?.title}`}
              className="z-10 mr-[-10px] max-w-[210px] rounded-none rounded-t-md object-contain"
            />
            <button
              className="btn btn-primary mb-10 w-full rounded-none rounded-b-md"
              onClick={() =>
                (
                  document.getElementById("my_modal_1") as HTMLDialogElement
                ).showModal()
              }
            >
              Add to List
            </button>
            <EditModal
              showDetails={{
                ...showDetails,
                current_episode: 0,
                started_watching: Timestamp.now(),
                inLibrary: false,
              }}
            />
          </div>
          <div className="mb-8 mt-12 flex h-auto min-h-[270px] flex-col rounded-xl bg-neutral p-2 pl-10">
            <h1 className="mb-5 mt-2 text-4xl font-bold">
              {showDetails.title}
            </h1>
            <div
              dangerouslySetInnerHTML={{
                __html: fullSummary
                  ? showDetails.summary
                  : `${showDetails.summary?.slice(0, 800)}${showDetails.summary?.length > 800 ? "..." : ""}`,
              }}
              className="peer pr-10 text-sm transition-all duration-300 ease-in-out hover:text-white"
            />
            {showDetails.summary?.length > 800 ? (
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
        {/* Left-Side info section */}
        <div className="mb-5 flex min-w-[12rem] flex-col rounded-xl bg-neutral p-4 ">
          <h2 className="mb-2 mt-2 text-xl font-bold">Rating</h2>
          <p className="badge badge-success">{showDetails.rating || "N/A"}</p>
          <h2 className="mb-1 mt-6 text-xl font-bold">Genres</h2>
          <ul className="flex flex-col">
            {showDetails.genres.map((genre) => (
              <li
                key={genre}
                className="badge mb-2 h-auto w-auto overflow-hidden break-words text-center"
              >
                {genre}
              </li>
            ))}
          </ul>
          <h2 className="mt-5 text-xl font-bold">Episodes</h2>
          <p>{showDetails.total_episodes}</p>
          <h2 className="mt-5 text-xl font-bold">Runtime</h2>
          <p>{showDetails.runtime} minutes</p>
          <h2 className="mt-5 text-xl font-bold">Network</h2>
          <p>{showDetails.network}</p>
          <h2 className="mt-5 text-xl font-bold">Status</h2>
          <p>{showDetails.status}</p>
        </div>
        {/* Cast section */}
        <div className="mb-5 ml-6 flex flex-col rounded-xl bg-neutral p-4">
          <h2 className="mb-1 text-lg">Cast</h2>
          <ul className="flex flex-row flex-wrap justify-start gap-5 ">
            {showDetails.cast.slice(0, 8).map((actor: Actor, index: number) => (
              <li
                key={index}
                className="mb-6 flex w-48 flex-col items-center text-center"
              >
                <img
                  src={actor.headshot}
                  alt={`headshot of ${actor.castName}`}
                  className="mask mask-square z-20 h-24 w-24 rounded-md object-cover transition-all duration-300 ease-in-out hover:opacity-0"
                />
                <img
                  src={actor.charHeadshot || actor.headshot}
                  alt={`picture of ${actor.charName}`}
                  className="mask mask-square z-10 mt-[-6rem] h-24 w-24 rounded-md object-cover transition-opacity duration-300"
                />
                <h2 className="text-sm">{actor.castName}</h2>
                <h3 className="max-w-[126px] text-sm opacity-60">
                  {actor.charName}
                </h3>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ShowInfo;
