import React from "react";
import { Actor } from "@/app/interfaces/interfaces";
import Image from "next/image";

interface HeadshotProps {
  actor: Actor;
  index: number;
}

const Headshot = ({ actor, index }: HeadshotProps) => {
  return (
    <li
      key={index}
      className="mb-6 flex flex-col items-center text-center w-32 md:w-36"
    >
      {actor.headshot ? (
        <>
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
        </>
      ) : (
        <Image
          alt={`Placeholder image for ${actor.castName}`}
          src="/user.png"
          className="mask mask-square z-20 h-24 w-24 rounded-md object-cover transition-all"
          width={96}
          height={96}
        />
      )}
      <h2 className="text-sm">{actor.castName}</h2>
      <h3 className="max-w-[126px] text-sm opacity-60">{actor.charName}</h3>
    </li>
  );
};

export default Headshot;
