import { FC } from "react";
import { Link, useParams } from "react-router-dom";

import Loader from "../components/Loader";
import Pokemon from "../components/Pokemon";
import { usePokemon } from "../hooks/usePokemon";

const PokemonDetails: FC = () => {
  const { id = "0" } = useParams();
  const { pokemon, loading, error } = usePokemon(id);

  return (
    <div className="details container">
      <Link to="/" className="details__link btn">
        To main
      </Link>
      <div className="details__content">
        {loading && <Loader />}
        {!loading && error && <h3 className="error">{error}</h3>}
        {!loading && pokemon && Object.keys(pokemon).length && (
          <Pokemon pokemon={pokemon} />
        )}
      </div>
    </div>
  );
};

export default PokemonDetails;
