import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import { useState } from "react";

const Trae_Lista_Pokemon = gql`
  query GetPokemons($name: String, $type: String) {
    pokemon_v2_pokemon(
      limit: 20
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
  const { loading, error, data } = useQuery(Trae_Lista_Pokemon, {
    variables: { name: `%${search}%`, type: type ? `%${type}%` : "%%" },
    fetchPolicy: "no-cache",
  });

  console.log("Loading:", loading);
  console.log("Error:", error);
  console.log("Data:", data);

  if (loading) return <p className="text-center mt-10">Cargando...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">Error al cargar los datos.</p>;

  return (
    
    <div className="container mx-auto p-4">
       <Link to="/">Volver al inicio </Link>
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data?.pokemon_v2_pokemon?.map((pokemon: any) => (
          <Link to={`/pokemondet/${pokemon.name}`} key={pokemon.id} className="border p-4 rounded-lg shadow-md hover:shadow-lg transition">
            <img
             src={
             typeof pokemon.pokemon_v2_pokemonsprites[0].sprites === "string"
              ? JSON.parse(pokemon.pokemon_v2_pokemonsprites[0].sprites).front_default
              : pokemon.pokemon_v2_pokemonsprites[0].sprites.front_default
             }
            alt={pokemon.name}
            className="w-full h-32 object-contain"
            />

            <h2 className="text-lg font-bold text-center capitalize">{pokemon.name}</h2>
            <p className="text-center text-sm text-gray-500">
              {pokemon.pokemon_v2_pokemontypes.map((t: any) => t.pokemon_v2_type.name).join(", ")}
            </p>
          </Link>
        ))}
      </div>
     
    </div>
  );
};

