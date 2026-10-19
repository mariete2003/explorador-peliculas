import { Link, NavLink } from "react-router-dom";
import { useMovieContext } from "../contexts/MovieContext";
import "../css/NavBar.css";

function NavBar() {
  const { favorites } = useMovieContext();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">🎬 Explorador de Películas</Link>
      </div>
      <div className="navbar-links">
        <NavLink to="/" end className="nav-link">
          Inicio
        </NavLink>
        <NavLink to="/favorites" className="nav-link">
          Favoritos
          {favorites.length > 0 && (
            <span className="fav-count">{favorites.length}</span>
          )}
        </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;