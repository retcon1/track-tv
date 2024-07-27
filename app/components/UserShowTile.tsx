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
            className="avatar hidden hover:cursor-pointer sm:inline-flex"
            href={`/show/${showDetails.id}`}
          >
            <div className="mask mask-squircle h-12 w-12">
              <img
                src={showDetails.image}
                alt={`poster of ${showDetails.title}`}
              />
            </div>
          </Link>
          <div
            className="avatar hover:cursor-pointer sm:hidden"
            onClick={() =>
              (
                document.getElementById(
                  `my_modal_${showDetails.id}`,
                ) as HTMLDialogElement
              ).showModal()
            }
          >
            <div className="mask mask-squircle h-12 w-12">
              <img
                src={showDetails.image}
                alt={`poster of ${showDetails.title}`}
              />
            </div>
          </div>
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
          className="btn btn-ghost btn-xs hidden sm:inline-flex"
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
