import React, { createContext, useContext, useState } from "react";

type Movie = {
  movie_id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
};

const SavedContext = createContext<any>(null);

export const SavedProvider = ({ children }: any) => {
  const [savedMovies, setSavedMovies] = useState<Movie[]>([]);

  const toggleSave = (movie: Movie) => {
    const exists = savedMovies.find((m) => m.movie_id === movie.movie_id);

    if (exists) {
      setSavedMovies(savedMovies.filter((m) => m.movie_id !== movie.movie_id));
    } else {
      setSavedMovies([...savedMovies, movie]);
    }
  };

  const isSaved = (movie_id: number) => {
    return savedMovies.some((m) => m.movie_id === movie_id);
  };

  return (
    <SavedContext.Provider value={{ savedMovies, toggleSave, isSaved }}>
      {children}
    </SavedContext.Provider>
  );
};

export const useSaved = () => useContext(SavedContext);
