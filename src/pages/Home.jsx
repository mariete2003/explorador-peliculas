import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { getPopularMovies, searchMovies } from "../services/api";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar películas populares al montar el componente
  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar las películas populares");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  // Buscar películas por título
  const handleSearch = async (e) => {
    e.preventDefault(); // Evita que el formulario recargue la página
    if (!searchQuery.trim()) return; // No buscar si está vacío
    if (loading) return; // No buscar si ya hay una búsqueda en marcha

    setLoading(true);
    try {
      const results = await searchMovies(searchQuery);
      setMovies(results);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Error al buscar películas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Buscar películas..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Buscar
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>Cargando películas...</p>
        </div>
      ) : movies.length === 0 ? (
        <p className="no-results">No se encontraron películas</p>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;