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
};
