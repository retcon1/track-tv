import React from "react";
import { ShowStats } from "../interfaces/interfaces";
import AddEp from "./AddEp";
import Link from "next/link";

const UserShowCard = ({
  id,
  title,
  current_episode,
  total_episodes,
  status,
  rating,
  started_watching,
  image,
}: ShowStats) => {
  const formattedDate = started_watching.toDate().toLocaleDateString();

  let badgeCss;

  switch (status.toLowerCase()) {
    case "watching":
      badgeCss = "badge-primary";
      break;
    case "completed":
      badgeCss = "badge-success";
      break;
    case "planning":
      badgeCss = "badge-warning";
      break;
  }

  return (
    <tr className="hover">
      {/* Potential future functionality
      <th>
        <label>
          <input type="checkbox" className="checkbox" />
        </label>
      </th> */}
      <td>
        <div className="flex items-center gap-3">
          <Link className="avatar hover:cursor-pointer" href={`/show/${id}`}>
            <div className="mask mask-squircle h-12 w-12">
              <img src={image} alt="Avatar Tailwind CSS Component" />
            </div>
          </Link>
          <div>
            <div className="font-bold">
              <div
                className={`badge badge-xs ${badgeCss}`}
                title={status}
              ></div>{" "}
              {title}
            </div>
            <div className="text-sm opacity-50">Started {formattedDate}</div>
          </div>
        </div>
      </td>
      <td
        className={`font-bold ${rating && rating <= 5 ? "text-accent" : "text-success"}`}
      >
        {rating}
      </td>
      <td>
        <AddEp
          id={id}
          current_episode={current_episode}
          total_episodes={total_episodes}
        />
      </td>
      <th>
        <button className="btn btn-ghost btn-xs">Edit</button>
      </th>
    </tr>
  );
};

export default UserShowCard;
