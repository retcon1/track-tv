import React, { useState } from "react";
import { ShowBasicInfo } from "../interfaces/interfaces";
import { addShowToStash, removeShowFromStash } from "../utils/dbFunctions";
import { createShowStats } from "../utils/searchFunctions";
import { useRouter } from "next/navigation";

const ShowCard = ({ ...showBasicInfo }: ShowBasicInfo) => {
  const addToUserList = async () => {
    const show = await createShowStats({
      ...showBasicInfo,
    });
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

  const [inLibrary, setInLibrary] = useState(showBasicInfo.inLibrary);

  const { id, image, rating, title } = showBasicInfo;

  return (
    <div className="card card-compact m-5 w-[210px] bg-base-300 shadow-xl">
      <figure>
        {image ? <img src={image} /> : <p>Placeholder Image Here</p>}
      </figure>
      <div className="card-body">
        {rating ? <div className="badge badge-success">{rating}</div> : null}
        <h2 className="card-title">{title}</h2>
      </div>
      <button
        className="btn btn-outline btn-primary w-auto rounded-none rounded-t-xl"
        onClick={navigateToDetails}
      >
        More Info
      </button>
      {inLibrary ? (
        <button
          className="btn btn-warning w-full rounded-none rounded-b-2xl"
          onClick={removeFromUserList}
        >
          Remove from List
        </button>
      ) : (
        <button
          className="btn btn-primary w-full rounded-none rounded-b-2xl"
          onClick={addToUserList}
        >
          Add to List
        </button>
      )}
    </div>
  );
};

export default ShowCard;
