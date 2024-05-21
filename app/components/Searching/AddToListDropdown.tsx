import React, { useState } from "react";
import ArrowDownSVG from "../icons/ArrowDownSVG";

const AddToListDropdown = ({ addToUserList }: any) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <details className="dropdown">
      <summary
        tabIndex={0}
        role="button"
        className={`active btn btn-primary w-full ${dropdownOpen ? "rounded-none" : "rounded-none rounded-b-2xl"}`}
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        Add to List{" "}
        <div className="row absolute right-4">
          <ArrowDownSVG />
        </div>
      </summary>
      <ul
        tabIndex={0}
        className="menu dropdown-content absolute z-[1]  w-full items-center rounded-none rounded-b-2xl bg-primary text-base-100 shadow"
      >
        <li
          className="w-full cursor-pointer items-center hover:btn-ghost"
          onClick={() => addToUserList("watching")}
        >
          <strong>Watching</strong>
        </li>
        <li
          className="w-full cursor-pointer items-center hover:btn-ghost"
          onClick={() => addToUserList("planning")}
        >
          <strong>Planning</strong>
        </li>
        <li
          className="w-full cursor-pointer items-center hover:btn-ghost"
          onClick={() => addToUserList("completed")}
        >
          <strong>Completed</strong>
        </li>
      </ul>
    </details>
  );
};

export default AddToListDropdown;
