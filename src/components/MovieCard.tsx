import { BASE_IMG_URL } from "@/utils/const";
import Link from "next/link";
import React, { useState } from "react";

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
      {/* {!loaded && !error && <CardSkeleton />}
      {error && <CardSkeleton error />} */}

      <Link
        className={`${!loaded && error && "hidden"}`}
        href={`/details/${id}`}
      >
        <div className="relative">
          <img
            className="object-cover h-[450px] md:h-[335px] w-full"
            src={`${BASE_IMG_URL}${img}`}
            alt="movie poster"
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
          />
          <div className="absolute bg-primary w-full bottom-0 px-4 py-2 text-center transition-all duration-500 opacity-0 group-hover:opacity-100">
            {title}
            <p>{releaseDate}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
