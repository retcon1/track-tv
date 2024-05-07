import React from "react";
import { ShowStats } from "../interfaces/interfaces";
import AddEp from "./AddEp";

const UserShowCard = ({
  id,
  title,
  current_episode,
  total_episodes,
  status,
  rating,
  started_watching,
}: ShowStats) => {
  const formattedDate = new Date(started_watching.seconds * 1000).toDateString();

  return (
    <div className="show-card">
      <h1>{title}</h1>
      <p>{status}</p>
      <p>Rating: {rating}</p>
      <AddEp id={id} current_episode={current_episode} total_episodes={total_episodes} />
      <p>{formattedDate}</p>
    </div>
  );
};

export default UserShowCard;
