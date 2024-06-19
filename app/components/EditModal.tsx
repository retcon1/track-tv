"use client";
import React, { useEffect, useState } from "react";
import {
  addShowToStash,
  editUserShow,
  fetchShowFromStash,
  removeShowFromStash,
} from "../utils/dbFunctions";
import { UserShowStats } from "../interfaces/interfaces";
import { Timestamp } from "firebase/firestore";
import StarScale from "./StarScale";
import Warning from "./toasts/Warning";
import Success from "./toasts/Success";

interface EditModalProps {
  showDetails: UserShowStats;
}

const EditModal = ({ showDetails }: EditModalProps) => {
  const defaultUserData: UserShowStats = {
    id: showDetails.id,
    title: showDetails.title,
    image: showDetails.image,
    status: "",
    rating: 0,
    current_episode: 0,
    total_episodes: showDetails.total_episodes,
    started_watching: Timestamp.now(),
    inLibrary: false,
    url: showDetails.url,
  };

  const [userData, setUserData] = useState<UserShowStats | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [added, setAdded] = useState(false);
  const [removed, setRemoved] = useState(false);
  const [successText, setSuccessText] = useState<string>(
    "Successfully added to list!",
  );

  const handleListEdit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!userData || userData.status == "")
      return alert("Please declare status");

    const updatedData = {
      ...userData,
      rating: rating,
    };

    // If the show is already in the user's library, just update the show data
    if (userData.inLibrary) {
      try {
        await editUserShow(updatedData);
        setSuccessText("Successfully updated show!");
        setAdded(true);
        (
          document.getElementById(
            `my_modal_${showDetails.id}`,
          ) as HTMLDialogElement
        ).close();
        setTimeout(() => {
          setAdded(false);
        }, 5000);
        return;
      } catch (err) {}
      return;
    }

    // Otherwise add it to the user's library
    try {
      updatedData.inLibrary = true;
      await addShowToStash(updatedData);
      setSuccessText("Successfully added to list!");
      setAdded(true);
      (
        document.getElementById(
          `my_modal_${showDetails.id}`,
        ) as HTMLDialogElement
      ).close();
      setTimeout(() => {
        setAdded(false);
      }, 5000);
    } catch (err) {}
  };

  const removeFromUserList = async () => {
    try {
      await removeShowFromStash(showDetails.id);
      setRemoved(true);
      setUserData(defaultUserData);
      (
        document.getElementById(
          `my_modal_${showDetails.id}`,
        ) as HTMLDialogElement
      ).close();
      setTimeout(() => {
        setRemoved(false);
      }, 5000);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    const getUserData = async (id: string) => {
      const showData = await fetchShowFromStash(id);
      setUserData(showData || defaultUserData);
      setRating(showData?.rating || 0);
    };

    if (!showDetails.inLibrary) getUserData(defaultUserData.id);
    else {
      setUserData(showDetails);
      setRating(showDetails.rating);
    }
  }, []);

  if (!userData) {
    return (
      <dialog id={`my_modal_${showDetails.id}`} className="modal">
        <div className="modal-box skeleton h-1/2 w-1/2 bg-neutral">
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    );
  }

  return (
    <>
      {added && <Success text={successText} />}
      {removed && <Warning text="Removed from list!" />}
      <dialog id={`my_modal_${showDetails.id}`} className="modal">
        <div className="modal-box h-1/2 w-11/12 bg-neutral">
          <h3 className="mb-5 text-lg font-bold">{defaultUserData.title}</h3>
          <div className="flex flex-row">
            <label className="form-control mb-5 mr-5 w-full max-w-xs">
              <div className="label">
                <span className="label-text">Status</span>
              </div>
              <select
                className="select max-w-xs capitalize"
                value={userData?.status || ""}
                onChange={(e) => {
                  setUserData({
                    ...userData,
                    status: e.target.value,
                  });
                }}
                required
              >
                <option value="" disabled>
                  status
                </option>
                <option value="watching">watching</option>
                <option value="planning">planning</option>
                <option value="completed">completed</option>
                <option value="dropped">dropped</option>
              </select>
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Rating</span>
              </div>
              <StarScale
                index={Number(showDetails.id)}
                setRating={setRating}
                rating={userData.rating}
              />
            </label>
          </div>
          <div className="flex flex-row">
            <div className="mr-5 flex flex-col">
              <div className="label">
                <span className="label-text">Progress</span>
              </div>
              <label className="input flex max-w-[14rem] items-center ">
                <input
                  type="number"
                  className="mr-20 max-w-[4rem]"
                  defaultValue={userData.current_episode}
                  max={userData.total_episodes}
                  min={0}
                  onChange={(e) => {
                    setUserData({
                      ...userData,
                      current_episode: Number(e.target.value),
                    });
                  }}
                />
                <span className="mr-20 flex items-center">
                  <span>/&nbsp;</span>
                  <span>{userData.total_episodes}</span>
                </span>
              </label>
            </div>
            <div className="flex flex-col">
              <div className="label">
                <span className="label-text">Started Watching</span>
              </div>
              <label className="input flex max-w-[14rem] items-center ">
                <input
                  type="date"
                  defaultValue={userData.started_watching
                    .toDate()
                    .toISOString()
                    .substring(0, 10)}
                  onChange={(e) => {
                    const date = new Date(e.target.value);
                    const timestamp = Timestamp.fromDate(date);
                    setUserData({
                      ...userData,
                      started_watching: timestamp,
                    });
                  }}
                />
              </label>
            </div>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {userData.inLibrary && (
                <button
                  className="btn btn-warning mr-4"
                  onClick={removeFromUserList}
                >
                  Delete Entry
                </button>
              )}
              <button className="btn btn-primary mr-4" onClick={handleListEdit}>
                Save
              </button>
              <button className="btn btn-outline btn-primary">
                Discard Changes
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default EditModal;
