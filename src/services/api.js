const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

// Opciones comunes para todas las peticiones
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TOKEN}`,
  },
};

// Películas populares
export const getPopularMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/movie/popular?language=es-ES`,
    options
  );
  if (!response.ok) {
    throw new Error("No se pudieron cargar las películas populares");
  }
  const data = await response.json();
  return data.results;
};

// Buscar películas por título
export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&language=es-ES`,
    options
  );
  if (!response.ok) {
    throw new Error("Error al buscar películas");
  }
  const data = await response.json();
  return data.results;
};