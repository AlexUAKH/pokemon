import { FC } from "react";
import { useSelector } from "react-redux";

import { selectAllPokemons } from "../store/slices/pokemonSlice";

interface PokemonListProps {}

const PokemonList: FC<PokemonListProps> = () => {
  const pokemons = useSelector(selectAllPokemons);

  return (
    <div className="">
      {pokemons.map((pokemon) => (
        <div className="">
          <div className="">{pokemon.name}</div>
          <div className="">{pokemon.url}</div>
        </div>
      ))}
    </div>
  );
};

export default PokemonList;
