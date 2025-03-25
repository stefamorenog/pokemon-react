import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import { useState } from "react";

const Trae_Lista_Pokemon = gql`
  query GetPokemons($name: String, $type: String, $offset: Int, $limit: Int) {
    pokemon_v2_pokemon(
      limit: $limit
      offset: $offset
      where: {
        name: { _ilike: $name }
        pokemon_v2_pokemontypes: { pokemon_v2_type: { name: { _ilike: $type } } }
      }
    ) {
      id
      name
      pokemon_v2_pokemonsprites {
        sprites
      }
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
    }
  }
`;

export const PokemonList = () => {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [offset, setOffset] = useState(0);
  const limit = 20;

  const { loading, error, data, fetchMore } = useQuery(Trae_Lista_Pokemon, {
    variables: { name: `%${search}%`, type: type ? `%${type}%` : "%%", offset, limit },
    fetchPolicy: "cache-and-network",
  });

  console.log("Loading:", loading);
  console.log("Error:", error);
  console.log("Data:", data);


  const loadMore = () => {
    fetchMore({
      variables: { offset: offset + limit },
    });
    setOffset((prev) => prev + limit);
  };

  if (loading)
    return (
      <div
        className="flex flex-col justify-center items-center min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/loading.jpg')" }} 
      >
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
        <p className="mt-4 text-lg font-semibold text-white">Cargando Pokémon...</p>
      </div>
    );
  if (error) return <p className="text-center text-red-500 mt-10">Error al cargar los datos.</p>;

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat p-4"
      style={{ backgroundImage: "url('/background.jpg')" }} 
    >
      <div className="container mx-auto bg-white bg-opacity-90 p-6 rounded-lg shadow-lg">
        <Link
          to="/"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg text-lg transition duration-300"
        >
          Volver al inicio
        </Link>
        <h1 className="text-3xl font-bold text-center mb-6">Lista de Pokémon</h1>
        <div className="flex justify-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Buscar por nombre"
            className="border px-4 py-2 rounded"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="border px-4 py-2 rounded"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">Todos los tipos</option>
            <option value="fire">Fuego</option>
            <option value="water">Agua</option>
            <option value="grass">Planta</option>
            <option value="electric">Eléctrico</option>
          </select>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
          {data?.pokemon_v2_pokemon?.map((pokemon: any) => (
            <Link
              to={`/pokemondet/${pokemon.name}`}
              key={pokemon.id}
              className="border p-4 rounded-lg shadow-md hover:shadow-lg transition bg-white bg-opacity-80"
            >
              <div className="group relative bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
                <img
                  src={
                    typeof pokemon.pokemon_v2_pokemonsprites[0].sprites === "string"
                      ? JSON.parse(pokemon.pokemon_v2_pokemonsprites[0].sprites).front_default
                      : pokemon.pokemon_v2_pokemonsprites[0].sprites.front_default
                  }
                  alt={pokemon.name}
                  className="w-full h-32 object-contain min-h-screen bg-center bg-no-repeat p-4"
                  style={{ backgroundImage: "url('/pokedex1.jpg')" }} 
                  
                />
              </div>                      
              <h2 className="text-lg font-bold text-center capitalize">{pokemon.name}</h2>
              <p className="text-center text-sm text-gray-500">
                {pokemon.pokemon_v2_pokemontypes.map((t: any) => t.pokemon_v2_type.name).join(", ")}
              </p>
            </Link>
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg text-lg transition duration-300"
            onClick={loadMore}
          >
            Cargar más
          </button>
        </div>
      </div>
    </div>
  );
};
