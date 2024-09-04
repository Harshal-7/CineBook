"use server";

import { db } from "@/lib/db";

export const addToBookmark = async (movie: any) => {
  const isPresent = await db.bookmark.findFirst({
    where: {
      id: movie?.id,
    },
  });

  if (isPresent) {
    console.log("is present : ", isPresent);

    return isPresent;
  }

  const res = await db.bookmark.create({
    data: {
      id: movie.id,
      imdbID: movie.imdbID,
      title: movie.title || movie.name,
      poster_path: movie.poster_path,
    },
  });

  console.log("ressss : ", res);

  return res;
};

export const removeFromCart = async (id: any) => {
  const isPresent = await db.bookmark.findFirst({
    where: {
      id: id,
    },
  });

  if (isPresent) {
    const deleteUser = await db.bookmark.delete({
      where: {
        id: isPresent.id,
        userId: isPresent.userId,
      },
    });

    return deleteUser;
  }
};

export const fetchBookmarkMovies = async () => {
  const movie = await db.bookmark.findMany();
  return movie;
};

export const checkIfBookmarked = async (id: any) => {
  const movie = await db.bookmark.findFirst({
    where: {
      id: id,
    },
  });

  return movie;
};
