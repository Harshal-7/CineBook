import SearchBar from "@/components/search-bar";
import TrendingMovies from "@/components/trending-movies";
import TrendingTvshows from "@/components/trending-tvshow";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-start gap-10 p-6 text-red">
      <SearchBar />
      <div className="flex flex-col gap-5">
        <div className="text-3xl ml-5 font-bold">Trending Movies</div>
        <TrendingMovies />
      </div>
      <div className="flex flex-col gap-5">
        <div className="text-3xl ml-5 font-bold">Trending TV Shows</div>
        <TrendingTvshows />
      </div>
      <div>
        <div className="text-3xl">Recommended for you</div>
      </div>
    </div>
  );
}
