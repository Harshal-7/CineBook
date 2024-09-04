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
import { Card, CardContent } from "./ui/card";

export default function TrendingMovies() {
  const [data, setData] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        url: "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OWEwOGQwZDZmMjI3ZTQ2ZDZhNTRkYzA1ZGNiNWJkYSIsIm5iZiI6MTcyNTQyMzQwOC43MTY5NzYsInN1YiI6IjY1YzNjZTFiYzE1Zjg5MDE2M2Y1NThmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8Cg2PS8MCZqlG81r4q_xsqLcHhczFuvOCPxVPwiWG6M",
        },
      };

      await axios
        .request(options)
        .then(function (response) {
          console.log("Trending Movies : ", response.data);
          setData(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    };

    fetchData();
  }, []);

  return (
    <Carousel
      opts={{
        align: "start",
        slidesToScroll: "auto",
        loop: true,
      }}
      className="w-full max-w-screen-xl"
    >
      <CarouselContent className="flex gap-5 ml-5">
        {data?.results.map((movie: any, index: number) => (
          <Link
            key={index}
            href={`/movie/${movie.id}`}
            className="group cursor-pointer"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt="poster"
              className="w-[250px] h-fit max-w-[250px] max-h-[350px] object-fill object-center rounded-lg"
            />
            <div className="py-2 group-hover:font-semibold transition-all duration-300 text-center text-xl ">
              {movie.title || movie.name}
            </div>
          </Link>
        ))}
      </CarouselContent>
      <CarouselPrevious className="top-[45%] -translate-[45%]" />
      <CarouselNext className="top-[45%] -translate-[45%] -right-16" />
    </Carousel>
  );
}
