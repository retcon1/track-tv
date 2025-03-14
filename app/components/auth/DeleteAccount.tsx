import { deleteAccount } from "@/app/utils/authFunctions";
import React, { useState } from "react";
import Success from "../toasts/Success";
import Warning from "../toasts/Warning";

interface DeleteAccountFormProps {
  currentUsername: string;
}

const DeleteAccount: React.FC<DeleteAccountFormProps> = ({
  currentUsername,
}) => {
  const [deleted, setDeleted] = useState(false);
  const [failed, setFailed] = useState(false);
  const [passConfirm, setPassConfirm] = useState<string>("");

  const deleteUser = async () => {
    const success = await deleteAccount(passConfirm);
    if (success) {
      setDeleted(true);
      setTimeout(() => {
        setDeleted(false);
        window.location.href = "/";
      }, 5000);
    } else {
      setFailed(true);
      setTimeout(() => {
        setFailed(false);
      }, 5000);
    }
  };

  return (
    <>
      {deleted && <Success text="Account Deleted, sad to see you go!" />}
      {failed && <Warning text="Failed to delete account, please try again!" />}
      <form className="flex max-w-[290px] flex-col items-center">
        <input type="hidden" name="username" value={currentUsername} />
        <label className="input input-bordered my-8 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            placeholder="Current Password"
            type="password"
            minLength={6}
            onChange={(e) => setPassConfirm(e.target.value)}
            className="mx-5 rounded"
            autoComplete="current-password"
          />
        </label>
        <button
          className="btn mt-5 bg-red-700"
          disabled={passConfirm.length < 6}
          onClick={deleteUser}
        >
          Delete Account
        </button>
      </form>
    </>
  );
};

export default DeleteAccount;
