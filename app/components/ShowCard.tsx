import React from "react";
import { createShowStats, ShowBasicInfo } from "../interfaces/interfaces";
import { addShowToStash } from "../utils/dbFunctions";

const ShowCard = ({
  id,
  title,
  rating,
  image,
  url,
  genres,
  total_episodes,
}: ShowBasicInfo) => {
  const addToUserList = async () => {
    const show = createShowStats({
      id,
      title,
      status: "Watching",
      rating: 0,
      image,
      url,
      genres,
      total_episodes,
    });
    try {
      addShowToStash(show);
      console.log("Added to user list");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card card-compact m-5 w-[210px] bg-base-300 shadow-xl">
      <figure>
        {image ? <img src={image} /> : <p>Placeholder Image Here</p>}
      </figure>
      <div className="card-body">
        {rating ? <div className="badge badge-success">{rating}</div> : null}
        <h2 className="card-title">{title}</h2>
      </div>
      <button className="btn btn-outline btn-primary rounded-none rounded-t-xl w-auto">
            More Info
          </button>
      <button className="btn btn-primary w-full rounded-none rounded-b-2xl" onClick={addToUserList}>
        Add to List
      </button>
    </div>
  );
};

export default ShowCard;
