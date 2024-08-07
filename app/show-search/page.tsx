import React from "react";
import SearchHandler from "../components/Searching/SearchHandler";

const ShowSearch = () => {
  return (
    <div className="flex h-[80vh] flex-col items-center justify-center text-center align-middle">
      <h1 className="text-lg mb-2 font-bold">What show would you like to add?</h1>
      <SearchHandler />
    </div>
  );
};

export default ShowSearch;
