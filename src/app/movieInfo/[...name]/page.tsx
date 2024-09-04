"use client";

import React, { Fragment, useEffect, useState } from "react";

import axios from "axios";
import MovieCard from "@/components/movie-card";
import { MOVIE, RottonTomato } from "../../../../utils/config";
import { Bookmark, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { title } from "process";
import { db } from "@/lib/db";
import { addToBookmark, checkIfBookmarked } from "../../../../utils/bookmark";

const MovieInfo = ({ params }: { params: { name: any } }) => {
  const [data, setData] = useState<any>();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    const fetchMovieInfo = async () => {
      try {
        const response = await axios.get(
          `http://www.omdbapi.com/?apikey=2ce9fea8&i=${params.name}`
        );
        console.log("response-data : ", response.data);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovieInfo();
  }, []);

  useEffect(() => {
    const fetchBookmarkData = async () => {
      const res = await checkIfBookmarked(params.name);
      if (res?.imdbID) {
        setIsBookmarked(true);
      }
    };
    fetchBookmarkData();
  }, []);

  const handleBookmark = async (movie: any) => {
    if (!isBookmarked) {
      toast({
        title: "Movie added to bookmark",
        className: "bg-primary text-white",
      });
    }

    const res = await addToBookmark(movie);

    console.log("RESSS L : ", res);

    setIsBookmarked((prev) => !prev);
  };

  if (!data) {
    <div>Loading...</div>;
  }

  return (
    <div className="w-full mx-auto max-w-7xl flex flex-col p-6 gap-10 mt-10 tracking-wide mb-28">
      {/* Topbar  */}
      <div className="flex flex-col md:flex-row items-start gap-10">
        {/* Left Side  */}
        <div className="relative">
          <img
            src={`${data?.Poster}`}
            alt="poster"
            className="max-w-[350px] max-h-[450px]"
          />
          <button
            onClick={() => handleBookmark(data)}
            className="absolute top-0 left-0 bg-card-foreground text-white p-3 rounded-br-lg"
          >
            {isBookmarked ? (
              <Bookmark fill="red" stroke="red" className="w-8 h-8" />
            ) : (
              <Bookmark className="w-8 h-8" />
            )}
          </button>
        </div>
        {/* Right Side */}
        <div className="flex flex-col h-full gap-8">
          <div className="text-5xl font-bold text-red-500">{data?.Title}</div>

          <div className="flex flex-col text-xl gap-4">
            <div>
              <span className="text-muted-foreground font-semibold">
                Released :
              </span>
              <span className=""> {data?.Released}</span>
            </div>
            <div>
              <span className="text-muted-foreground font-bold ">Genre :</span>
              <span className=""> {data?.Genre}</span>
            </div>
            <div>
              <span className="text-muted-foreground font-semibold">
                Box Office :
              </span>
              <span className=""> {data?.BoxOffice}</span>
            </div>
            <div>
              <span className="text-muted-foreground font-bold ">
                Director :
              </span>
              <span className=""> {data?.Director}</span>
            </div>

            <div>
              <span className="text-muted-foreground font-bold ">Cast :</span>
              <span className=""> {data?.Actors}</span>
            </div>

            <div>
              <span className="text-muted-foreground font-bold ">Writer :</span>
              <span className=""> {data?.Writer}</span>
            </div>

            <div>
              <span className="text-muted-foreground font-bold ">
                Available In :
              </span>
              <span className=""> {data?.Language}</span>
            </div>

            <div>
              <span className="text-muted-foreground font-bold ">Awards :</span>
              <span className=""> {data?.Awards}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottombar  */}
      <div className="flex flex-col gap-8 text-xl">
        {/* Ratings */}
        <div className="flex flex-col gap-2 ">
          <div className="text-muted-foreground font-bold text-xl">Ratings</div>
          <div className="flex justify-between bg-accent py-4 px-8 rounded-lg ">
            {data?.Ratings?.map((rating: any, index: number) => (
              <div
                className="flex flex-1 flex-col text-center gap-1"
                key={index}
              >
                <div className="text-muted-foreground font-semibold">
                  {rating?.Source}
                </div>{" "}
                <div className="flex gap-2 items-center justify-center">
                  {rating?.Source === "Internet Movie Database" && (
                    <Star fill="yellow" stroke="yellow" className="w-4 h-4" />
                  )}
                  {rating?.Source === "Rotten Tomatoes" && <RottonTomato />}
                  {rating?.Value}
                </div>
              </div>
            ))}
            <div className="flex flex-1 flex-col text-center gap-1">
              <div className="text-muted-foreground">IMDB Votes</div>
              <div className="flex gap-2 items-center justify-center">
                {data?.imdbVotes}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between text-center text-xl bg-accent px-8 py-4 rounded-lg">
          <div className="flex flex-1 flex-col">
            <div className="text-muted-foreground font-bold ">Rated</div>
            <div className=""> {data?.Rated}</div>
          </div>
          <div className="flex flex-1 flex-col">
            <div className="text-muted-foreground font-bold ">Year</div>
            <div className=""> {data?.Year}</div>
          </div>
          <div className="flex flex-1 flex-col">
            <div className="text-muted-foreground font-bold ">Metascore</div>
            <div className=""> {data?.Metascore}</div>
          </div>{" "}
          <div className="flex flex-1 flex-col">
            <div className="text-muted-foreground font-bold ">Runtime</div>
            <div className=""> {data?.Runtime}</div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-muted-foreground font-bold text-xl">
            Synopsis
          </div>
          <div className="tracking-wider">{data?.Plot}</div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
