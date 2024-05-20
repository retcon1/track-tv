import React from "react";
import { ShowBasicInfo } from "../interfaces/interfaces";
import { addShowToStash } from "../utils/dbFunctions";
import { createShowStats } from "../utils/searchFunctions";

const ShowCard = ({ ...showBasicInfo }: ShowBasicInfo) => {
  const addToUserList = async () => {
    const show = await createShowStats({
      ...showBasicInfo,
    });
    try {
      addShowToStash(show);
      console.log("Added to user list");
    } catch (err) {
      console.error(err);
    }
  };

  const { image, rating, title, inLibrary } = showBasicInfo;

  return (
    <div className="card card-compact m-5 w-[210px] bg-base-300 shadow-xl">
      <figure>
        {image ? <img src={image} /> : <p>Placeholder Image Here</p>}
      </figure>
      <div className="card-body">
        {rating ? <div className="badge badge-success">{rating}</div> : null}
        <h2 className="card-title">{title}</h2>
      </div>
      <button className="btn btn-outline btn-primary w-auto rounded-none rounded-t-xl">
        More Info
      </button>
      {inLibrary ? (
        <button className="btn btn-warning w-full rounded-none rounded-b-2xl">
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
