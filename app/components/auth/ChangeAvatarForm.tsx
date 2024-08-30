import { changeAvatar } from "@/app/utils/authFunctions";
import React, { useState } from "react";
import Success from "../toasts/Success";

const ChangeAvatarForm = () => {
  const [avatarUrl, setAvatarUrl] = useState("");

  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await changeAvatar(avatarUrl);
    if (result) {
      setSuccess(true);
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    }
  };

  return (
    <>
      {success && <Success text="Avatar updated successfully" />}
      <form
        className="flex max-w-[290px] flex-col items-center"
        onSubmit={handleSubmit}
      >
        <p className="text-md text-center">
          We recommend uploading your avatar to a site like imgur, make sure
          it's a square! Preferably 50px x 50px
        </p>
        <label className="input input-bordered my-5 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            placeholder="Provide Image URL"
            minLength={6}
            onChange={(e) => setAvatarUrl(e.target.value)}
            className="mx-5 rounded"
          />
        </label>
        <button
          className="btn btn-primary"
          type="submit"
          disabled={avatarUrl.length < 5}
        >
          Update Avatar
        </button>
      </form>
    </>
  );
};

export default ChangeAvatarForm;
