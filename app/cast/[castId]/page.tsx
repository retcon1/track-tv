"use client";
import React, { useEffect, useState } from "react";
import { getCastDetails } from "@/app/utils/searchFunctions";
import Image from "next/image";
import placeholder from "@/public/poster-default.webp";
import { CastDetails } from "@/app/interfaces/interfaces";

const CastInfo = ({ params }: { params: { castId: string } }) => {
  const [castDetails, setCastDetails] = useState<CastDetails | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const cast = await getCastDetails(params.castId);
        setCastDetails(cast!);
      } catch {
        return undefined;
      }
    };
    fetchDetails();
  }, []);

  if (!castDetails) {
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
      <header className="mb-8 bg-neutral">
        <div className=" flex flex-row items-start overflow-hidden sm:px-12 md:px-24 lg:px-32 xl:px-48">
          <div className="flex flex-col justify-center">
            {castDetails.headshot ? (
              <Image
                src={castDetails?.headshot}
                alt={`headshot of ${castDetails?.name}`}
                className="z-10 mr-[-10px] mt-9 rounded object-contain"
                width={210}
                height={295}
                priority
              />
            ) : (
              <Image
                className="z-10 mr-[-10px] mt-9 max-w-[210px] rounded"
                src={placeholder}
                alt="placeholder poster"
              />
            )}
          </div>
          <div className="mb-8 mt-12 flex h-auto min-h-[270px] flex-col rounded-xl p-2 pl-5 sm:pl-10 ">
            <h1 className="mb-5 mt-2 text-2xl font-bold md:text-4xl">
              {castDetails.name}
            </h1>
            <div>
              <ul>
                <li>
                  <span className="font-bold">Age:</span> {castDetails.age}
                </li>
                <li>
                  <span className="font-bold">Birthday:</span>{" "}
                  {castDetails.birthday}
                </li>
                {castDetails.deathday && (
                  <li>
                    <span className="font-bold">Died:</span>{" "}
                    {castDetails.deathday}
                  </li>
                )}
                <li>
                  <span className="font-bold">Gender:</span>{" "}
                  {castDetails.gender}
                </li>
                <li>
                  <span className="font-bold">Born in:</span>{" "}
                  {castDetails.country}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default CastInfo;
