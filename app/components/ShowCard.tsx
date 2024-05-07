import React from "react";
import { ShowBasicInfo } from "../interfaces/interfaces";

const ShowCard = ({ id, title, status, rating, image, url, genres }: ShowBasicInfo) => {
  return (
    <div className="show-card">
      {image ? <img src={image} /> : <p>Placeholder Image Here</p>}
      <h1>{title}</h1>
      <p>Status: {status}</p>
      <p>{rating}</p>
    </div>
  );
};

export default ShowCard;
