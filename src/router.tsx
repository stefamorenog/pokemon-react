import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { PokemonList } from "./pages/poke-lista";
import { PokemonDet } from "./pages/poke-det";


export const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pokemonlist" element={<PokemonList />} />
      <Route path="/pokemondet/:name" element={<PokemonDet />} />
    </Routes>
  </Router>
);
