import React, { createContext, useContext, useState } from 'react';

const GenreContext = createContext();

export const useGenre = () => {
  return useContext(GenreContext);
};

export const GenreProvider = ({ children }) => {
  const [selectedGenre, setSelectedGenre] = useState(null);

  return (
    <GenreContext.Provider value={{ selectedGenre, setSelectedGenre }}>
      {children}
    </GenreContext.Provider>
  );
};
