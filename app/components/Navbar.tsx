"use client";
import { logout } from "../utils/authFunctions";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../config/firebase";
import { UserData } from "../interfaces/interfaces";
import { useAuthState } from "react-firebase-hooks/auth";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [localUser, setLocalUser] = useState<UserData | null>(null);
  const router = useRouter();
  const [user] = useAuthState(auth);

  useEffect(() => {
    // Needed to avoid hydration error when using localStorage
    if (typeof window !== "undefined") {
      const localAuth = localStorage.getItem("auth");
      if (localAuth) setLocalUser(JSON.parse(localAuth));

      // If user is not logged in properly, redirect to login page
      if (!localAuth && user) {
        console.log("first")
        alert("Session expired. Please log in again.");
        logout();
        router.push("/login");
      }
    }
  }, [user]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/show-search/${searchTerm}`);
  };

  // If user is logged in, show the navbar with extra functionality
  if (localUser)
    return (
      <div className="navbar relative z-40 opacity-30 backdrop-blur-lg transition-all duration-500 ease-in-out hover:bg-neutral hover:bg-opacity-50 hover:opacity-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl" href="/profile">
            <span> trackTV </span>
          </a>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              onKeyDown={(e) => {
                if (searchTerm.length < 1) return;
                if (e.key === "Enter") {
                  handleSearch(e);
                }
              }}
            />
          </div>
          <div className="dropdown dropdown-end dropdown-hover">
            <div
              tabIndex={0}
              role="button"
              className="avatar btn btn-circle btn-ghost"
            >
              <div className="w-15 rounded-full">
                <img
                  alt="User Icon Placeholder"
                  src={localUser.avatar ? localUser.avatar : "/user.png"}
                  width={300}
                  height={300}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content menu-sm z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
            >
              <li>
                <a href="/profile">Profile</a>
              </li>
              <li>
                <a href="/settings">Settings</a>
              </li>
              <li>
                <a onClick={logout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );

  // If user is not logged in, show the navbar only with Login button
  // TODO add search functionality when user is not logged in
  return (
    <div className="navbar backdrop-blur-xl">
      <div className="navbar-start">
        <div className="dropdown">
          <a className="btn btn-ghost text-xl" href="/">
            trackTV
          </a>
        </div>
      </div>
      <div className="navbar-end">
        <ul className="menu navbar-end menu-horizontal px-1">
          <li>
            <a href="/login">Login</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
