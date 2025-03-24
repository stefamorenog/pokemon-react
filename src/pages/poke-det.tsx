import { useQuery, gql } from "@apollo/client";
import { useParams, Link } from "react-router-dom";

const GET_POKEMON_DETAIL = gql`
  query GetPokemonDetail($name: String!) {
    pokemon_v2_pokemon(where: { name: { _eq: $name } }) {
      id
      name
      height
      weight
      pokemon_v2_pokemonsprites {
        sprites
      }
      pokemon_v2_pokemonstats {
        base_stat
        pokemon_v2_stat {
          name
        }
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
  const { name } = useParams<{ name: string }>();
  const { loading, error, data } = useQuery(GET_POKEMON_DETAIL, {
    variables: { name },
  });

  if (loading) return <p className="text-center mt-10">Cargando...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">Error al cargar los datos.</p>;

  const pokemon = data.pokemon_v2_pokemon[0];
  const sprite = JSON.parse(pokemon.pokemon_v2_pokemonsprites[0].sprites).front_default;

  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold capitalize mb-4">{pokemon.name}</h1>
      <img src={sprite} alt={pokemon.name} className="mx-auto w-40 h-40" />
      <p className="text-lg">Altura: {pokemon.height / 10} m</p>
      <p className="text-lg">Peso: {pokemon.weight / 10} kg</p>
      <h2 className="text-xl font-bold mt-4">Estadísticas</h2>
      <ul className="list-disc list-inside">
        {pokemon.pokemon_v2_pokemonstats.map((stat: any) => (
          <li key={stat.pokemon_v2_stat.name}>
            {stat.pokemon_v2_stat.name}: {stat.base_stat}
          </li>
        ))}
      </ul>
      <Link to="/pokemon" className="mt-6 inline-block px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700 transition">
        Volver a la lista
      </Link>
    </div>
  );
};


