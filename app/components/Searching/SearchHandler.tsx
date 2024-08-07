"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const SearchHandler = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/show-search/${searchTerm}`);
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search for a show"
        className="input input-bordered w-full max-w-xs mb-5"
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
      <button
        type="submit"
        className="btn btn-primary w-full"
        onClick={handleSearch}
        disabled={searchTerm.length < 1}
      >
        Search
      </button>
    </form>
  );
};

export default SearchHandler;
