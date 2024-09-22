"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";

export const addToBookmark = async (movie: any) => {
  const session = await auth();

  if (!session?.user?.email) {
    return null;
  }

  console.log("session : ", session);

  const isPresent = await db.bookmark.findFirst({
    where: {
      movieId: movie?.id,
      userEmail: session?.user?.email!,
    },
  });

  if (isPresent) {
    console.log("is present : ", isPresent);
    return isPresent;
  }

  const res = await db.bookmark.create({
    data: {
      movieId: movie.id,
      imdbID: movie.imdbID,
      title: movie.title,
      poster_path: movie.poster_path,
      user: {
        connect: { email: session?.user?.email! },
      },
    },
  });

  console.log("ressss : ", res);

  return res;
};

export const removeFromCart = async (movie: any) => {
  const isPresent = await db.bookmark.findFirst({
    where: {
      id: movie.movieId,
    },
  });

  console.log("isPresent : ", isPresent);

  if (isPresent) {
    const deleteUser = await db.bookmark.delete({
      where: {
        id: isPresent.id,
        userEmail: isPresent.userEmail,
      },
    });

    return deleteUser;
  }
};

export const fetchBookmarkMovies = async () => {
  const session = await auth();

  if (!session?.user?.email) {
    return;
  }

  const movie = await db.bookmark.findMany({
    where: {
      userEmail: session.user.email!,
    },
  });

  console.log("All Bookmarked Movies : ", movie);

  return movie;
};

export const checkIfBookmarked = async (id: any) => {
  const session = await auth();

  console.log(session);

  if (!session?.user?.email) {
    console.log("INSDIEEEE");

    return;
  }

  const movie = await db.bookmark.findFirst({
    where: {
      movieId: id,
      userEmail: session?.user?.email!,
    },
  });

  return movie;
};

// TVSHOW :

export const addToBookmarkTvshow = async (show: any) => {
  const session = await auth();

  if (!session?.user?.email) {
    return null;
  }

  const isPresent = await db.bookmarkShows.findFirst({
    where: {
      showId: show?.id,
      userEmail: session?.user?.email!,
    },
  });

  if (isPresent) {
    console.log("is present : ", isPresent);

    return isPresent;
  }

  const res = await db.bookmarkShows.create({
    data: {
      showId: show.id,
      name: show.name,
      poster_path: show.poster_path,
      user: {
        connect: {
          email: session?.user?.email!,
        },
      },
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
        userEmail: isPresent.userEmail,
      },
    });

    return deleteUser;
  }
};

export const fetchBookmarkShows = async () => {
  const session = await auth();

  if (!session?.user?.email) {
    return;
  }

  const shows = await db.bookmarkShows.findMany({
    where: {
      userEmail: session.user.email!,
    },
  });

  console.log("All Bookmarked Showes : ", shows);

  return shows;
};

export const checkIfBookmarkedShow = async (id: any) => {
  const session = await auth();

  if (!session?.user?.email) {
    return;
  }

  const show = await db.bookmarkShows.findFirst({
    where: {
      showId: id,
      userEmail: session?.user?.email!,
    },
  });

  return show;
};
