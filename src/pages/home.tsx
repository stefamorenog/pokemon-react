/*import { Link } from "react-router-dom";

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
};*/

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center text-center p-6"
      style={{ backgroundImage: "url('/background.jpg')" }} 
    >
      {/* Imagen con animación */}
      <motion.img
        src="/pokedex.png" 
        alt="Pokédex"
        className="w-60 h-60 mb-6"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      
      {/* Título y descripción */}
      <h1 className="text-4xl font-bold text-red-600 mb-4">¡Bienvenido a la Pokédex!</h1>
      <p className="text-lg text-black-700 mb-6">
        Explora el mundo Pokémon, descubre sus características y encuentra tus favoritos.
      </p>
      
      {/* Botón de acceso */}
      <Link
        to="/pokemonlist"
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg text-lg transition duration-300"
      >
        Ver Pokémon
      </Link>
    </div>
  );
}
