import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">

      <h1 className="text-4xl font-bold mb-4">Bienvenido a la nueva Pokédex</h1>
      <p className="text-lg mb-6">Explorar pokémons</p>
      <Link to="/pokemonlist" className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700 transition">
      Ver Pokémon
      </Link>
    </div>
  );
};

