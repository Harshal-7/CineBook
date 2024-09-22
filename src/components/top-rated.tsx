"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function TopRatedMovies() {
  const [topRatedMovieData, setTopRatedMovieData] = useState<any>();

  // Fetch top-rated movies data
  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      const options = {
        method: "GET",
        url: "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OWEwOGQwZDZmMjI3ZTQ2ZDZhNTRkYzA1ZGNiNWJkYSIsIm5iZiI6MTcyNTQyMzQwOC43MTY5NzYsInN1YiI6IjY1YzNjZTFiYzE1Zjg5MDE2M2Y1NThmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8Cg2PS8MCZqlG81r4q_xsqLcHhczFuvOCPxVPwiWG6M",
        },
      };

      await axios
        .request(options)
        .then(function (response) {
          setTopRatedMovieData(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    };

    fetchTopRatedMovies();
  }, []);

  return (
    <Carousel
      opts={{
        align: "start",
        slidesToScroll: "auto",
        loop: true,
      }}
      className="w-full max-w-screen-2xl group pr-5"
    >
      <CarouselContent className="flex gap-5 ml-5">
        {topRatedMovieData?.results.map((movies: any, index: number) => (
          <Link
            key={index}
            href={`/movie/${movies.id}`}
            className="cursor-pointer hover:font-semibold transition-all duration-300"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${movies.poster_path}`}
              alt="poster"
              className="w-[250px] h-fit max-w-[250px] max-h-[350px] object-fill object-center rounded-lg"
            />
            <div className="py-2 text-center text-xl ">{movies.title}</div>
          </Link>
        ))}
      </CarouselContent>
      <CarouselPrevious className="top-[45%] -translate-[45%] -left-6 opacity-0 group-hover:opacity-100 transition-all duration-300" />
      <CarouselNext className="top-[45%] -translate-[45%]  opacity-0 group-hover:opacity-100 transition-all duration-300" />
    </Carousel>
  );
}

export function TopRatedTvshows() {
  const [topRatedTvShowData, setTopRatedTvShowData] = useState<any>();

  // Fetch top-rated tv show data
  useEffect(() => {
    const fetTopRatedTvShows = async () => {
      const options = {
        method: "GET",
        url: "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OWEwOGQwZDZmMjI3ZTQ2ZDZhNTRkYzA1ZGNiNWJkYSIsIm5iZiI6MTcyNTU0NjE1Mi4yMDEzMTYsInN1YiI6IjY1YzNjZTFiYzE1Zjg5MDE2M2Y1NThmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1TK76G1Io3ydSVgjqH3dEZPiTP33_gg3pYNaV8Ys6YI",
        },
      };

      await axios
        .request(options)
        .then(function (response) {
          setTopRatedTvShowData(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    };

    fetTopRatedTvShows();
  }, []);

  return (
    <Carousel
      opts={{
        align: "start",
        slidesToScroll: "auto",
        loop: true,
      }}
      className="w-full max-w-screen-2xl group pr-5"
    >
      <CarouselContent className="flex gap-5 ml-5">
        {topRatedTvShowData?.results.map((tvshow: any, index: number) => (
          <Link
            key={index}
            href={`/tvshow/${tvshow.id}`}
            className="cursor-pointer hover:font-semibold transition-all duration-300"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${tvshow.poster_path}`}
              alt="poster"
              className="w-[250px] h-fit max-w-[250px] max-h-[350px] object-fill object-center rounded-lg"
            />
            <div className="py-2 text-center text-xl ">{tvshow.name}</div>
          </Link>
        ))}
      </CarouselContent>
      <CarouselPrevious className="top-[45%] -translate-[45%] -left-6 opacity-0 group-hover:opacity-100 transition-all duration-300" />
      <CarouselNext className="top-[45%] -translate-[45%]  opacity-0 group-hover:opacity-100 transition-all duration-300" />
    </Carousel>
  );
}
