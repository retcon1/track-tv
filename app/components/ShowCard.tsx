import React, { useState } from "react";
import { ShowBasicInfo } from "../interfaces/interfaces";
import { addShowToStash, removeShowFromStash } from "../utils/dbFunctions";
import { createShowStats } from "../utils/searchFunctions";
import { useRouter } from "next/navigation";

const ShowCard = ({ ...showBasicInfo }: ShowBasicInfo) => {
  const addToUserList = async (status: string) => {
    const show = await createShowStats({
      ...showBasicInfo,
    }, status);
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
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-primary w-full rounded-none rounded-b-2xl"
          >
            Add to List ⬇️
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content absolute z-[1]  w-full items-center rounded-none rounded-b-2xl rounded-t-2xl bg-primary text-base-100 shadow"
          >
            <li
              className="w-full cursor-pointer items-center hover:btn-ghost"
              onClick={() => addToUserList("watching")}
            >
              <a>Watching</a>
            </li>
            <li
              className="w-full cursor-pointer items-center hover:btn-ghost"
              onClick={() => addToUserList("planning")}
            >
              <a>Planning</a>
            </li>
            <li
              className="w-full cursor-pointer items-center hover:btn-ghost"
              onClick={() => addToUserList("completed")}
            >
              <a>Completed</a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ShowCard;
