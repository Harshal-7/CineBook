"use client";

import React, { Fragment, useEffect, useState } from "react";

import axios from "axios";
import MovieCard from "@/components/movie-card";
import { useToast } from "@/hooks/use-toast";
import { addToBookmark } from "../../../../utils/bookmark";
import { Bookmark, Heart, Info, Star, ThumbsUp, Vote } from "lucide-react";
import { RottonTomato } from "../../../../utils/config";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  TooltipContent,
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
const TVShow = ({ params }: { params: { id: any } }) => {
  const [data, setData] = useState<any>();
  const [reviewData, setReviewData] = useState<any>();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchMovies = async () => {
      const options = {
        method: "GET",
        url: `https://api.themoviedb.org/3/tv/${params.id}?language=en-US`,
        headers: {
          accept: "application/json",
          Authorization: `${process.env.API_AUTHORIZATION}`,
        },
      };

      axios
        .request(options)
        .then(function (response) {
          console.log("DATAAAA : ", response.data);
          setData(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    const fetchMovieReview = async () => {
      const options = {
        method: "GET",
        url: `https://api.themoviedb.org/3/tv/${params.id}/reviews?language=en-US&page=1`,
        headers: {
          accept: "application/json",
          Authorization: `${process.env.API_AUTHORIZATION}`,
        },
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data.results);
          setReviewData(response.data.results);
        })
        .catch(function (error) {
          console.error(error);
          return error;
        });
    };

    fetchMovieReview();
  }, []);

  const handleBookmark = async (movie: any) => {
    if (!isBookmarked) {
      toast({
        title: "Movie added to bookmark",
        className: "bg-primary text-white",
      });
    }

    // const res = await addToBookmark(movie);

    // console.log("RESSS L : ", res);

    setIsBookmarked((prev) => !prev);
  };

  if (!data) {
    <div>Loading...</div>;
  }

  return (
    <div className="w-full mx-auto max-w-7xl flex flex-col p-6 gap-10 mt-10 tracking-wide mb-28">
      <div className="flex flex-col md:flex-row items-start gap-10">
        {/* Left Side  */}
        <div className="relative">
          <img
            src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
            alt="poster"
            className="max-w-[350px] max-h-[450px]"
          />
          <button
            onClick={() => handleBookmark(data)}
            className="absolute top-0 left-0 bg-transparent backdrop-blur-sm p-3 rounded-br-lg"
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
          <div className="text-5xl font-bold text-red-500">{data?.name}</div>

          <div className="flex flex-col text-xl gap-4">
            <div>
              <span className="text-muted-foreground font-semibold">
                Released :
              </span>
              <span className=""> {data?.first_air_date}</span>
            </div>
            <div>
              <span className="text-muted-foreground font-bold ">Status :</span>
              <span className=""> {data?.status}</span>
            </div>
            <div className="flex gap-2 items-center">
              <div className="text-muted-foreground font-bold">
                Available In :
              </div>
              {data?.spoken_languages.map((_: any, i: number) => (
                <div className="flex gap-2 " key={i}>
                  {_.name}
                </div>
              ))}
            </div>
            <div className="flex gap-2 items-center">
              <div className="text-muted-foreground font-bold">
                Created By :
              </div>
              {data?.created_by.map((_: any, i: number) => (
                <div className="flex gap-2 " key={i}>
                  {_.name}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <div className="text-muted-foreground font-bold ">
                Production Companies :
              </div>
              <div className="flex gap-3">
                {data?.production_companies.map((_: any, i: number) => (
                  <div className="" key={i}>
                    {_.name}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <span className="text-muted-foreground font-bold ">
                Country :
              </span>
              <span className=""> {data?.production_countries[0].name}</span>
            </div>
            <div className="flex gap-2 items-center">
              <div className="text-muted-foreground font-bold">Genres : </div>
              {data?.genres.map((_: any, i: number) => (
                <div
                  className="flex gap-2 bg-accent px-4 py-2 rounded-lg"
                  key={i}
                >
                  {_.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-8 text-xl">
        {/* Box-Info-1 */}
        <div className="flex justify-between bg-accent py-4 px-8 rounded-lg ">
          <div className="flex flex-1 flex-col text-center gap-1">
            <div className="text-muted-foreground font-semibold">Rating</div>{" "}
            <div className="flex gap-2 items-center justify-center">
              <Star fill="yellow" stroke="yellow" className="w-4 h-4" />
              {data?.vote_average.toFixed(1)} / 10
            </div>
          </div>

          <div className="flex flex-1 flex-col text-center gap-1">
            <div className="text-muted-foreground">Votes</div>
            <div className="flex gap-2 items-center justify-center">
              {data?.vote_count}
              <ThumbsUp fill="green" stroke="green" className="w-4 h-4" />
            </div>
          </div>

          <div className="flex flex-1 flex-col text-center gap-1">
            <div className="text-muted-foreground">Popularity</div>
            <div className="flex gap-2 items-center justify-center">
              {data?.popularity.toFixed(0)}
              <Heart fill="red" stroke="red" className="w-4 h-4" />
            </div>
          </div>

          <div className="flex flex-1 flex-col text-center gap-1">
            <div className="text-muted-foreground">Certification</div>
            <div className="flex items-center  justify-center gap-2 text-center">
              {data?.adult ? "R-Rated" : "PG-13"}{" "}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="">
                    <Info className="w-4 h-4" />
                  </TooltipTrigger>
                  <TooltipContent className="font-bold text-base text-center">
                    {data?.adult
                      ? "For adutls : above 18 years"
                      : "Childrens under 13 can watch"}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
        {/* Box-Info-2 */}
        <div className="flex justify-between bg-accent py-4 px-8 rounded-lg ">
          <div className="flex flex-1 flex-col text-center gap-1">
            <div className="text-muted-foreground font-semibold">
              Total Seasons
            </div>{" "}
            <div className="flex gap-2 items-center justify-center">
              {data?.number_of_seasons}
            </div>
          </div>

          <div className="flex flex-1 flex-col text-center gap-1">
            <div className="text-muted-foreground font-semibold">
              Total Episodes
            </div>{" "}
            <div className="flex gap-2 items-center justify-center">
              {data?.number_of_episodes}
            </div>
          </div>

          <div className="flex flex-1 flex-col text-center gap-1">
            <div className="text-muted-foreground">Networks</div>
            <div className="flex gap-2 items-center justify-center">
              <img
                src={`https://image.tmdb.org/t/p/w500/${data?.networks[0].logo_path}`}
                alt="logo"
                className="w-20"
              />
            </div>
          </div>

          <div className="flex flex-1 flex-col text-center gap-1">
            <div className="text-muted-foreground">Status</div>
            <div className="flex gap-2 items-center justify-center">
              {data?.status}
            </div>
          </div>
        </div>

        {/* Synopsis  */}
        <div className="flex flex-col gap-2">
          <div className="text-muted-foreground font-bold text-xl">
            Synopsis
          </div>
          <div className="">{data?.overview}</div>
        </div>

        {/* Reviews  */}
        <div className="flex flex-col gap-4">
          <div className="text-muted-foreground font-bold text-xl">
            User Reviews
          </div>

          {reviewData?.map((i: any, index: number) => (
            <div
              key={index}
              className="flex flex-col gap-2 bg-accent p-4 rounded-lg"
            >
              <div className="flex gap-1 items-center text-sm">
                <Star fill="yellow" stroke="yellow" className="w-3 h-3" />
                <div>{i.author_details.rating} / 10</div>
              </div>
              <div className="">{i.author}</div>
              <div className="">
                <Accordion type="single" collapsible>
                  <AccordionItem className="p-0" value="item-1">
                    <AccordionTrigger className="text-base p-0 text-start">
                      <div className="line-clamp-1 text-muted-foreground">
                        {i.content}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {i.content}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TVShow;
