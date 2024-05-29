"use client";
import React, { useEffect, useState } from "react";
import { fetchShowFromStash } from "../utils/dbFunctions";
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
                className=""
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
            <button className="btn">Discard</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default EditModal;
