/*import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";

const Trae_Deta_Pokemon = gql`
  query GetPokemonDetails($name: String!) {
    pokemon_v2_pokemon(where: { name: { _eq: $name } }) {
      id
      name
      height
      weight
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonstats {
        base_stat
        pokemon_v2_stat {
          name
        }
      }
      pokemon_v2_pokemonabilities {
        pokemon_v2_ability {
          name
        }
      }
      pokemon_v2_pokemonsprites {
        sprites
      }
    }
  }
`;

export const PokemonDet = () => {
  const { name } = useParams();
  const { loading, error, data } = useQuery(Trae_Deta_Pokemon, {
    variables: { name },
  });

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar el Pokémon</p>;
  if (!data || !data.pokemon_v2_pokemon.length) return <p>Pokémon no encontrado</p>;

  const pokemon = data.pokemon_v2_pokemon[0];

  return (
    <div>
      <h1 >{pokemon.name}</h1>
      <img
        src={
          typeof pokemon.pokemon_v2_pokemonsprites[0].sprites === "string"
            ? JSON.parse(pokemon.pokemon_v2_pokemonsprites[0].sprites).front_default
            : pokemon.pokemon_v2_pokemonsprites[0].sprites.front_default
        }
        alt={pokemon.name}
      />
      <p >Altura: {pokemon.height}</p>
      <p >Peso: {pokemon.weight}</p>
      <p >
      Tipos:{" "}
        {pokemon.pokemon_v2_pokemontypes?.map((t: { pokemon_v2_type: { name: string } }) => t.pokemon_v2_type.name).join(", ") || "Desconocido"}
      </p>
      <div >
        <h2>Estadísticas de Combate</h2>
        <ul>
          {pokemon.pokemon_v2_pokemonstats.map((stat: any) => (
            <li key={stat.pokemon_v2_stat.name}>
              <span className="capitalize">{stat.pokemon_v2_stat.name}:</span>
              <span className="font-semibold">{stat.base_stat}</span>
            </li>
          ))}
        </ul>
      </div>
      <Link to="/pokemonlist">Ver todos  </Link>
    </div>
  );
};*/

import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";

const Trae_Deta_Pokemon = gql`
  query GetPokemonDetails($name: String!) {
    pokemon_v2_pokemon(where: { name: { _eq: $name } }) {
      id
      name
      height
      weight
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonstats {
        base_stat
        pokemon_v2_stat {
          name
        }
      }
      pokemon_v2_pokemonabilities {
        pokemon_v2_ability {
          name
        }
      }
      pokemon_v2_pokemonsprites {
        sprites
      }
    }
  }
`;

export const PokemonDet = () => {
  const { name } = useParams();
  const { loading, error, data } = useQuery(Trae_Deta_Pokemon, {
    variables: { name },
  });

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
  if (error) return <p className="text-center text-red-500 mt-10">Error al cargar el Pokémon</p>;
  if (!data || !data.pokemon_v2_pokemon.length) return <p className="text-center text-gray-500 mt-10">Pokémon no encontrado</p>;

  const pokemon = data.pokemon_v2_pokemon[0];

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
      {/* Fondo de pantalla */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/pokedex3.jpg')" }}></div>

      {/* Contenedor principal */}
      <div className="relative bg-white p-8 rounded-lg shadow-2xl max-w-lg w-full text-center opacity-90">
        <h1 className="text-4xl font-bold capitalize text-gray-900 mb-4">{pokemon.name}</h1>

        {/* Imagen del Pokémon */}
        <div className="group relative bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
          <img
            src={
              typeof pokemon.pokemon_v2_pokemonsprites[0].sprites === "string"
                ? JSON.parse(pokemon.pokemon_v2_pokemonsprites[0].sprites).front_default
                : pokemon.pokemon_v2_pokemonsprites[0].sprites.front_default
            }
            alt={pokemon.name}
            className="w-48 h-48 mx-auto border-4 border-gray-300 rounded-full transition-transform transform group-hover:rotate-6"
          />
        </div>

        {/* Información básica */}
        <div className="mt-4 text-lg text-gray-700">
          <p><span className="font-semibold">Altura:</span> {pokemon.height} dm</p>
          <p><span className="font-semibold">Peso:</span> {pokemon.weight} hg</p>
          <p><span className="font-semibold">Tipos:</span> {pokemon.pokemon_v2_pokemontypes.map((t: any) => t.pokemon_v2_type.name).join(", ") || "Desconocido"}</p>
        </div>

        {/* Estadísticas de combate */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800">Estadísticas de Combate</h2>
          <ul className="mt-2">
            {pokemon.pokemon_v2_pokemonstats.map((stat: any) => (
              <li key={stat.pokemon_v2_stat.name} className="text-gray-600">
                <span className="capitalize font-medium">{stat.pokemon_v2_stat.name}:</span> {stat.base_stat}
              </li>
            ))}
          </ul>
        </div>

        {/* Botón para regresar */}
        <Link to="/pokemonlist" className="mt-6 inline-block bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg text-lg transition duration-300">
          Ver todos los Pokémon
        </Link>
      </div>
    </div>
  );
};
