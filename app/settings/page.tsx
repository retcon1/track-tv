"use client";
import ChangePassForm from "../components/auth/ChangePassForm";
import ChangeUsernameForm from "../components/auth/ChangeUsernameForm";

const Settings = () => {
  return (
    <div className="mt-20 flex h-[80vh] flex-col items-center justify-center px-4 py-8 md:px-8">
      <div className="flex flex-row flex-wrap">
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
      </div>
    </div>
  );
};

export default Settings;
