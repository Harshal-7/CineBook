"use client";

import { useEffect, useState } from "react";
import { fetchBookmarkMovies } from "../../../utils/bookmark";
import Link from "next/link";

const BookmarkPage = () => {
  const [data, setData] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchBookmarkMovies();
      console.log(res);

      setData(res);
    };

    fetchData();
  }, []);

  if (!data) {
    return <div>loading...</div>;
  }

  return (
    <div className="flex flex-wrap gap-10 p-6">
      {data.map((movie: any, index: number) => (
        <Link
          href={`/movie/${movie.id}`}
          className="flex flex-col gap-2 text-center group"
          key={index}
        >
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
            alt="poster"
            className="max-w-[350px] max-h-[450px]"
          />
          <div className="text-2xl w-full group-hover:font-bold transition-all duration-300">
            {movie.title}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BookmarkPage;
