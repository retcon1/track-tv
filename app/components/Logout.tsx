"use client";
import React from "react";
import { logout } from "../utils/authFunctions";

const Logout = () => {
  return (
    <button className="m-3" onClick={logout}>
      Logout
    </button>
  );
};

export default Logout;
