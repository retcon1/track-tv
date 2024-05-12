import React from "react";
import { createShowStats, ShowBasicInfo } from "../interfaces/interfaces";
import { addShowToStash } from "../utils/dbFunctions";

const ShowCard = ({ id, title, status, rating, image, url, genres }: ShowBasicInfo) => {
  const addToUserList = async () => {
    const show = createShowStats({ id, title, status: "Watching", rating: 0, image, url, genres });
    try {
      addShowToStash(show);
      console.log("Added to user list");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="show-card">
      {image ? <img src={image} /> : <p>Placeholder Image Here</p>}
      <h1>{title}</h1>
      <p>Status: {status}</p>
      <p>{rating}</p>
      <button onClick={addToUserList}>Add to List</button>
    </div>
  );
};

export default ShowCard;
