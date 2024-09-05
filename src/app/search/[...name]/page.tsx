"use client";

import React, { Fragment, useEffect, useState } from "react";

import axios from "axios";
import MovieCard from "@/components/movie-card";

const SearchPage = ({ params }: { params: { name: any } }) => {
  const [data, setData] = useState<any>();
  const [result, setResult] = useState<any>();
  const [paramName, setParamName] = useState("");

  const [page, setPage] = useState(1);

  useEffect(() => {
    const name = params.name[0];
    if (name.includes("%20")) {
      setParamName(name.split("%20").join(" "));
    } else {
      setParamName(name);
    }
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      const options = {
        method: "GET",
        url: `https://api.themoviedb.org/3/search/movie?query=${params.name[0]}&include_adult=true&language=en-US&page=1`,
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OWEwOGQwZDZmMjI3ZTQ2ZDZhNTRkYzA1ZGNiNWJkYSIsIm5iZiI6MTcyNTQyMzQwOC43MTY5NzYsInN1YiI6IjY1YzNjZTFiYzE1Zjg5MDE2M2Y1NThmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8Cg2PS8MCZqlG81r4q_xsqLcHhczFuvOCPxVPwiWG6M",
        },
      };

      axios
        .request(options)
        .then(function (response) {
          console.log("response-data : ", response.data);
          setResult(response.data);
          setData(response.data.results);
        })
        .catch(function (error) {
          console.error(error);
        });
    };
    fetchMovies();
  }, []);

  if (!data) {
    <div>Loading...</div>;
  }

  return (
    <div className="w-full flex flex-col p-6 gap-y-5">
      <div className="text-3xl py-3">
        Found {result?.total_results} result for &apos;{paramName}&apos;
      </div>
      <div className="w-full flex flex-wrap gap-10">
        {data?.map((movie: any, index: number) => (
          <Fragment key={index}>
            <MovieCard movie={movie} />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
