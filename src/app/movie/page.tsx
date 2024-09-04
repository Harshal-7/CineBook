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

export default function MoviesPage() {
  const [nowPlaying, setNowPlaying] = useState<any>();
  const [popular, setPopular] = useState<any>();
  const [topRated, setTopRated] = useState<any>();
  const [upcoming, setUpcoming] = useState<any>();

  useEffect(() => {
    const fetchNowPlaying = async () => {
      const options = {
        method: "GET",
        url: "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OWEwOGQwZDZmMjI3ZTQ2ZDZhNTRkYzA1ZGNiNWJkYSIsIm5iZiI6MTcyNTQyMzQwOC43MTY5NzYsInN1YiI6IjY1YzNjZTFiYzE1Zjg5MDE2M2Y1NThmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8Cg2PS8MCZqlG81r4q_xsqLcHhczFuvOCPxVPwiWG6M",
        },
      };

      await axios
        .request(options)
        .then(function (response) {
          setNowPlaying(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    };

    const fetchPopular = async () => {
      const options = {
        method: "GET",
        url: "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OWEwOGQwZDZmMjI3ZTQ2ZDZhNTRkYzA1ZGNiNWJkYSIsIm5iZiI6MTcyNTQyMzQwOC43MTY5NzYsInN1YiI6IjY1YzNjZTFiYzE1Zjg5MDE2M2Y1NThmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8Cg2PS8MCZqlG81r4q_xsqLcHhczFuvOCPxVPwiWG6M",
        },
      };

      await axios
        .request(options)
        .then(function (response) {
          setPopular(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    };

    const fetchTopRated = async () => {
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
          setTopRated(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    };

    const fetchUpcoming = async () => {
      const options = {
        method: "GET",
        url: "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OWEwOGQwZDZmMjI3ZTQ2ZDZhNTRkYzA1ZGNiNWJkYSIsIm5iZiI6MTcyNTQyMzQwOC43MTY5NzYsInN1YiI6IjY1YzNjZTFiYzE1Zjg5MDE2M2Y1NThmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8Cg2PS8MCZqlG81r4q_xsqLcHhczFuvOCPxVPwiWG6M",
        },
      };

      await axios
        .request(options)
        .then(function (response) {
          setUpcoming(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    };

    fetchNowPlaying();
    fetchPopular();
    fetchTopRated();
    fetchUpcoming();
  }, []);

  if (!nowPlaying || !popular || !topRated || !upcoming) {
    return <div>loading</div>;
  }
  return (
    <div className="flex w-full h-screen flex-col gap-10 my-10">
      <div className="flex flex-col gap-5">
        <div className="ml-5 text-3xl font-bold"> Now Playing </div>
        <MyCarousel data={nowPlaying} />
      </div>
      <div className="flex flex-col gap-5">
        <div className="ml-5 text-3xl font-bold"> Popular </div>
        <MyCarousel data={popular} />
      </div>
      <div className="flex flex-col gap-5">
        <div className="ml-5 text-3xl font-bold"> Top Rated </div>
        <MyCarousel data={topRated} />
      </div>
      <div className="flex flex-col gap-5">
        <div className="ml-5 text-3xl font-bold"> Upcoming </div>
        <MyCarousel data={upcoming} />
      </div>
    </div>
  );
}

export const MyCarousel: React.FC<{
  data: any;
}> = ({ data }) => {
  console.log(" DATA : ", data);

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
};
