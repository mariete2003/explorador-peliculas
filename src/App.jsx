import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MovieProvider } from "./contexts/MovieContext";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import "./App.css";

function App() {
  return (
    <MovieProvider>
      <BrowserRouter>
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
      </BrowserRouter>
    </MovieProvider>
  );
}

export default App;
