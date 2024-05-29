"use client";
import React, { useEffect, useState } from "react";
import {
  addShowToStash,
  editUserShow,
  fetchShowFromStash,
} from "../utils/dbFunctions";
import { ShowDetailedInfo, UserShowStats } from "../interfaces/interfaces";
import { Timestamp } from "firebase/firestore";
import StarScale from "./StarScale";

interface EditModalProps {
  showDetails: ShowDetailedInfo;
}

const EditModal = ({ showDetails }: EditModalProps) => {
  const defaultUserData: UserShowStats = {
    id: showDetails.id,
    title: showDetails.title,
    image: showDetails.image,
    status: null,
    rating: 0,
    current_episode: 0,
    total_episodes: showDetails.total_episodes,
    started_watching: Timestamp.now(),
    inLibrary: false,
    url: showDetails.url,
  };

  const [userData, setUserData] = useState<UserShowStats | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [success, setSuccess] = useState(false);

  const handleListEdit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!userData) return;
    const updatedData = {
      ...userData,
      rating: rating,
    };

    // If the show is already in the user's library, just update the show data
    if (userData.inLibrary) {
      try {
        await editUserShow(updatedData);
        setSuccess(true);
        (document.getElementById("my_modal_1") as HTMLDialogElement).close();
        setTimeout(() => {
          setSuccess(false);
        }, 5000);
      } catch (err) {}
      return;
    }

    // Otherwise add it to the user's library
    try {
      updatedData.inLibrary = true;
      await addShowToStash(updatedData);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        (document.getElementById("my_modal_1") as HTMLDialogElement).close();
      }, 5000);
    } catch (err) {}
  };

  useEffect(() => {
    const getUserData = async (id: string) => {
      const showData = await fetchShowFromStash(id);
      console.log(showData);
      setUserData(showData || defaultUserData);
      setRating(showData?.rating || 0);
    };
    getUserData(defaultUserData.id);
  }, []);

  if (!userData) {
    return (
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box h-1/2 w-1/2 bg-neutral">
          <div className="skeleton h-32 w-32"></div>
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
      {success && (
        <div className="toast toast-end toast-top">
          <div className="alert alert-success">
            <span>Successfully added to list!</span>
          </div>
        </div>
      )}
      <dialog id="my_modal_1" className="modal">
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
              </select>
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Rating</span>
              </div>
              <StarScale setRating={setRating} rating={userData.rating} />
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
              <button className="btn btn-primary mr-4" onClick={handleListEdit}>
                Save
              </button>
              <button className="btn btn-outline btn-primary">Discard</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default EditModal;
