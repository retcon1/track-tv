import React, { useState } from "react";
import { ShowStats } from "../interfaces/interfaces";
import { updateCurrEp } from "../utils/dbFunctions";

const ShowCard = ({
  id,
  title,
  current_episode,
  total_episodes,
  status,
  rating,
  started_watching,
}: ShowStats) => {
  const [epNum, setEpNum] = useState<number>(current_episode);

  const addEp = (id: string) => {
    updateCurrEp(id.toString(), epNum + 1);
    setEpNum((prevNum) => prevNum + 1);
  };

  const formattedDate = new Date(
    started_watching.seconds * 1000
  ).toDateString();

  return (
    <div className="show-card">
      <h1>{title}</h1>
      <p>{status}</p>
      <p>Rating: {rating}</p>
      <p>
        {epNum}/{total_episodes}
      </p>
      {epNum !== total_episodes ? (
        <button className="add-ep-btn" onClick={() => addEp(id)}>
          +
        </button>
      ) : null}
      <p>{formattedDate}</p>
    </div>
  );
};

export default ShowCard;
