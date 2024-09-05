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
      title: movie.title,
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

// TVSHOW :

export const addToBookmarkTvshow = async (show: any) => {
  const isPresent = await db.bookmarkShows.findFirst({
    where: {
      id: show?.id,
    },
  });

  if (isPresent) {
    console.log("is present : ", isPresent);

    return isPresent;
  }

  const res = await db.bookmarkShows.create({
    data: {
      id: show.id,
      name: show.name,
      poster_path: show.poster_path,
    },
  });

  console.log("ressss : ", res);

  return res;
};

export const removeShowFromCart = async (id: any) => {
  const isPresent = await db.bookmarkShows.findFirst({
    where: {
      id: id,
    },
  });

  if (isPresent) {
    const deleteUser = await db.bookmarkShows.delete({
      where: {
        id: isPresent.id,
        userId: isPresent.userId,
      },
    });

    return deleteUser;
  }
};

export const fetchBookmarkShows = async () => {
  const shows = await db.bookmarkShows.findMany();
  return shows;
};

export const checkIfBookmarkedShow = async (id: any) => {
  const show = await db.bookmarkShows.findFirst({
    where: {
      id: id,
    },
  });

  return show;
};
