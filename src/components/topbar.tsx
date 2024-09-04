"use client";

import { useEffect } from "react";
import { Clapperboard, Popcorn } from "lucide-react";

export default function TopBar() {
  useEffect(() => {}, []);

  return (
    <div className="flex justify-center items-center gap-1 bg-accent text-red-500 font-semibold text-xl border-b w-full p-5">
      <Clapperboard className="w-5 h-5" />
      <span>CineBook</span>
    </div>
  );
}
