import React, { useState } from "react";
import { useRouter } from "next/navigation";
import placeholder from "@/public/poster-default.webp";
import Image from "next/image";
import { CastShowInfo } from "@/app/interfaces/interfaces";

// No adding to library functionality on this card, simply shows the
const CastShowCard = ({ ...castShowInfo }: CastShowInfo) => {
  const { id, image, rating, title, charName } = castShowInfo;

  const router = useRouter();

  const navigateToDetails = () => {
    // Navigate to the show details page
    router.push(`/show/${id}`);
  };

  return (
    <li className="card card-compact m-2 w-[144px] bg-base-300 shadow-xl lg:m-4 lg:w-[180px]">
      <figure
        className="relative h-48 w-full hover:cursor-pointer lg:h-[252.85px]"
        onClick={navigateToDetails}
      >
        {rating ? (
          <div className="badge badge-success badge-sm absolute bottom-1 left-1 z-50 shadow-md lg:badge-lg">
            {rating}
          </div>
        ) : null}
        {image ? (
          <Image
            alt={`poster of ${title}`}
            width={210}
            height={295}
            src={image}
          />
        ) : (
          <Image src={placeholder} alt="placeholder poster" />
        )}
      </figure>
      <div className="card-body">
        <h2
          className="lg:card-title hover:cursor-pointer hover:underline"
          onClick={navigateToDetails}
        >
          {title}
        </h2>
        <h3>{charName}</h3>
      </div>
    </li>
  );
};

export default CastShowCard;
