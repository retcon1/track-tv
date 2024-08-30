"use client";
import ChangeAvatarForm from "../components/auth/ChangeAvatarForm";
import ChangePassForm from "../components/auth/ChangePassForm";
import ChangeUsernameForm from "../components/auth/ChangeUsernameForm";

const Settings = () => {
  return (
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
  );
};

export default Settings;
