import { createContext, useContext, useState, useEffect } from "react";

// 1. Crear el contexto
const MovieContext = createContext();

// 2. Custom hook para usar el contexto desde cualquier componente
export const useMovieContext = () => useContext(MovieContext);

// 3. Provider: envuelve la app y comparte los favoritos
export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // Cargar favoritos desde localStorage al iniciar
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
    setLoaded(true);
  }, []);

  // Guardar favoritos en localStorage cada vez que cambien
  useEffect(() => {
    if (loaded) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites, loaded]);

  // Añadir una película a favoritos
  const addToFavorites = (movie) => {
    setFavorites((prev) => [...prev, movie]);
  };

  // Quitar una película de favoritos por su id
  const removeFromFavorites = (movieId) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  // Saber si una película ya es favorita
  const isFavorite = (movieId) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};