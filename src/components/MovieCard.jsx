import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContext";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

function MovieCard({ movie }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id);

  // Añadir o quitar de favoritos
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    if (favorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  // De "2025-03-14" nos quedamos con "2025"
  const year = movie.release_date
    ? movie.release_date.split("-")[0]
    : "Sin fecha";

  return (
    <div className="movie-card">
      <div className="movie-poster">
        {movie.poster_path ? (
          <img src={`${IMAGE_URL}${movie.poster_path}`} alt={movie.title} />
        ) : (
          <div className="no-poster">Sin imagen</div>
        )}
        <div className="movie-overlay">
          <button
            className={`favorite-btn ${favorite ? "active" : ""}`}
            onClick={handleFavoriteClick}
            title={favorite ? "Quitar de favoritos" : "Añadir a favoritos"}
          >
            {favorite ? "♥" : "♡"}
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{year}</p>
      </div>
    </div>
  );
}

export default MovieCard;