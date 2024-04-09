import { BASE_IMG_URL } from "@/utils/const";
import Link from "next/link";
import React, { useState } from "react";
import MovieCardSkeleton from "./MovieCardSkeleton";

interface movieCardPropsTypes {
  img: string;
  id: string;
  title: string;
  releaseDate: string;
}
const MovieCard = ({ img, id, title, releaseDate }: movieCardPropsTypes) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="group bg-primary h-[450px] md:h-[335px] w-full rounded-[10px] overflow-hidden">
      {!loaded && !error && <MovieCardSkeleton />}

      <Link
        className={`${!loaded && error && "hidden"}`}
        href={`/details/${id}`}
      >
        <div className="relative">
          <img
            className={`object-cover h-[450px] md:h-[335px] w-full ${
              loaded ? "" : "hidden"
            }`}
            src={`${BASE_IMG_URL}${img}`}
            alt="movie poster"
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
          />
          <div className="absolute bg-primary bg-opacity-60 w-full  h-[0%] bottom-0  transition-all ease-out-quad duration-300 group-hover:h-[100%] group-hover:flex group-hover:items-end group-hover:justify-center">
            <div className="p-4 text-white">
              <p className="text-[24px] font-medium">{title}</p>
              <p>{releaseDate}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
