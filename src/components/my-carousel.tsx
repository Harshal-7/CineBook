"use client";
import React, { Fragment } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";

const MyCarousel = ({ data }: any) => {
  return (
    <Fragment>
      <Carousel
        opts={{
          align: "start",
          slidesToScroll: "auto",
          loop: true,
        }}
        className="w-full max-w-screen-xl group"
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
        <CarouselPrevious className="top-[45%] -translate-[45%] -left-6 opacity-0 group-hover:opacity-100 transition-all duration-300" />
        <CarouselNext className="top-[45%] -translate-[45%]  opacity-0 group-hover:opacity-100 transition-all duration-300" />
      </Carousel>
    </Fragment>
  );
};

export default MyCarousel;
