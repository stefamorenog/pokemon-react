import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const GET_POKEMON_DETAILS = gql`
  query GetPokemonDetails($name: String!) {
    pokemon_v2_pokemon(where: { name: { _eq: $name } }) {
      id
      name
      height
      weight
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

export const PokemonDet = () => {
  const { name } = useParams(); // Obtiene el nombre del URL
  const { loading, error, data } = useQuery(GET_POKEMON_DETAILS, {
    variables: { name },
  });

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar el Pokémon</p>;
  if (!data || !data.pokemon_v2_pokemon.length) return <p>Pokémon no encontrado</p>;

  const pokemon = data.pokemon_v2_pokemon[0];

  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-4xl font-bold capitalize">{pokemon.name}</h1>
      <img
        src={
          typeof pokemon.pokemon_v2_pokemonsprites[0].sprites === "string"
            ? JSON.parse(pokemon.pokemon_v2_pokemonsprites[0].sprites).front_default
            : pokemon.pokemon_v2_pokemonsprites[0].sprites.front_default
        }
        alt={pokemon.name}
        className="mx-auto w-48 h-48"
      />
      <p className="text-lg mt-2">Altura: {pokemon.height}</p>
      <p className="text-lg">Peso: {pokemon.weight}</p>
      <p className="text-lg">
  Tipos:{" "}
  {pokemon.pokemon_v2_pokemontypes?.map((t: { pokemon_v2_type: { name: string } }) => t.pokemon_v2_type.name).join(", ") || "Desconocido"}
</p>
    </div>
  );
};

