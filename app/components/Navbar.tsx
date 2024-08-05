"use client";
import { logout } from "../utils/authFunctions";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState<string | null>(null);
  const router = useRouter();

  // Needed to avoid hydration error when using localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      setUser(window.localStorage.getItem("auth"));
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/show-search/${searchTerm}`);
  };

  // If user is logged in, show the navbar with extra functionality
  if (user)
    return (
      <div className="navbar relative z-40 bg-transparent opacity-30 backdrop-blur-xl transition-all duration-500 ease-in-out hover:bg-neutral hover:opacity-80 dark:bg-transparent">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl" href="/profile">
            trackTV
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
              <div className="w-10 rounded-full">
                <Image
                  alt="User Icon Placeholder"
                  src="/user.png"
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
    <div className="navbar bg-base-300 bg-opacity-70 dark:bg-neutral">
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
