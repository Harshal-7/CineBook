"use client";

import { useEffect, useState } from "react";
import { fetchBookmarkMovies, fetchBookmarkShows } from "@/utils/bookmark";
import Link from "next/link";

const BookmarkPage = () => {
  const [movies, setMovies] = useState<any>();
  const [shows, setShows] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchBookmarkMovies();
      const res2 = await fetchBookmarkShows();
      setMovies(res);
      setShows(res2);
    };

    fetchData();
  }, []);

  if (!movies) {
    return <div>loading...</div>;
  }

  return (
    <div className="flex flex-col mb-10">
      <div className="text-start text-2xl font-bold text-red-500 p-5 my-3">
        My Bookmarks
      </div>

      {movies.length > 0 && (
        <div className="text-xl ml-5 font-semibold">Movies</div>
      )}
      <div className="flex flex-wrap gap-10 p-5">
        {movies.map((movie: any, index: number) => (
          <Link
            href={`/movie/${movie.movieId}`}
            onClick={() => console.log(movie.movieId)}
            className="flex flex-col gap-2 text-center group max-w-[200px]"
            key={index}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
              alt="poster"
              className="max-w-[200px] max-h-[300px] rounded-lg"
            />
            <div className="text-xl w-full group-hover:font-bold transition-all duration-300">
              {movie.title || movie.name}
            </div>
          </Link>
        ))}
      </div>

      {shows.length > 0 && (
        <div className="text-xl ml-5 font-semibold">TV Shows</div>
      )}
      <div className="flex flex-wrap gap-10 p-5 ">
        {shows.map((show: any, index: number) => (
          <Link
            href={`/tvshow/${show.showId}`}
            onClick={() => console.log(show.id, show.showId)}
            className="flex flex-col gap-2 text-center group max-w-[200px]"
            key={index}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${show?.poster_path}`}
              alt="poster"
              className="max-w-[200px] max-h-[300px] rounded-lg"
            />
            <div className="text-xl w-full group-hover:font-bold transition-all duration-300">
              {show.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BookmarkPage;
