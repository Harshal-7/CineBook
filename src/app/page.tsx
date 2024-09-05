import SearchBar from "@/components/search-bar";
import { TopRatedMovies, TopRatedTvshows } from "@/components/top-rated";
import TrendingMovies from "@/components/trending-movies";
import TrendingTvshows from "@/components/trending-tvshow";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-start gap-5 p-5 text-red mt-5">
      <div className="flex flex-col gap-5">
        <div className="text-2xl font-bold ml-5">Trending Movies</div>
        <TrendingMovies />
      </div>
      <div className="flex flex-col gap-5">
        <div className="text-2xl font-bold ml-5">Trending TV Shows</div>
        <TrendingTvshows />
      </div>

      <div className="flex flex-col gap-5">
        <div className="text-2xl font-bold ml-5">Top Rated Movies</div>
        <TopRatedMovies />
      </div>

      <div className="flex flex-col gap-5">
        <div className="text-2xl font-bold ml-5">Top Rated TV Shows</div>
        <TopRatedTvshows />
      </div>
    </div>
  );
}
