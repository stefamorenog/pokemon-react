import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center text-center p-6"
      style={{ backgroundImage: "url('/background.png')" }} 
    >
  
      <motion.img
        src="/pokedex.png" 
        alt="Pokédex"
        className="w-100% h-auto mb-6"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      />
      

      <h1 className="text-6xl font-bold mb-4">¡Bienvenido a la nueva Pokédex!</h1>
      <p className="text-3xl text-black-700 mb-6">
        Explora el mundo Pokémon, descubre sus características y encuentra tus favoritos.
      </p>
      

      <Link to="/pokemonlist" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg text-lg transition duration-300">
        Ver Pokémon
      </Link>
    </div>
  );
}
