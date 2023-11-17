"use client";
import React, { useState } from "react";
import { updateCurrEp } from "../utils/dbFunctions";

const AddEp = ({ id, epNum, setEpNum }: any) => {
  const addEp = (id: string) => {
    updateCurrEp(id.toString(), epNum + 1);
    setEpNum(epNum + 1);
  };

  return (
    <button className="add-ep-btn" onClick={() => addEp(id)}>
      +
    </button>
  );
};

export default AddEp;
