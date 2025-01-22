import React from "react";
import { Actor } from "@/app/interfaces/interfaces";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface HeadshotProps {
  actor: Actor;
  id: string;
}

const Headshot = ({ actor, id }: HeadshotProps) => {
  const router = useRouter();

  const navigateToDetails = () => {
    // Navigate to the cast details page
    router.push(`/cast/${id}`);
  };

  return (
    <li
      key={id}
      className="mb-6 flex w-32 cursor-pointer flex-col items-center text-center md:w-36"
      onClick={navigateToDetails}
    >
      {actor.headshot ? (
        <>
          <Image
            src={actor.headshot}
            alt={`headshot of ${actor.castName}`}
            width={96}
            height={96}
            className="mask mask-square z-20 h-24 w-24 rounded-md object-cover transition-all duration-300 ease-in-out hover:opacity-0"
          />
          <Image
            src={actor.charHeadshot || actor.headshot}
            alt={`picture of ${actor.charName}`}
            width={96}
            height={96}
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
