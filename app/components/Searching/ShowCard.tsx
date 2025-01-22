import React, { useState } from "react";
import { ShowBasicInfo } from "../../interfaces/interfaces";
import { addShowToStash, removeShowFromStash } from "../../utils/dbFunctions";
import { createShowStats } from "../../utils/searchFunctions";
import { useRouter } from "next/navigation";
import AddToListDropdown from "./AddToListDropdown";
import placeholder from "@/public/poster-default.webp";
import Image from "next/image";

const ShowCard = ({ ...showBasicInfo }: ShowBasicInfo) => {
  const { id, image, rating, title } = showBasicInfo;

  const [inLibrary, setInLibrary] = useState(showBasicInfo.inLibrary);

  const addToUserList = async (status: string) => {
    const show = await createShowStats(
      {
        ...showBasicInfo,
      },
      status,
    );
    try {
      addShowToStash(show);
      setInLibrary(true);
    } catch (err) {
      alert(err);
    }
  };

  const removeFromUserList = async () => {
    try {
      removeShowFromStash(id);
      setInLibrary(false);
    } catch (err) {
      alert(err);
    }
  };

  const router = useRouter();

  const navigateToDetails = () => {
    // Navigate to the show details page
    router.push(`/show/${id}`);
  };

  return (
    <div className="card card-compact m-2 w-[144px] bg-base-300 shadow-xl lg:m-4 lg:w-[180px]">
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
      </div>
      {inLibrary ? (
        <button
          className="btn btn-warning w-full rounded-none rounded-b-2xl"
          onClick={removeFromUserList}
        >
          Remove from List
        </button>
      ) : (
        <AddToListDropdown addToUserList={addToUserList} />
      )}
    </div>
  );
};

export default ShowCard;
