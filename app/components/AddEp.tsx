"use client";
import React, { useState } from "react";
import { updateCurrEp } from "../utils/dbFunctions";
import { ShowStats } from "../interfaces/interfaces";

const AddEp = ({
  id,
  current_episode,
  total_episodes,
}: Pick<ShowStats, "id" | "current_episode" | "total_episodes">) => {
  const [epNum, setEpNum] = useState<number>(current_episode);

  const addEp = (id: string) => {
    updateCurrEp(id.toString(), epNum + 1);
    setEpNum(epNum + 1);
  };

  return (
    <>
      <p>
        {epNum}/{total_episodes}
      </p>
      {epNum !== total_episodes ? (
        <button className="add-ep-btn" onClick={() => addEp(id)}>
          +
        </button>
      ) : null}
    </>
  );
};

export default AddEp;
