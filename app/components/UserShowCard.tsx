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
  image,
}: ShowStats) => {
  const formattedDate = started_watching.toDate().toLocaleDateString();
  const badgeCss = status === "Watching" ? "badge-primary" : "badge-secondary";

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
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12">
              <img src={image} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
          <div>
            <div className="font-bold">
              {title}{" "}
              <div
                className={`badge badge-xs ${badgeCss}`}
                title={status}
              ></div>
            </div>
            <div className="text-sm opacity-50">Started {formattedDate}</div>
          </div>
        </div>
      </td>
      <td
        className={`font-bold ${rating <= 5 ? "text-accent" : "text-success"}`}
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
