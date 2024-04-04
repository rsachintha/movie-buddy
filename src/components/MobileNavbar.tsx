"use client";

import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import { useParams, useSearchParams } from "next/navigation";
import axios from "axios";
import { BASE_URL } from "@/utils/const";
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import Link from "next/link";

interface mobileNavPropsTypes {
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent) => void;
}

const MobileNavbar = ({
  input,
  setInput,
  handleSubmit,
}: mobileNavPropsTypes) => {
  const [isOpen, setIsOpen] = useState(false);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");

  const searchParams = useSearchParams();
  const params = useParams();

  useEffect(() => {
    axios
      .get(
        `${BASE_URL}/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
      )
      .then(({ data }) => {
        setGenres(data.genres);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (searchParams.get("genre")) {
      setSelectedGenre(searchParams.get("genre")!);
      return;
    }
    setSelectedGenre(params.id.toString());
  }, [searchParams.get("genre"), params.id]);

  return (
    <>
      <form
        className="md:hidden flex justify-between w-[100%]"
        onSubmit={handleSubmit}
      >
        <div onClick={() => setIsOpen(true)}>
          <AiOutlineMenu size={32} />
        </div>
        <div className="space-x-4">
          <input
            className="bg-secondary px-4 py-2 placeholder:text-textColor text-[14px] w-[180px] rounded focus:outline-lightPurple focus:outline"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search movies"
          />
          <button className="text-white py-2 bg-lightPurple px-4 rounded transition ease-in duration-300 hover:bg-darkPurple">
            Search
          </button>
        </div>
      </form>

      {/* full screen navbar */}
      <div
        className={`min-h-[100vh] max-h-[100vh] w-[100%] bg-primary fixed left-0 top-0 z-10 overflow-scroll ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="sticky top-0 bg-primary py-4 w-[100%]">
          <IoMdClose
            onClick={() => setIsOpen(false)}
            className="absolute top-0 right-0 m-2 mt-7"
            size={28}
          />
          <Link
            className="w-fit"
            href="/discover/now_playing"
            onClick={() => setIsOpen(false)}
          >
            <div className="sidebarTitle text-[28px] text-center text-lightPurple">
              MovieBuddy
            </div>
          </Link>
        </div>
        <div className="px-4 pb-16">
          <div className="flex flex-col gap-4 pt-4">
            <p className="sidebarTitle">Discover</p>
            <Link
              href="/discover/now_playing"
              className="w-fit"
              onClick={() => setIsOpen(false)}
            >
              <p
                className={`sidebarLink ${
                  selectedGenre === "now_playing" ? "sidebarActive" : ""
                }`}
              >
                Now Playing
              </p>
            </Link>
            <Link
              href="/discover/top_rated"
              className="w-fit"
              onClick={() => setIsOpen(false)}
            >
              <p
                className={`sidebarLink ${
                  selectedGenre === "top_rated" ? "sidebarActive" : ""
                }`}
              >
                Top Rated
              </p>
            </Link>
            <Link
              href="/discover/popular"
              className="w-fit"
              onClick={() => setIsOpen(false)}
            >
              <p
                className={`sidebarLink ${
                  selectedGenre === "popular" ? "sidebarActive" : ""
                }`}
              >
                Popular
              </p>
            </Link>
            <Link
              href="/discover/upcoming"
              className="w-fit"
              onClick={() => setIsOpen(false)}
            >
              <p
                className={`sidebarLink ${
                  selectedGenre === "upcoming" ? "sidebarActive" : ""
                }`}
              >
                Upcoming
              </p>
            </Link>
          </div>
          <div className="flex flex-col gap-4 pt-4">
            <p className="sidebarTitle">Genres</p>
            {genres.map((genre: Igenre) => (
              <Link
                key={genre.id}
                href={`/genres/${
                  genre.id
                }?genre=${genre.name.toLocaleLowerCase()}`}
                className="w-fit"
              >
                <p
                  className={`sidebarLink ${
                    genre.name.toLowerCase() === selectedGenre
                      ? "sidebarActive"
                      : ""
                  }`}
                >
                  {genre.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNavbar;
