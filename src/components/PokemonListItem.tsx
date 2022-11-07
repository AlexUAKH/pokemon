import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "../hooks/appSelector";
import { usePokemon } from "../hooks/usePokemon";
import { selectedType } from "../store/slices/pokemonSlice";

import Loader from "./Loader";

export interface PokemonListItemProps {
  name: string;
}

const PokemonListItem: FC<PokemonListItemProps> = ({ name }) => {
  const { pokemon, loading, error } = usePokemon(name);
  const activeType = useAppSelector(selectedType);
  const router = useNavigate();

  return (
    <>
      {!activeType || pokemon?.types.includes(activeType) ? (
        <div
          className="pokemons__list-item"
          onClick={() => router(`/pokemon/${pokemon?.name}`)}
        >
          {loading && <Loader />}
          {!loading && pokemon ? (
            <>
              <div className="pokemons__list-item-img ibg">
                <img src={pokemon.sprites} alt={pokemon.name} />
              </div>
              <div className="pokemons__list-item-name">
                <span>{pokemon.name}</span>&nbsp;({pokemon.types.join(", ")})
              </div>
            </>
          ) : null}
          {error && <h3>Can't load {pokemon?.name}</h3>}
        </div>
      ) : null}
    </>
  );
};

export default PokemonListItem;
