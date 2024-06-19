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
  const [status, setStatus] = useState<string>("Add to List");

  useEffect(() => {
    // Listener to check if user is signed in, needed so the component doesn't load before fetching user data to check against their list
    const unsubscribe = auth.onAuthStateChanged(async (user: any) => {
      if (user) {
        const showData = await getShowDetails(params.showId);
        setShowDetails(showData || null);
        const banner = await fetchShowBanner(params.showId);
        setBanner(banner);
        const showStatus = await checkUserShowStatus(params.showId);
        console.log(showStatus)
        setStatus(showStatus || "Add to List");
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
        <img
          src={banner}
          alt={`banner of ${showDetails?.title}`}
          className="z-0 mt-[-5rem] h-80 w-full object-cover object-center"
        />
      ) : (
        <div className="mb-8"></div>
      )}
      <div className="">
        <header className="mb-8 bg-neutral shadow-xl">
          <div className="mt-[-30px] flex flex-row items-start overflow-hidden sm:px-12 md:px-24 lg:px-32 xl:px-48">
            <div className="flex flex-col">
              {showDetails.image ? (
                <img
                  src={showDetails?.image}
                  alt={`poster of ${showDetails?.title}`}
                  className="z-10 mr-[-10px] max-w-[210px] rounded-none rounded-t-md object-contain"
                />
              ) : (
                <Image className="z-10 mr-[-10px] max-w-[210px] rounded-none rounded-t-md" src={placeholder} alt="placeholder poster" />
              )}
              <button
                className="btn btn-primary mb-10 w-[210px] rounded-none rounded-b-md capitalize"
                onClick={() =>
                  (
                    document.getElementById(
                      `my_modal_${params.showId}`,
                    ) as HTMLDialogElement
                  ).showModal()
                }
              >
                {status}
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
            <div className="rounded-xlp-2 mb-8 mt-12 flex h-auto min-h-[270px] flex-col pl-10 ">
              <h1 className="mb-5 mt-2 text-4xl font-bold">
                {showDetails.title}
              </h1>
              <div>
                {showDetails.summary && (
                  <>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: fullSummary
                          ? showDetails.summary
                          : `${showDetails.summary.slice(0, 800)}${showDetails.summary.length > 800 ? "..." : ""}`,
                      }}
                      className="peer text-sm transition-all duration-300 ease-in-out hover:text-white"
                    />
                    {showDetails.summary.length > 800 && (
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
      </div>
      <div className="sm:px-12 md:px-24 lg:px-32 xl:px-48">
        <div className="flex flex-row">
          {/* Left-Side info section */}
          <div className="mb-5 flex min-w-[210px] flex-col rounded-xl bg-neutral p-4 ">
            <h2 className="mb-2 mt-2 text-xl font-bold">Rating</h2>
            <p className="badge badge-success">{showDetails.rating || "N/A"}</p>
            <h2 className="mb-1 mt-6 text-xl font-bold">Genres</h2>
            <ul className="flex flex-col">
              {showDetails.genres.map((genre) => (
                <li
                  key={genre}
                  className="badge mb-2 h-auto w-1/2 overflow-hidden break-words text-center"
                >
                  {genre}
                </li>
              ))}
            </ul>
            <h2 className="mt-5 text-xl font-bold">Episodes</h2>
            <p>{showDetails.total_episodes}</p>
            <h2 className="mt-5 text-xl font-bold">Runtime</h2>
            <p>
              {showDetails.runtime
                ? `${showDetails.runtime} minutes`
                : "unknown"}
            </p>
            <h2 className="mt-5 text-xl font-bold">Network</h2>
            <p>{showDetails.network}</p>
            <h2 className="mt-5 text-xl font-bold">Status</h2>
            <p>{showDetails.status}</p>
          </div>
          {/* Cast section */}
          <div className="mb-5 ml-6 flex w-full flex-col rounded-xl bg-neutral p-4">
            <h2 className="mb-3 ml-1 text-lg font-bold">Cast</h2>
            {showDetails.cast.length === 0 ? (
              <p className="ml-5 font-bold">No cast found</p>
            ) : null}
            <ul className="flex flex-row flex-wrap justify-start gap-5 ">
              {showDetails.cast
                .slice(0, 8)
                .map((actor: Actor, index: number) => (
                  <Headshot key={index} actor={actor} index={index} />
                ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowInfo;
