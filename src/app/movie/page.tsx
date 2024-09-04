"use client";

import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";

import MyCarousel from "@/components/my-carousel";

const MoviesPage = () => {
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
    return <div>loading...</div>;
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
};

export default MoviesPage;
