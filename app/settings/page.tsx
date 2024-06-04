"use client";
import ChangePassForm from "../components/auth/ChangePassForm";

const Settings = () => {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-8 md:px-8 h-[80vh]">
      <div className="rounded-3xl bg-neutral p-10">
        <h1 className="flex justify-center text-lg font-bold">
          Change Your Password
        </h1>
        <ChangePassForm />
      </div>
    </div>
  );
};

export default Settings;
