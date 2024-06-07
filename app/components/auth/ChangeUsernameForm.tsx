import { changeUsername } from "@/app/utils/authFunctions";
import React, { useEffect, useState } from "react";
import Success from "../toasts/Success";
import { auth } from "@/app/config/firebase";
import { useRouter } from "next/navigation";

const ChangeUsernameForm = () => {
  const [changeUsernameForm, setChangeUsernameForm] = useState({
    currentUsername: "",
    newUsername: "",
    confirmUsername: "",
  });

  const [success, setSuccess] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(auth?.currentUser);
    if (changeUsernameForm.newUsername !== changeUsernameForm.confirmUsername)
      return alert("Usernames do not match");
    const result = await changeUsername(changeUsernameForm.newUsername);
    if (result) {
      setSuccess(true);
      setTimeout(() => {
        router.push("/profile");
      }, 5000);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user: any) => {
      if (user) {
        setChangeUsernameForm({
          ...changeUsernameForm,
          currentUsername: user.displayName,
        });
      } else {
        console.log("User not signed in!");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      {success && <Success text="Username changed successfully" />}
      <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        <label className="input input-bordered my-5 flex items-center gap-2">
          <p className="label">{}</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <div className="mx-5 rounded">
            {changeUsernameForm.currentUsername}
          </div>
        </label>
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
            placeholder="New Username"
            minLength={6}
            onChange={(e) =>
              setChangeUsernameForm({
                ...changeUsernameForm,
                newUsername: e.target.value,
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
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            placeholder="Confirm Username"
            minLength={6}
            onChange={(e) =>
              setChangeUsernameForm({
                ...changeUsernameForm,
                confirmUsername: e.target.value,
              })
            }
            className="mx-5 rounded"
          />
        </label>
        <button
          className="btn btn-primary"
          disabled={
            changeUsernameForm.newUsername.length < 6 ||
            changeUsernameForm.confirmUsername.length < 6
          }
          type="submit"
        >
          Change Username
        </button>
      </form>
    </>
  );
};

export default ChangeUsernameForm;
