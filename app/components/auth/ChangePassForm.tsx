import { changePassword } from "@/app/utils/authFunctions";
import React, { useState } from "react";
import Success from "../toasts/Success";

const ChangePassForm = () => {
  const [changePassForm, setChangePassForm] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (changePassForm.newPassword !== changePassForm.confirmPassword)
      return alert("Passwords do not match");
    const result = await changePassword(
      changePassForm.password,
      changePassForm.newPassword,
    );
    if (result) {
      setChangePassForm({ password: "", newPassword: "", confirmPassword: "" });
      setSuccess(true);
    }
  };

  return (
    <>
    {success && <Success text="Password changed successfully" />}
      <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        <label className="input input-bordered my-5 flex items-center gap-2">
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
            onChange={(e) =>
              setChangePassForm({ ...changePassForm, password: e.target.value })
            }
            className="mx-5 rounded"
          />
        </label>
        <label className="input input-bordered my-5 flex items-center gap-2">
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
            placeholder="New Password"
            type="password"
            minLength={6}
            onChange={(e) =>
              setChangePassForm({
                ...changePassForm,
                newPassword: e.target.value,
              })
            }
            className="mx-5 rounded"
          />
        </label>
        <label className="input input-bordered mb-5 flex items-center gap-2">
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
            placeholder="Confirm Password"
            type="password"
            minLength={6}
            onChange={(e) =>
              setChangePassForm({
                ...changePassForm,
                confirmPassword: e.target.value,
              })
            }
            className="mx-5 rounded"
          />
        </label>
        <button
          className="btn btn-primary"
          disabled={
            changePassForm.password.length < 6 ||
            changePassForm.newPassword.length < 6 ||
            changePassForm.confirmPassword.length < 6
          }
          type="submit"
        >
          Change Password
        </button>
      </form>
    </>
  );
};

export default ChangePassForm;
