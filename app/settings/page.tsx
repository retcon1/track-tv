"use client";
import { useState } from "react";
import ChangeAvatarForm from "../components/auth/ChangeAvatarForm";
import ChangePassForm from "../components/auth/ChangePassForm";
import ChangeUsernameForm from "../components/auth/ChangeUsernameForm";
import { deleteAccount } from "../utils/authFunctions";

const Settings = () => {
  const [popup, setPopup] = useState(false);

  return (
    <>
      <div className="flex h-auto flex-row flex-wrap justify-center px-4 py-8 sm:mt-20 md:px-8">
        <div className="m-10 rounded-3xl bg-neutral p-10">
          <h1 className="flex justify-center text-lg font-bold">
            Change Your Password
          </h1>
          <ChangePassForm />
        </div>
        <div className="m-10 rounded-3xl bg-neutral p-10">
          <h1 className="flex justify-center text-lg font-bold">
            Change Your Username
          </h1>
          <ChangeUsernameForm />
        </div>
        <div className="m-10 rounded-3xl bg-neutral p-10">
          <h1 className="mb-2 flex justify-center text-lg font-bold">
            Change Your Username
          </h1>
          <ChangeAvatarForm />
        </div>
      </div>
      <div className="mb-10 flex justify-center">
        <button className="btn bg-red-700" onClick={() => setPopup(!popup)}>
          Delete Account
        </button>
        {popup && (
          <div className="toast toast-center align-middle mt-14">
            <div className="alert alert-error flex-col">
              <span>Are you sure?</span>
              <button className="btn-ghost" onClick={() => deleteAccount()}>Yes</button>
              <button className="link" onClick={() => setPopup(false)}>No</button>
            </div>
          </div>
      )}
      </div>
    </>
  );
};

export default Settings;
