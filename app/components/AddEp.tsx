"use client";
import React, { useState } from "react";
import { updateCurrEp } from "../utils/dbFunctions";
import { UserShowStats } from "../interfaces/interfaces";

const AddEp = ({
  id,
  current_episode,
  total_episodes,
}: Pick<UserShowStats, "id" | "current_episode" | "total_episodes">) => {
  const [epNum, setEpNum] = useState<number>(current_episode);

  const addEp = (id: string) => {
    updateCurrEp(id.toString(), epNum + 1);
    setEpNum(epNum + 1);
  };

  return (
    <div className="row flex items-center">
      <p className="mr-2">
        {epNum}/{total_episodes}
      </p>
      {epNum !== total_episodes ? (
        <button
          className="btn btn-square btn-xs px-3"
          onClick={() => addEp(id)}
        >
          +
        </button>
      ) : null}
    </div>
  );
};

export default AddEp;
