"use client";
import { useEffect, useState } from "react";
import ChangeAvatarForm from "../components/auth/ChangeAvatarForm";
import ChangePassForm from "../components/auth/ChangePassForm";
import ChangeUsernameForm from "../components/auth/ChangeUsernameForm";
import DeleteAccount from "../components/auth/DeleteAccount";

const Settings = () => {
  const [currentUsername, setCurrentUsername] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("auth") || "");
    setCurrentUsername(user.username);
    console.log(currentUsername);
  }, []);

  return (
    <div className="flex h-auto flex-row flex-wrap justify-center px-4 py-8 sm:mt-20 md:px-8">
      <div className="m-10 rounded-3xl bg-neutral p-10">
        <h1 className="flex justify-center text-lg font-bold">
          Change Your Password
        </h1>
        {currentUsername && <ChangePassForm currentUsername={currentUsername}/>}
      </div>
      <div className="m-10 rounded-3xl bg-neutral p-10">
        <h1 className="flex justify-center text-lg font-bold">
          Change Your Username
        </h1>
        {currentUsername && (
          <ChangeUsernameForm currentUsername={currentUsername} />
        )}
      </div>
      <div className="m-10 rounded-3xl bg-neutral p-10">
        <h1 className="mb-2 flex justify-center text-lg font-bold">
          Change Your Username
        </h1>
        <ChangeAvatarForm />
      </div>
      <div className="m-10 rounded-3xl bg-neutral p-10">
        <h1 className="mb-2 flex justify-center text-lg font-bold">
          Delete Account
        </h1>
        {currentUsername && <DeleteAccount currentUsername={currentUsername} />}
      </div>
    </div>
  );
};

export default Settings;
