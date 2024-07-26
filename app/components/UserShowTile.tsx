import React from "react";
import { UserShowStats } from "../interfaces/interfaces";
import AddEp from "./AddEp";
import Link from "next/link";
import EditModal from "./EditModal";

interface EditModalProps {
  showDetails: UserShowStats;
}

const UserShowTile = ({ showDetails }: EditModalProps) => {
  const formattedDate = showDetails.started_watching
    .toDate()
    .toLocaleDateString();

  let badgeCss;

  switch (showDetails.status?.toLowerCase()) {
    case "watching":
      badgeCss = "badge-primary";
      break;
    case "completed":
      badgeCss = "badge-success";
      break;
    case "planning":
      badgeCss = "badge-warning";
      break;
    case "dropped":
      badgeCss = "badge-error";
      break;
  }

  if (!showDetails) return null;

  return (
    <tr className="hover hover:bg-primary">
      {/* Potential future functionality
      <th>
        <label>
          <input type="checkbox" className="checkbox" />
        </label>
      </th> */}
      <td>
        <div className="flex items-center gap-3">
          <Link
            className="avatar hover:cursor-pointer"
            href={`/show/${showDetails.id}`}
          >
            <div className="mask mask-squircle h-12 w-12">
              <img
                src={showDetails.image}
                alt="Avatar Tailwind CSS Component"
              />
            </div>
          </Link>
          <div>
            <div className="font-bold">
              <div
                className={`badge badge-xs ${badgeCss}`}
                title={showDetails.status}
              ></div>{" "}
              {showDetails.title}
            </div>
            {/* <div className="text-sm opacity-50">Started {formattedDate}</div> */}
          </div>
        </div>
      </td>
      <td
        className={`font-bold ${showDetails.rating && showDetails.rating <= 5 ? "text-accent" : "text-success"}`}
      >
        {showDetails.rating}
      </td>
      <td>
        <AddEp
          id={showDetails.id}
          current_episode={showDetails.current_episode}
          total_episodes={showDetails.total_episodes}
        />
      </td>
      <th>
        <button
          className="btn btn-ghost btn-xs"
          onClick={() =>
            (
              document.getElementById(
                `my_modal_${showDetails.id}`,
              ) as HTMLDialogElement
            ).showModal()
          }
        >
          Edit
        </button>
        <EditModal showDetails={showDetails} />
      </th>
    </tr>
  );
};

export default UserShowTile;
