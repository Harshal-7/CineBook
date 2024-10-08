"use client";

import React, { Fragment, useEffect, useState } from "react";

import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import {
  addToBookmark,
  checkIfBookmarked,
  removeFromCart,
} from "@/utils/bookmark";
import { Bookmark, Heart, Info, Star, ThumbsUp, Vote } from "lucide-react";
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
import { useRouter } from "next/navigation";

const Movie = ({ params }: { params: { id: any } }) => {
  const [data, setData] = useState<any>();
  const [reviewData, setReviewData] = useState<any>();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const fetchMovies = async () => {
      const options = {
        method: "GET",
        url: `https://api.themoviedb.org/3/movie/${params.id}?language=en-US`,
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OWEwOGQwZDZmMjI3ZTQ2ZDZhNTRkYzA1ZGNiNWJkYSIsIm5iZiI6MTcyNTQyMzQwOC43MTY5NzYsInN1YiI6IjY1YzNjZTFiYzE1Zjg5MDE2M2Y1NThmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8Cg2PS8MCZqlG81r4q_xsqLcHhczFuvOCPxVPwiWG6M",
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

  // Check if movie is already bookmarked or not
  useEffect(() => {
    const fetchBookmarkData = async () => {
      const res = await checkIfBookmarked(Number(params.id));
      if (res?.id) {
        setIsBookmarked(true);
      }
    };
    fetchBookmarkData();
  }, []);

  useEffect(() => {
    const fetchMovieReview = async () => {
      const options = {
        method: "GET",
        url: `https://api.themoviedb.org/3/movie/${params.id}/reviews?language=en-US&page=1`,
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OWEwOGQwZDZmMjI3ZTQ2ZDZhNTRkYzA1ZGNiNWJkYSIsIm5iZiI6MTcyNTQyMzQwOC43MTY5NzYsInN1YiI6IjY1YzNjZTFiYzE1Zjg5MDE2M2Y1NThmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8Cg2PS8MCZqlG81r4q_xsqLcHhczFuvOCPxVPwiWG6M",
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
      const result = await addToBookmark(movie);

      if (!result) {
        router.push("/login");
        toast({
          title: "Login to add movies and shows to bookmark",
          className: "bg-primary text-white",
        });
        return;
      }

      toast({
        title: "Movie added to bookmark",
        className: "bg-primary text-white",
      });
    } else {
      await removeFromCart(movie);
      toast({
        title: "Movie removed to bookmark",
      });
    }
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
            className="absolute top-0 left-0 bg-transparent p-3 rounded-br-lg"
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
          <div className="text-5xl font-bold text-red-500">{data?.title}</div>

          <div className="flex flex-col text-xl gap-4">
            <div>
              <span className="text-muted-foreground font-semibold">
                Released :
              </span>
              <span className=""> {data?.release_date}</span>
            </div>

            <div className="flex gap-2">
              <div className="text-muted-foreground font-bold ">Rating :</div>
              <div className="flex items-center gap-2">
                {" "}
                {data?.adult ? "R-Rated" : "PG-13"}{" "}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="">
                      <Info className="w-4 h-4" />
                    </TooltipTrigger>
                    <TooltipContent className="font-bold text-base">
                      {data?.adult
                        ? "For adutls : above 18 years"
                        : "Childrens under 13 can watch"}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
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

            <div>
              <span className="text-muted-foreground font-semibold">
                Box Office :
              </span>
              <span className=""> ${data?.revenue}</span>
            </div>
            <div className="flex gap-2">
              <div className="text-muted-foreground font-bold ">
                Production Companies :
              </div>
              <div className="flex gap-4">
                {data?.production_companies
                  .slice(0, 3)
                  .map((_: any, i: number) => (
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
        {/* Box-Info */}
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
            <div className="text-muted-foreground">Runtime</div>
            <div className="flex gap-2 items-center justify-center">
              {data?.runtime} Minutes
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

export default Movie;
