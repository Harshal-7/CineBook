"use client";

import { useEffect, useState } from "react";
import React from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function SearchBar() {
  const [input, setInput] = useState("");
  const router = useRouter();

  const pathname = usePathname();

  const handleSearch = () => {
    router.push(`/search/${input}`);
    setInput("");
  };

  // on login and register page we are not showing the searbar
  if (pathname.includes("/login")) {
    return;
  }
  if (pathname.includes("/register")) {
    return;
  }

  return (
    <div className="flex justify-center items-center gap-5 w-full mt-5 mx-5 py-5">
      <button onClick={handleSearch}>
        <Search className="w-6 h-6 text-muted-foreground" />
      </button>
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search for Movies or TV series"
        className="w-full text-xl border-b rounded-none shadow-none px-0"
      />
    </div>
  );
}
