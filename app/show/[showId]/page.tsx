"use client";
import React, { useEffect, useState } from "react";
import { auth } from "@/app/config/firebase";
import { fetchShowBanner, getShowDetails } from "@/app/utils/searchFunctions";
import { ShowDetailedInfo, Actor } from "@/app/interfaces/interfaces";
import EditModal from "@/app/components/EditModal";
import { Timestamp } from "firebase/firestore";
import Headshot from "@/app/components/Headshot";
import Image from "next/image";
import placeholder from "@/public/poster-default.webp";
import { checkUserShowStatus } from "@/app/utils/dbFunctions";

const ShowInfo = ({ params }: { params: { showId: string } }) => {
  const [showDetails, setShowDetails] = useState<ShowDetailedInfo | null>(null);
  const [fullSummary, setFullSummary] = useState(false);
  const [banner, setBanner] = useState<undefined | string>(undefined);
  const [userStatus, setUserStatus] = useState<string>("Add to List");
  const [buttonColour, setButtonColour] = useState<string>("btn-primary");

  useEffect(() => {
    // Listener to check if user is signed in, needed so the component doesn't load before fetching user data to check against their list
    const unsubscribe = auth.onAuthStateChanged(async (user: any) => {
      if (user) {
        const showData = await getShowDetails(params.showId);
        setShowDetails(showData || null);
        const banner = await fetchShowBanner(params.showId);
        setBanner(banner);
        const showStatus = await checkUserShowStatus(params.showId);
        setUserStatus(showStatus || "Add to List");
        if (showStatus !== "Add to List") {
          switch (showStatus) {
            case "watching":
              setButtonColour("btn-primary");
              break;
            case "completed":
              setButtonColour("btn-success");
              break;
            case "planning":
              setButtonColour("btn-warning");
              break;
            case "dropped":
              setButtonColour("btn-error");
              break;
            case "paused":
              setButtonColour("btn-secondary");
              break;
            default:
              setButtonColour("btn-primary");
          }
        }
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
    <>
      {banner ? (
        <Image
          src={banner}
          alt={`banner of ${showDetails?.title}`}
          className="z-0 mt-[-5rem] h-52 w-full object-cover object-center md:h-80"
          height={208}
          width={1280}
          priority
        />
      ) : (
        <div className="mb-8"></div>
      )}
      <header className="mb-8 bg-neutral">
        <div className="mt-[-30px] flex flex-row items-start overflow-hidden sm:px-12 md:px-24 lg:px-32 xl:px-48">
          <div className="flex flex-col justify-center ">
            {showDetails.image ? (
              <Image
                src={showDetails?.image}
                alt={`poster of ${showDetails?.title}`}
                className="z-10 mr-[-10px] rounded-none rounded-t-md object-contain"
                width={210}
                height={295}
                priority
              />
            ) : (
              <Image
                className="z-10 mr-[-10px] max-w-[210px] rounded-none rounded-t-md"
                src={placeholder}
                alt="placeholder poster"
              />
            )}
            <button
              className={`btn ${buttonColour} mb-10 w-[153px] rounded-none rounded-b-md capitalize md:w-[210px]`}
              onClick={() =>
                (
                  document.getElementById(
                    `my_modal_${params.showId}`,
                  ) as HTMLDialogElement
                ).showModal()
              }
            >
              {userStatus}
            </button>
          </div>
          <EditModal
            showDetails={{
              ...showDetails,
              current_episode: 0,
              started_watching: Timestamp.now(),
              inLibrary: false,
            }}
          />
          <div className="mb-8 mt-12 flex h-auto min-h-[270px] flex-col rounded-xl p-2 pl-5 sm:pl-10 ">
            <h1 className="mb-5 mt-2 text-2xl font-bold md:text-4xl">
              {showDetails.title}
            </h1>
            <div>
              {showDetails.summary && (
                <>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: fullSummary
                        ? showDetails.summary
                        : `${showDetails.summary.slice(0, 350)}${showDetails.summary.length > 350 ? "..." : ""}`,
                    }}
                    className="peer max-w-7xl text-xs transition-all duration-300 ease-in-out hover:text-white sm:text-sm"
                  />
                  {showDetails.summary.length > 350 && (
                    <button
                      onClick={() => setFullSummary(!fullSummary)}
                      className="mt-[-20px] bg-gradient-to-t from-neutral pt-5 opacity-0 transition-all duration-300 ease-in-out hover:from-transparent hover:opacity-100 peer-hover:opacity-100"
                    >
                      {fullSummary ? "Show Less" : "Show More"}
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </header>
      <div className="sm:px-12 md:px-24 lg:px-32 xl:px-48">
        <div className="flex flex-col md:flex-row">
          {/* Left-Side info section */}
          <div className="mb-5 flex min-w-[210px] flex-row overflow-x-auto rounded-xl bg-neutral p-4 md:flex-col ">
            <div className="mr-4">
              <h2 className="mb-2 font-bold md:mt-2 md:text-xl">Rating</h2>
              <p className="badge badge-success badge-sm md:badge-md">
                {showDetails.rating || "N/A"}
              </p>
            </div>
            <div className="mr-4">
              <h2 className="mb-2 font-bold md:mb-1 md:mt-6 md:text-xl">
                Genres
              </h2>
              <ul className="flex md:flex-col">
                {showDetails.genres.map((genre) => (
                  <li
                    key={genre}
                    className="md:text-md badge mr-1 h-auto overflow-hidden break-words text-center text-xs md:mb-2 md:w-1/2"
                  >
                    {genre}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mr-4">
              <h2 className="mb-2 font-bold md:mt-5 md:text-xl">Episodes</h2>
              <p className="text-xs text-gray-400 md:text-lg">
                {showDetails.total_episodes}
              </p>
            </div>
            <div className="mr-4">
              <h2 className="mb-2 font-bold md:mt-5 md:text-xl">Runtime</h2>
              <p className="text-xs text-gray-400 md:text-lg">
                {showDetails.runtime
                  ? `${showDetails.runtime} minutes`
                  : "unknown"}
              </p>
            </div>
            <div className="mr-4">
              <h2 className="mb-2 font-bold md:mt-5 md:text-xl">Network</h2>
              <p className="text-xs text-gray-400 md:text-lg">
                {showDetails.network}
              </p>
            </div>
            <div className="mr-4">
              <h2 className="mb-2 font-bold md:mt-5 md:text-xl">Status</h2>
              <p className="text-xs text-gray-400 md:text-lg">
                {showDetails.status}
              </p>
            </div>
          </div>
          {/* Cast section */}
          <div className="mb-5 flex max-w-3xl flex-col rounded-xl bg-neutral p-4 md:ml-6 md:w-full xl:max-h-[27rem]">
            <h2 className="mb-3 ml-1 text-lg font-bold">Cast</h2>
            {showDetails.cast.length === 0 ? (
              <p className="ml-5 font-bold">No cast found</p>
            ) : null}
            <ul className="flex flex-row flex-wrap justify-end md:justify-start md:gap-5">
              {showDetails.cast
                .slice(0, 8)
                .map((actor: Actor, index: number) => (
                  <Headshot key={index} actor={actor} id={actor.id} />
                ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowInfo;
