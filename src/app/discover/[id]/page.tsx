"use client";

import MovieCard from "@/components/MovieCard";
import { BASE_URL } from "@/utils/const";
import axios from "axios";
import { error } from "console";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

export interface Imovie {
  id: string;
  poster_path: string;
  title: string;
  release_date: string;
}

const Discover = () => {
  const [title, setTitle] = useState("");
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [discover, setDiscover] = useState("");

  const mainRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  useEffect(() => {
    mainRef?.current?.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    const id = params.id.toString();
    const page = searchParams.get("page");

    setDiscover(id);

    switch (id) {
      case "now_playing":
        setTitle("Now Playing Movies");
        break;
      case "top_rated":
        setTitle("Top Rated Movies");
        break;
      case "popular":
        setTitle("Popular Movies");
        break;
      case "upcoming":
        setTitle("Upcoming Movies");
        break;

      default:
        setTitle("");
        break;
    }

    axios
      .get(`${BASE_URL}/movie/${id}`, {
        params: {
          api_key: process.env.NEXT_PUBLIC_API_KEY,
          page,
        },
      })
      .then((response) => {
        setMovies(response.data.results);
        setCurrentPage(response.data.page);
        setTotalPage(response.data.total_page);
      })
      .catch((error) => console.log(error));
  }, [params.id, searchParams.get("page")]);

  const handlePageChange = (button: string) => {
    let page = "";
    if (button === "prev") {
      page = `page=${currentPage - 1}`;
    } else {
      page = `page=${currentPage + 1}`;
    }

    router.push(`discover/${discover}${page}`);
  };

  return (
    <main
      className="bg-secondary max-h-[calc(100vh-77px)] min-h-[calc(100vh-77px)] p-8 overflow-y-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-[#22222a] scrollbar-track-primary relative"
      ref={mainRef}
    >
      <h2 className="text-[24px]">{title}</h2>

      <div className="grid gap-8 moviesGrid place-items-center mt-8">
        {movies.map((movie: Imovie) => (
          <MovieCard
            key={movie.id}
            img={movie.poster_path}
            id={movie.id}
            title={movie.title}
            releaseDate={movie.release_date}
          />
        ))}
      </div>
    </main>
  );
};

export default Discover;
