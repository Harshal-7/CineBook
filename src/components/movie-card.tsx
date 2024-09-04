"use client";

import axios from "axios";
import Link from "next/link";

export default function MovieCard({ movie }: any) {
  return (
    <Link
      href={`/movie/${movie.id}`}
      className="w-[250px] group cursor-pointer"
    >
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
        alt="poster"
        className="w-[250px] h-fit max-w-[250px] max-h-[350px] object-fill object-center"
      />
      <div className="py-2 group-hover:font-semibold text-xl transition-all duration-300">
        {movie.title}
      </div>
    </Link>
  );
}
