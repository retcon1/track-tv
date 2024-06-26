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
    if (typeof window !== 'undefined') {
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
      <div className="navbar relative z-40 bg-transparent opacity-30 transition-all duration-500 ease-in-out hover:bg-neutral hover:opacity-100 dark:bg-transparent">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost ml-0 text-xl lg:ml-20" href="/">
            trackTV
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <details>
                <summary>Parent</summary>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
          <label className="input input-bordered mr-2 flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="Search"
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
            <button
              className="hover:cursor-pointer"
              onClick={handleSearch}
              disabled={searchTerm.length < 1}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </label>
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
