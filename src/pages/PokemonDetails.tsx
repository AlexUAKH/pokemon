import { FC } from "react";
import { useParams } from "react-router-dom";

import Pokemon from "../components/Pokemon";
import { usePokemon } from "../hooks/usePokemon";

const PokemonDetails: FC = () => {
  const { id = "0" } = useParams();
  const { pokemon, loading, error } = usePokemon(id);
  console.log("render", id);

  return (
    <div className="details container">
      {loading && <h3>Loading...</h3>}
      {error && <h3 className="error">{error}</h3>}
      {!loading &&
        (pokemon ? <Pokemon pokemon={pokemon} /> : <h2>Can't find</h2>)}
    </div>
  );
};

export default PokemonDetails;
