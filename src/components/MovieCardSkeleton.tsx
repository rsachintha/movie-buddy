import React from "react";

const MovieCardSkeleton = () => {
  return (
    <div className="group bg-gray-300 h-[450px] md:h-[335px] w-full rounded-[10px] overflow-hidden">
      <div className="animate-pulse relative">
        <div className="object-cover h-[450px] md:h-[335px] w-full bg-gray-300"></div>
        <div className="absolute bg-gray-300 bg-opacity-60 w-full h-[0%] bottom-0 transition-all ease-out-quad duration-300 group-hover:h-[100%] group-hover:flex group-hover:items-end group-hover:justify-center">
          <div className="p-4 text-white">
            <div className="h-6 bg-gray-300 mb-2 w-2/3"></div>
            <div className="h-4 bg-gray-300 mb-4 w-1/2"></div>
            <div className="h-4 bg-gray-300 w-1/4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCardSkeleton;
