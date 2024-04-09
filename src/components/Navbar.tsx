"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import MobileNavbar from "./MobileNavbar";

const Navbar = () => {
  const [input, setInput] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInput("");
    router.push(`/search/${input}?page=1`);
  };

  return (
    <div className="bg-primary">
      <div className="flex justify-between items-center py-4 px-2 md:px-10">
        <Link className="hidden md:block" href="/discover/now_playing">
          <h2 className="text-[32px] font-semibold text-lightPurple">
            MovieBuddy
          </h2>
        </Link>
        <form className="space-x-4 hidden md:block" onSubmit={handleSubmit}>
          <input
            className="bg-secondary px-4 py-2 placeholder:text-textColor rounded focus:outline-lightPurple focus:outline"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search movies"
          />
          <button className="text-white py-2 bg-lightPurple px-4 rounded transition ease-out duration-200 hover:bg-darkPurple">
            Search
          </button>
        </form>

        <MobileNavbar
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Navbar;
