"use client";
import SearchHandler from "@/app/components/SearchHandler";
import ShowCard from "@/app/components/ShowCard";
import { ShowBasicInfo } from "@/app/interfaces/interfaces";
import { searchShow } from "@/app/utils/searchFunctions";
import React, { useEffect, useState } from "react";

const ShowSearch = ({ params }: { params: { show: string } }) => {
  const [showList, setShowList] = useState<ShowBasicInfo[] | null>(null);

  useEffect(() => {
    const asyncSearch = async () => {
      const showData = await searchShow(params.show);
      setShowList(showData);
    };

    asyncSearch();
  }, []);

  if (!showList) {
    return <h1>Loading...</h1>;
  }

  if (showList.length === 0) {
    return (
      <div>
        <SearchHandler />
        <h1>No shows found, please try again!</h1>
      </div>
    );
  }

  return (
    <div>
      <SearchHandler />
      <div className="flex row flex-wrap justify-center">
        {showList.map((show) => (
          <ShowCard key={show.id} {...show} />
        ))}
      </div>
    </div>
  );
};

export default ShowSearch;
