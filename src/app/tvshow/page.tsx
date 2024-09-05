"use client";

import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";

import MyCarousel from "@/components/my-carousel";
import MyCarouselTvshow from "@/components/my-carousel-tvshow";

const TvShowPage = () => {
  const [nowPlaying, setNowPlaying] = useState<any>();
  const [popular, setPopular] = useState<any>();
  const [topRated, setTopRated] = useState<any>();
  const [onTheAir, setOnTheAir] = useState<any>();

  useEffect(() => {
    const fetchNowPlaying = async () => {
      const options = {
        method: "GET",
        url: "https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OWEwOGQwZDZmMjI3ZTQ2ZDZhNTRkYzA1ZGNiNWJkYSIsIm5iZiI6MTcyNTU0NjE1Mi4yMDEzMTYsInN1YiI6IjY1YzNjZTFiYzE1Zjg5MDE2M2Y1NThmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1TK76G1Io3ydSVgjqH3dEZPiTP33_gg3pYNaV8Ys6YI",
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
        url: "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OWEwOGQwZDZmMjI3ZTQ2ZDZhNTRkYzA1ZGNiNWJkYSIsIm5iZiI6MTcyNTU0NjE1Mi4yMDEzMTYsInN1YiI6IjY1YzNjZTFiYzE1Zjg5MDE2M2Y1NThmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1TK76G1Io3ydSVgjqH3dEZPiTP33_gg3pYNaV8Ys6YI",
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
          setTopRated(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    };

    const fetchOnTheAir = async () => {
      const options = {
        method: "GET",
        url: "https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OWEwOGQwZDZmMjI3ZTQ2ZDZhNTRkYzA1ZGNiNWJkYSIsIm5iZiI6MTcyNTU0NjE1Mi4yMDEzMTYsInN1YiI6IjY1YzNjZTFiYzE1Zjg5MDE2M2Y1NThmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1TK76G1Io3ydSVgjqH3dEZPiTP33_gg3pYNaV8Ys6YI",
        },
      };

      await axios
        .request(options)
        .then(function (response) {
          setOnTheAir(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    };

    fetchNowPlaying();
    fetchPopular();
    fetchTopRated();
    fetchOnTheAir();
  }, []);

  if (!nowPlaying || !popular || !topRated || !onTheAir) {
    return <div>loading...</div>;
  }

  return (
    <div className="flex w-full h-screen flex-col gap-10 my-10">
      <div className="flex flex-col gap-5">
        <div className="ml-5 text-3xl font-bold"> Top Rated </div>
        <MyCarouselTvshow data={topRated} />
      </div>

      <div className="flex flex-col gap-5">
        <div className="ml-5 text-3xl font-bold"> Popular </div>
        <MyCarouselTvshow data={popular} />
      </div>

      <div className="flex flex-col gap-5">
        <div className="ml-5 text-3xl font-bold"> Now Playing </div>
        <MyCarouselTvshow data={nowPlaying} />
      </div>

      <div className="flex flex-col gap-5">
        <div className="ml-5 text-3xl font-bold"> On The Air </div>
        <MyCarouselTvshow data={onTheAir} />
      </div>
    </div>
  );
};

export default TvShowPage;
